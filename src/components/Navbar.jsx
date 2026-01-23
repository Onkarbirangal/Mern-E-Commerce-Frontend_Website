import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
const Navbar = () => {
  const [searchterm, setSearchterm] = useState(" ");

  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuhenticated, cart } =
    useContext(AppContext);

  // console.log("user cart",cart)

  const noFilter = () => {
    setFilteredData(products);
  };

  const filterbycategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category?.toLowerCase() == cat.toLowerCase(),
      ),
    );
  };

  const filterbyprice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchterm}`);
    setSearchterm(" ");
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar ">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>Mern E-Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              name=""
              id=""
              value={searchterm}
              onChange={(e) => setSearchterm(e.target.value)}
              placeholder="Search Products...."
            />
          </form>

          <div className="right">
            {isAuhenticated && (
              <>
                {/* <button className="btn btn-warning mx-3">Cart</button> */}

                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                  {cart?.items?.length > 0 && (
                    <>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart?.items?.length}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </>
                  )}
                </Link>
                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {!isAuhenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={noFilter}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbycategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbycategory("laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbycategory("cameras")}>
              Cameras
            </div>
            <div
              className="items"
              onClick={() => filterbycategory("headphones")}
            >
              Headphones
            </div>
            <div className="items" onClick={() => filterbyprice(15999)}>
              15999
            </div>
            <div className="items" onClick={() => filterbyprice(25999)}>
              25999
            </div>
            <div className="items" onClick={() => filterbyprice(49999)}>
              49999
            </div>
            <div className="items" onClick={() => filterbyprice(69999)}>
              69999
            </div>
            <div className="items" onClick={() => filterbyprice(89999)}>
              89999
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
