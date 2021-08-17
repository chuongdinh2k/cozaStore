import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Spinner, Table } from "reactstrap";
import { getAllUsers, URL } from "../../api";
import DashBoardTopHeader from "../DashBoardTopHeader/DashBoardTopHeader";
import moment from "moment";
const UserList = ({ icon, name, userInfo }) => {
  const [users, setUsers] = useState();
  const userToken = userInfo.accessToken ? userInfo.accessToken : "";
  useEffect(async () => {
    const data = await axios.get(`${URL}/api/auth/user`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(data);
    setUsers(data.data.user);
  }, [setUsers]);

  return (
    <div>
      <DashBoardTopHeader icon={icon} name={name} />
      <Row className="justify-content-center">
        <Col xs={12}>
          <Table bordered style={{ fontSize: "1.5rem" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {users ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user?.firstName}</td>
                    <td>{user?.lastName}</td>
                    <td>{user.address}</td>
                    <td>{moment(user.updatedAt).format("DD-MM-YYYY")}</td>
                  </tr>
                ))
              ) : (
                <Spinner />
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default UserList;
