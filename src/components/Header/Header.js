import "./_Header.scss";
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSignOutAction } from "../../redux/actions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { LOCAL_STORAGE_USER_INFO } from "../../redux/constant";
import { checkName } from "../../utils";

const Header = (props) => {
  //drop down userInfo
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleUserInfo = () => setDropdownOpen(!dropdownOpen);
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const cartLength = useSelector((state) => state.cart.length);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  //sign out function
  const signOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_INFO);
    dispatch(userSignOutAction());
    history.push("/login");
  };
  return (
    <div className="Header">
      <Navbar light expand="md">
        <Container>
          <NavbarBrand onClick={() => history.push("/")}>
            <span style={{ fontWeight: 600 }}>COZA</span> store
          </NavbarBrand>
          <div className="Header__icon-mobile">
            <span>
              <i className="fas fa-search icon"></i>
            </span>
            <span>
              <i
                className="fas fa-shopping-cart icon icon-shoppingCart"
                data-cart={cartLength}
                onClick={() => history.push("/cart")}
              ></i>
            </span>
            {/* <span>
              <i
                className="far fa-heart icon icon-heart"
                data-cart={cartLength}
              ></i>
            </span> */}
          </div>
          {/* <NavbarToggler/> */}
          <span className="Header__toggle d-md-none" onClick={toggle}>
            <i class="fas fa-sliders-h"></i>
          </span>
          <div
            className={`Header__mobile ${
              isOpen ? "activeMobile" : "hiddenMobile"
            }`}
          >
            <i class="fas fa-times-circle close" onClick={toggle}></i>
            <ul>
              <li>
                {" "}
                <NavLink exact to="/">
                  Home
                </NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/shop/all">Shop</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                {" "}
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <a className="Header__userInfor-mobile">
                  {!userState.data ? (
                    <span>
                      <i
                        className="fas fa-sign-in-alt icon"
                        onClick={() => history.push("/login")}
                      ></i>{" "}
                      Log In
                    </span>
                  ) : (
                    <span>
                      {userState.data?.name}
                      <i
                        className="fas fa-sign-out-alt"
                        style={{ paddingLeft: "0.5rem" }}
                        onClick={signOut}
                      ></i>
                    </span>
                  )}
                </a>
              </li>
            </ul>
          </div>
          <Collapse navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/shop/all">Shop</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink to="/features">Features</NavLink>
              </NavItem> */}
              {/* <NavItem>
                <NavLink to="/blog">Blog</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink to="/about">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact">Contact</NavLink>
              </NavItem>
              <div className="Header__userInfor-mobile">
                {!userState.data ? (
                  <span>
                    <i
                      className="fas fa-sign-in-alt icon"
                      onClick={() => history.push("/login")}
                    ></i>{" "}
                    Log In
                  </span>
                ) : (
                  <span>
                    {userState.data?.name}
                    <i
                      className="fas fa-sign-out-alt"
                      style={{ paddingLeft: "0.5rem" }}
                      onClick={signOut}
                    ></i>
                  </span>
                )}
              </div>
            </Nav>
            <div className="Header__icon-desktop">
              <span>
                <i className="fas fa-search icon"></i>
              </span>
              <span>
                <i
                  className="fas fa-shopping-cart icon icon-shoppingCart"
                  data-cart={cartLength}
                  onClick={() => history.push("/cart")}
                ></i>
              </span>
              {/* <span>
                <i
                  className="far fa-heart icon icon-heart"
                  data-cart={cartLength}
                ></i>
              </span> */}
            </div>
            <div className="Header__userInfor-desktop">
              {!userState.data ? (
                <span>
                  <i
                    className="fas fa-sign-in-alt icon"
                    onClick={() => history.push("/login")}
                  ></i>{" "}
                  Log In
                </span>
              ) : (
                // <span>
                //   {checkName(userState.data.name)}
                //   <i
                //     className="fas fa-sign-out-alt"
                //     style={{ paddingLeft: "0.5rem" }}
                //     onClick={signOut}
                //   ></i>
                // </span>
                <Dropdown nav isOpen={dropdownOpen} toggle={toggleUserInfo}>
                  <DropdownToggle nav caret style={{ listStyle: "none" }}>
                    {checkName(userState.data.name)}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Profile Setting</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => history.push("/orderHistory")}>
                      Order History
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
