import "./_Header.scss";
import React, { useState } from "react";
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
} from "reactstrap";
import { LOCAL_STORAGE_USER_INFO } from "../../redux/constant";
import { checkName } from "../../utils";

const Header = (props) => {
  // const state = useSelector((state) => state);
  // console.log(state);
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  console.log(userState.data?.name);
  const cartLength = useSelector((state) => state.cart.length);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
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
            <span>
              <i
                className="far fa-heart icon icon-heart"
                data-cart={cartLength}
              ></i>
            </span>
          </div>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink exact to="/">
                  Home
                </NavLink>
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
              <span>
                <i
                  className="far fa-heart icon icon-heart"
                  data-cart={cartLength}
                ></i>
              </span>
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
                <span>
                  {" "}
                  {/* {userState.data.name} */}
                  {checkName(userState.data.name)}
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ paddingLeft: "0.5rem" }}
                    onClick={signOut}
                  ></i>
                </span>
              )}
            </div>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
