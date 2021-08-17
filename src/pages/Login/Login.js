import React from "react";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import "./_Login.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userActions } from "../../redux/actions";
import { userState$ } from "../../redux/selector";
import axios from "axios";
function Login() {
  const userState = useSelector(userState$);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    dispatch(userActions.userActionRequest(data));
    // const user = await axios.post('http://localhost:5000/api/auth/login',data);
    // console.log(user.data);
  };
  if (userState.data) {
    if (userState.data.isAdmin) {
      history.push("/dashboard");
    } else history.push("/");
  }
  return (
    <div className="Login">
      <Row
        className="justify-content-center"
        style={{ "--bs-gutter-x": "0rem" }}
      >
        <Col md={4} xs={10}>
          <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <h2>LOG IN</h2>
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
              <Button>LOG IN</Button>
            </FormGroup>
            <p className="pt-4" style={{ textAlign: "left" }}>
              Don't you have an account?
              <span
                onClick={() => history.push("/signup")}
                style={{ textDecoration: "underline", color: "#717FE0" }}
              >
                Sign up
              </span>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
