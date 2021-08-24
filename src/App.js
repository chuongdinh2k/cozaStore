import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Footer from "./components/Footer/Footer";
import QuickViewModal from "./models/QuickViewModal/QuickViewModal";
import Cart from "./components/Cart/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthModal from "./models/AuthModal/AuthModal";
import Shop from "./pages/Shop/Shop";
import Detail from "./pages/Detail/Detail";
import About from "./pages/About/About";
import { useSelector } from "react-redux";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import DashBoard from "./pages/DashBoard/DashBoard";
import Contact from "./pages/Contact/Contact";
import ChatBox from "./components/ChatBox/ChatBox";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OrderHistory from "./components/OrderHistory/OrderHistory";
function App() {
  const userInfo = useSelector((state) => state.user.data);
  // console.log("admin", admin);
  return (
    <Router>
      <div className="App">
        {userInfo && userInfo.isAdmin ? "" : <Header />}
        <ToastContainer autoClose={2000} />
        <AuthModal />
        <QuickViewModal />
        {userInfo && userInfo.isAdmin ? "" : <ChatBox />}
        {/* <LoadingModal /> */}
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          {/* <Route path="/shop">
            <Shop />
          </Route> */}
          <Route path="/detail/:id" exact>
            <Detail />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/shop/:id" exact>
            <Shop />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <PrivateRoute
            path="/orderHistory"
            component={OrderHistory}
          ></PrivateRoute>

          {/* adminRoute */}
          <AdminRoute path="/dashboard" component={DashBoard}></AdminRoute>
        </Switch>
        {userInfo && userInfo.isAdmin ? "" : <Footer />}
      </div>
    </Router>
  );
}

export default App;
