
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { modalActions, showAuth, userActions } from "../../redux/actions";
const AuthModal = (props) => {
  const authModalState = useSelector((state) => state.modal.isShowAuthModal);
  console.log(authModalState);
  const history = useHistory();
  const dispatch = useDispatch();
  const { buttonLabel, className } = props;

  const toggle = () => dispatch(showAuth());
  const onSubmit = (data) => {
    dispatch(showAuth());
    dispatch(userActions.userActionRequest(data));
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="AuthModal"> 
      <Modal isOpen={authModalState} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Form className="form">
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
              <Button onClick={handleSubmit(onSubmit)}>LOG IN</Button>
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
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AuthModal;
