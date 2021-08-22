import React from "react";
import "./_Home.scss";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selector";
import { Container } from "reactstrap";
import OptionRoutes from "../../components/OptionRoute/OptionRoutes";
import SpecialProducts from "../../components/SpecialProducts/SpecialProducts";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
function Home() {
  const history = useHistory();
  const userState = useSelector(userState$);
  console.log(userState);
  if (userState.data?.isAdmin) {
    history.push("/dashboard");
  }
  return (
    <div className="Home">
      <Banner />
      <Container>
        <OptionRoutes />
        <SpecialProducts />
      </Container>
    </div>
  );
}

export default Home;
