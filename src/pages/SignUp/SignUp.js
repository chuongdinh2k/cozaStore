import React from "react";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import "../Login/_Login.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterActions } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { userState$ } from "../../redux/selector";
function SignUp() {
  const userState = useSelector((state) => state.user);
  console.log(userState);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(userRegisterActions.userRegisterActionRequest(data));
  };
  console.log("user", userState.data);
  if (userState.data) {
    history.push("/");
  }
  return (
    <div className="Login">
      <Row
        className="justify-content-center"
        style={{ "--bs-gutter-x": "0rem" }}
      >
        <Col md={4} xs={10}>
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2>SIGN UP</h2>
            <FormGroup className="mt-4">
              <Input
                placeholder="Your username"
                type="text"
                {...register("username", { required: true })}
              ></Input>
              {errors.username && (
                <span className="error">This field is required</span>
              )}
            </FormGroup>
            <FormGroup className="mt-4">
              <Input
                placeholder="Your Address ( example: Hà Nội, Đã Nẵng...) "
                type="text"
                {...register("address", { required: true })}
              ></Input>
              {errors.address && (
                <span className="error">This field is required</span>
              )}
            </FormGroup>
            <FormGroup className="mt-4">
              <Input
                placeholder="Your Email"
                type="email"
                {...register("email", { required: true })}
              ></Input>
              {errors.email && (
                <span className="error">This field is required</span>
              )}
            </FormGroup>
            <FormGroup className="mt-4">
              <Input
                placeholder="Your Password"
                type="password"
                {...register("password", { required: true })}
              ></Input>
              {errors.password && (
                <span className="error">This field is required</span>
              )}
            </FormGroup>
            <FormGroup className="mt-4">
              <Button>SUBMIT</Button>
            </FormGroup>
            <p className="pt-4" style={{ textAlign: "left" }}>
              if you have an account, let{" "}
              <span
                onClick={() => history.push("/login")}
                style={{ textDecoration: "underline", color: "#717FE0" }}
              >
                Log in
              </span>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
