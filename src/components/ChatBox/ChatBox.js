import React, { useState, useEffect, useRef } from "react";
import "./_ChatBox.scss";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  Row,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import { showAuth } from "../../redux/actions";
import { URL } from "../../api";
function ChatBox() {
  const ENDPOINT = URL;
  // console.log(ENDPOINT);
  const dispatch = useDispatch();
  // state
  const userInfo = useSelector((state) => state.user.data);
  const uiMessagesRef = useRef(null);
  // const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    { name: "Admin", body: "Hello there, Please ask your question." },
  ]);
  //React react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    console.log("data", data);
    setMessages([...messages, { body: data.message, name: "You" }]);
    e.target[0].value = "";
    setTimeout(() => {
      console.log("run here");
      socket.emit("onMessage", {
        body: data.message,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
        _id: userInfo._id,
      });
    }, 1000);
  };
  const [socket, setSocket] = useState(null);

  //state chatbox
  const [isOpen, setIsOpen] = useState(false);
  const supportHandler = () => {
    if (!userInfo) {
      dispatch(showAuth());
      return;
    } else {
      setIsOpen(!isOpen);
      console.log(ENDPOINT);
      var socket = io(`${ENDPOINT}`, {
        cors: {
          origin: `${ENDPOINT}`,
          credentials: true,
        },
        transports: ["websocket"],
      });
      setSocket(socket);
      socket.on("connect", () => {
        console.log("socket id", socket.id); // x8WIv7-mJelg7on_ALbx
        socket.emit("join", "Hello server from client!");
      });
    }
  };
  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo?.id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (message) => {
        setMessages([...messages, { body: message.body, name: message.name }]);
        console.log(message);
      });
    }
  }, [messages, isOpen, socket]);
  console.log(messages);
  const closeChatBox = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="ChatBox">
      {!isOpen ? (
        <button className="ChatBox__Button" onClick={supportHandler}>
          <i className="fab fa-facebook-messenger"></i>
        </button>
      ) : (
        <Card>
          <CardHeader>
            <p>Support</p>
            <p style={{ fontSize: "10px" }} class="text-danger">
              If you get fail while trying send a message, please reload the
              page!
            </p>
            {/* <Alert color="warning" style={{ fontSize: "8px" }}>
              This is a warning alert — check it out!
            </Alert> */}
            <i className="fas fa-times" onClick={closeChatBox}></i>
          </CardHeader>
          <CardBody>
            {/* <div className="messages-box"> */}
            <ul className="messages-list" ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>{`${msg.name}: `}</strong> {msg.body}
                </li>
              ))}
            </ul>
            {/* </div> */}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group ">
                <Row>
                  <Col xs={9}>
                    <Input
                      autoComplete="off"
                      type="text"
                      {...register("message", { required: true })}
                    />
                    {errors.message && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Col>
                  <Col xs={3}>
                    <button className="button">Send</button>
                  </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default ChatBox;
