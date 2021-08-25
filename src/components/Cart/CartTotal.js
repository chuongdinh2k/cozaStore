import React, { useEffect, useState } from "react";
import { Table, Label, Input, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as api from "../../api";
import "./_CartTotal.scss";
import { shippingActions, showAuth } from "../../redux/actions";
import { LOCAL_STORAGE_SHIPPING } from "../../redux/constant";
function CartTotal({ subTotal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const shippingState = useSelector((state) => state.shipping);
  const user = useSelector((state) => state.user.data);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [selectedValue, setSeletedValue] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const [payment, setPayment] = useState();
  useEffect(() => {
    axios({
      methods: "post",
      url: api.ghn_province,
      headers: {
        "Content-Type": "application/json",
        token: process.env.REACT_APP_GHN_TOKEN,
      },
    }).then((respone) => {
      setProvince(respone.data.data);
    });
  }, [setProvince]);
  //Province selectChange
  const selectChange = (e) => {
    // setProvinceId(e.target.name);
    const provinceId = parseInt(e.target.value);
    setSeletedValue({
      ...selectedValue,
      province: e.target.options[e.target.selectedIndex].text,
    });
    // console.log(e.target.options[e.target.selectedIndex].text);
    setTimeout(
      () =>
        axios({
          method: "post",
          url: api.ghn_district,
          data: {
            province_id: provinceId,
          },
          headers: {
            "Content-Type": "application/json",
            token: process.env.REACT_APP_GHN_TOKEN,
          },
        }).then((respone) => {
          setDistrict(respone.data.data);
        }),
      2000
    );
    clearTimeout();
  };
  //District selectChange
  const selectDistrictChange = (e) => {
    const districtId = parseInt(e.target.value);
    setSeletedValue({
      ...selectedValue,
      district: e.target.options[e.target.selectedIndex].text,
    });
    setTimeout(
      () =>
        axios({
          method: "post",
          url: api.ghn_ward,
          data: {
            district_id: districtId,
          },
          headers: {
            "Content-Type": "application/json",
            token: process.env.REACT_APP_GHN_TOKEN,
          },
        }).then((respone) => {
          setWard(respone.data.data);
        }),
      2000
    );
    clearTimeout();
  };
  //ward selectChange
  const selectWardChange = (e) => {
    setSeletedValue({
      ...selectedValue,
      ward: e.target.options[e.target.selectedIndex].text,
    });
  };
  //Render provinces
  const provinceRender = province ? (
    province.map((item) => (
      <option
        key={item.ProvinceID}
        value={item.ProvinceID}
        name={item.ProvinceName}
      >
        {item.ProvinceName}
      </option>
    ))
  ) : (
    <option value="">None</option>
  );

  //render district
  const districtRender = district ? (
    district.map((item) => (
      <option
        key={item.DistrictID}
        value={item.DistrictID}
        name={item.DistrictName}
      >
        {item.DistrictName}
      </option>
    ))
  ) : (
    <option value="">None</option>
  );
  //render ward
  const wardRender = ward ? (
    ward.map((item) => (
      <option key={item.WardCode} value={item.WardCode} name={item.WardName}>
        {item.WardName}
      </option>
    ))
  ) : (
    <option value="">None</option>
  );
  //  onSubmit
  const onSubmit = (data) => {
    if (!user) {
      dispatch(showAuth());
    } else {
      if (
        !selectedValue.province ||
        !selectedValue.district ||
        !selectedValue.ward ||
        !payment
      ) {
        alert("Please select address or payment method, thanks");
        return;
      } else {
        localStorage.setItem(
          LOCAL_STORAGE_SHIPPING,
          JSON.stringify({
            payment,
            ...data,
            ...selectedValue,
          })
        );
        dispatch(
          shippingActions.shippingAddress({
            payment,
            ...data,
            ...selectedValue,
          })
        );
        history.push("/orderHistory");
      }
    }
  };
  // place order
  // console.log(payment);
  return (
    <form className="table__total" onSubmit={handleSubmit(onSubmit)}>
      <Table>
        <thead>
          <tr>
            <th colspan="2">CART TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p>Subtotal</p>
            </td>
            <td>
              <p>$ {subTotal}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Shipping:</b>{" "}
              </p>{" "}
            </td>
            <td>
              There are no shipping methods available. Please double check your
              address, or contact us if you need any help.
            </td>
          </tr>
          <tr>
            <td>
              <p>Province:</p>
            </td>
            <td>
              <select name="city" onChange={selectChange}>
                {provinceRender}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>District:</p>
            </td>
            <td>
              <select onChange={selectDistrictChange}>
                {districtRender}
                <option>None</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>Ward:</p>
            </td>
            <td>
              <select onChange={selectWardChange}>
                {wardRender}
                <option>None</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>Address:</p>
            </td>
            <td>
              <Input
                type="text"
                {...register("address", { required: true })}
                placeholder="ex: số 6 - Phan Đình Giót..."
              />
              {errors.address && (
                <span style={{ color: "red" }}>This field is required</span>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <p>Full-name:</p>
            </td>
            <td>
              <div>
                <Input
                  type="fullname"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>Phone:</p>
            </td>
            <td>
              <div>
                <Input
                  type="number"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>Payment:</p>
            </td>
            <td>
              <div
                className="pt-1"
                onChange={(e) => setPayment(e.target.value)}
              >
                {" "}
                <Input
                  type="radio"
                  value="stripe"
                  id="stripe"
                  name="payment"
                ></Input>
                <Label>Stripe</Label>
                <br />
                <Input
                  type="radio"
                  value="paypal"
                  id="paypal"
                  name="payment"
                ></Input>
                <Label>Paypal</Label>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <button class="button">PLACE ORDER</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </form>
  );
}

export default CartTotal;
