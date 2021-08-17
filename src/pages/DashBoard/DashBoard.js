import "./_DashBoard.scss";
import React from "react";
import { Col, Row } from "reactstrap";
import { Route, Link, useHistory, Switch } from "react-router-dom";
import { userSignOutAction } from "../../redux/actions";
import { LOCAL_STORAGE_USER_INFO } from "../../redux/constant";
import { useDispatch, useSelector } from "react-redux";
import DashBoardHome from "../../components/DashBoardHome/DashBoardHome";
import DashBoardProduct from "../../components/DashBoardProduct/DashBoardProduct";
import UserList from "../../components/UserList/UserList";
const MenuLink = ({ label, to, activeOnlyWhenExact, icon }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        var active = match ? "active" : "";
        return (
          <li className={`default-class ${active} `}>
            <Link to={to}>
              <i className={icon}></i>
              {label}
            </Link>
          </li>
        );
      }}
    />
  );
};

const ObjectLink = [
  {
    label: "Home",
    to: "/dashboard/",
    active: true,
    icon: "fas fa-home",
    component: () => <DashBoardHome icon="fas fa-home" name="Home" />,
  },
  {
    label: "Product",
    to: "/dashboard/product",
    active: false,
    icon: "fas fa-tshirt",
    component: () => (
      <DashBoardProduct icon="fas fa-tshirt" name="fas fa-tshirt" />
    ),
  },
  { label: "User", to: "/dashboard/user", active: false, icon: "far fa-user" },
  {
    label: "Order",
    to: "/dashboard/order",
    active: false,
    icon: "fas fa-shopping-basket",
  },
  {
    label: "Chart",
    to: "/dashboard/chart",
    active: false,
    icon: "fas fa-chart-pie",
  },
  {
    label: "Message",
    to: "/dashboard/message",
    active: false,
    icon: "fas fa-envelope",
  },
];
const renderMenuLink = ObjectLink.map((item, index) => {
  return (
    <MenuLink
      key={index}
      label={item.label}
      to={item.to}
      activeOnlyWhenExact={item.active}
      icon={item.icon}
    />
  );
});
function DashBoard() {
  const userInfo = useSelector((state) => state.user.data);
  const history = useHistory();
  const dispatch = useDispatch();
  const signOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_INFO);
    dispatch(userSignOutAction());
    history.push("/login");
  };
  return (
    <div className="Dashboard">
      <Row>
        <Col md={2} xs={2}>
          <div className="Dashboard__nav">
            <h2>ADMINTORY</h2>
            <ul className="Dashboard__nav-menu">
              {/* <li className="active">
                <a>
                  <i class="fas fa-home"></i>Home
                </a>
              </li> */}
              {renderMenuLink}
              <li>
                <a onClick={signOut}>
                  Sign Out <i className="fas fa-sign-out-alt"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="DashBoard__nav-mobile d-none">
            <span>
              <i class="fas fa-sliders-h"></i>
            </span>
          </div>
        </Col>
        <Col md={10} xs={12}>
          <Switch>
            {/* {ObjectLink.map((item, index) => {
              return (
                <Route
                  path={item.to}
                  exact={item.exact}
                  component={item.component}
                ></Route>
              );
            })} 
            */}
            <Route path="/dashboard/" exact>
              <DashBoardHome name="Home" icon="fas fa-home" />
            </Route>
            <Route path="/dashboard/product/:id?" exact>
              <DashBoardProduct name="Product" icon="fas fa-tshirt" />
            </Route>
            <Route path="/dashboard/user">
              <UserList name="User" icon="far fa-user" userInfo={userInfo} />
            </Route>
            <Route path="/dashboard/Order">
              <DashBoardHome name="Order" icon="fas fa-shopping-basket" />
            </Route>
          </Switch>
        </Col>
      </Row>
    </div>
  );
}

export default DashBoard;
