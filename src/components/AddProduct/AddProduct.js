import React, { useState } from "react";
import { Button, Col, Collapse, Form, Input, Label, Row } from "reactstrap";
import "./_AddProduct.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { URL } from "../../api";
function AddProduct() {
  const userInfo = useSelector((state) => state.user.data);
  // const user = userInfo;
  //color data
  const Color = ["black", "blue", "gray", "yellow", "white", "pink"];
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [category, setCategory] = useState(null);
  const [file, setFile] = useState({
    image: "",
  });
  //useForm function
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setFile({ ...file, [name]: value });
  };
  const onSubmit = async (data) => {
    // e.preventDefault();
    console.log(file.image);
    if (file.image.length == 0 || !category) {
      alert("Fill all please!");
      return;
    }
    let formData = new FormData();
    formData.append("image", file.image);
    formData.append("category", category);
    formData.append("name", data.name);
    formData.append("color", data.color);
    formData.append("price", data.price);
    formData.append("brand", data.brand);
    formData.append("countInStock", data.countInStock);
    formData.append("rating", 1);
    formData.append("description", data.description);
    axios
      .post(`${URL}/api/product/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        alert("upload successfully");
      })
      .catch((err) => {
        // alert(err.response.data.messsage);
        alert("Error! tên sản phẩm đã tồn tại");
      });
  };
  return (
    <div className="AddProduct">
      <Button onClick={toggle} color="primary">
        NEW PRODUCT <i class="fas fa-plus"></i>
      </Button>
      <Row>
        <Col xs={12} md={12}>
          <Collapse isOpen={isOpen}>
            <Form onSubmit={handleSubmit(onSubmit)} className="form">
              <Row>
                <Col xs={6} md={2}>
                  <Label>Image:</Label>
                </Col>
                <Col xs={6} md={2}>
                  <Input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    // ref={fileInput}
                    name="image"
                    onChange={handleChange("image")}
                  />
                </Col>
              </Row>
              <Row className="pt-3">
                <Col xs={6} md={2}>
                  <Label>Product Name: </Label>
                </Col>
                <Col xs={6} md={2}>
                  <Input
                    type="text"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="errorMessage">This field is required</span>
                  )}
                </Col>
              </Row>
              <Row className="pt-3">
                <Col xs={6} md={2}>
                  <Label>Price (dollar): </Label>
                </Col>
                <Col xs={6} md={2}>
                  <Input
                    type="Number"
                    min="1"
                    {...register("price", { required: true })}
                  />
                  {errors.price && (
                    <span className="errorMessage">This field is required</span>
                  )}
                </Col>
              </Row>

              <Row className="pt-3">
                <Col xs={6} md={2}>
                  <Label>Number: </Label>
                </Col>
                <Col xs={6} md={2}>
                  <Input
                    type="Number"
                    min="1"
                    {...register("countInStock", { required: true })}
                  />
                  {errors.countInStock && (
                    <span className="errorMessage">This field is required</span>
                  )}
                </Col>
              </Row>

              <Row className="pt-3">
                <Col xs={6} md={2}>
                  <Label>Brand: </Label>
                </Col>
                <Col xs={6} md={2}>
                  <Input
                    type="text"
                    {...register("brand", { required: true })}
                  />
                  {errors.brand && (
                    <span className="errorMessage">This field is required</span>
                  )}
                </Col>
              </Row>

              <Row className="pt-3">
                <Col xs={6} md={2}>
                  <Label>Pick a color: </Label>
                </Col>
                <Col xs={6} md={2}>
                  <select
                    name="color"
                    {...register("color", { required: true })}
                  >
                    {Color.map((item, index) => {
                      return (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                  {errors.color && (
                    <span className="errorMessage">This field is required</span>
                  )}
                </Col>
              </Row>

              <Row
                className="pt-2"
                onChange={(e) => setCategory(e.target.value)}
              >
                <Col xs={12} md={2}>
                  Category:
                </Col>
                <Col xs={4} md={2}>
                  <Input type="radio" value="men" name="category" />
                  <Label>Men</Label>
                </Col>
                <Col xs={4} md={2}>
                  <Input type="radio" value="women" name="category" />
                  <Label>Women</Label>
                </Col>
                <Col xs={4} md={2}>
                  <Input type="radio" value="watch" name="category" />
                  <Label>Watch</Label>
                </Col>
              </Row>

              <Row className="pt-3">
                <Col xs={6} md={2}>
                  <Label>Description: </Label>
                </Col>
                <Col xs={6} md={6}>
                  <Input
                    type="textarea"
                    style={{ height: "8rem", fontSize: "15px" }}
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <span className="errorMessage">This field is required</span>
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs={4} md={4}>
                  <Button color="primary">ADD</Button>
                </Col>
              </Row>
            </Form>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
}

export default AddProduct;
