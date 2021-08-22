import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Col, Form, Input, Row } from "reactstrap";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";
import "./_DashBoardMessenger.scss";
import io from "socket.io-client";
import { URL } from "../../api";
function DashBoardMessenger({ icon, name }) {
  const ENDPOINT = URL;
  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const uiMessagesRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const userInfo = useSelector((state) => state.user.data);
  const [listUsers, setListUsers] = useState([]);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    const socket = io(ENDPOINT);
    setSocket(socket);
  };
  //submit
  const onSubmit = (data, e) => {
    setMessages([...messages, { body: data.message, name: "Admin" }]);
    e.target[0].value = "";
    setTimeout(() => {
      socket.emit("onMessage", {
        body: data.message,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
        _id: userInfo._id,
        userId: userSelected.userId,
      });
    }, 1000);
  };
  const pickUserToChat = (id, name) => {
    setUserSelected({
      userId: id,
      userName: name,
    });
    setOpenChat(true);
  };
  // console.log(userId);
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
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
      socket.on("listUsers", (users) => {
        setListUsers(users);
      });
    }
  }, [socket, messages]);
  return (
    <div>
      <DashBoardTopHeader icon={icon} name={name} />
      <div className="Messenger">
        {!isOpen ? (
          <button className="Messenger__ButtonOpen" onClick={handleOpen}>
            Click to Start
          </button>
        ) : (
          <Row>
            <Col xs={4} md={3}>
              <ul className="Messenger__listUsers">
                {listUsers
                  ? listUsers.map((item, index) => {
                      if (item.isAdmin) {
                        return "";
                      } else
                        return (
                          <li
                            key={item._id}
                            onClick={() => pickUserToChat(item._id, item.name)}
                          >
                            <a>{item.name}</a>
                            {item.online ? (
                              <span style={{ color: "#54E346" }}>
                                <i class="fas fa-globe"></i>Online
                              </span>
                            ) : (
                              <span style={{ color: "red" }}>
                                <i class="fas fa-globe"></i>Offline
                              </span>
                            )}
                          </li>
                        );
                    })
                  : "Empty"}
              </ul>
            </Col>
            <Col xs={8} md={9}>
              {openChat ? (
                <div className="Messenger__content">
                  <div className="Messenger__content-header">
                    <p
                      style={{
                        fontSize: "1.4rem",
                        textDecoration: "underline",
                      }}
                    >
                      To: {userSelected?.userName}
                    </p>
                  </div>
                  <ul className="messenger-list" ref={uiMessagesRef}>
                    {messages.map((msg, index) => (
                      <li key={index}>
                        <strong>{`${msg.name}: `}</strong> {msg.body}
                      </li>
                    ))}
                  </ul>
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
                </div>
              ) : (
                "SELECT A USER TO CHAT!"
              )}
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}

export default DashBoardMessenger;
