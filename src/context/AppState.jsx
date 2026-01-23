import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
const AppState = (props) => {
  // const url = "http://localhost:5000/api";

  const url = "https://mern-e-commerce-website-w3as.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuhenticated, setIsAuhenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState();
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState();
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.products);
      setProducts(api.data.products);
      setFilteredData(api.data.products);
      userProfile();
    };
    fetchProduct();
    userCart();
    getAddress();
    user_Order();
  }, [token, reload]);

  useEffect(() => {
    let lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuhenticated(true);
    }
  }, []);

  //register user
  const register = async (name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      },
    );
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
    // console.log("user register", api);
  };

  //login user
  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      },
    );
    // alert(api.data.message);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    // console.log("user login", api.data);
    setToken(api.data.token);
    setIsAuhenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  //logout user
  const logout = () => {
    setIsAuhenticated(false);
    setToken(" ");
    localStorage.removeItem("token");
    toast.success("Logout Successfully...!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //profile user
  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("user profile", api.data.user);
    setUser(api.data.user);
  };

  //Add To Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.post(
      `${url}/cart/add`,
      { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("My Cart",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //user cart
  const userCart = async (productId, title, price, qty, imgSrc) => {
    const api = await axios.get(
      `${url}/cart/user`,
      // { productId, title, price, qty, imgSrc },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    // console.log("user Cart",api.data.cart);
    setCart(api.data.cart);
  };

  // --qty
  const decreaseQty = async (productId, qty) => {
    const api = await axios.post(
      `${url}/cart/--qty`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("user Cart",api.data.cart);
    // setCart(api.data.cart);
    console.log("decrease Qty item ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //remove form item Cart
  const removeFormCart = async (productId) => {
    const api = await axios.delete(
      `${url}/cart/remove/${productId}`,

      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("remove item form Cart", api.data.cart);
    // setCart(api.data.cart);
    console.log("decrease Qty item ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //clear from item cart
  const clearCart = async () => {
    const api = await axios.delete(
      `${url}/cart/clear`,

      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("clear item form Cart", api.data.cart);
    // setCart(api.data.cart);
    console.log("decrease Qty item ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //add address
  const shippingAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  ) => {
    const api = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNumber },

      {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      },
    );
    setReload(!reload);
    // console.log("clear item form Cart", api.data.cart);
    // setCart(api.data.cart);
    // console.log("decrease Qty item ", api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return api.data;
  };

  //get user latest address
  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("User Address", api.data.userAddress);
    setUserAddress(api.data.userAddress);
  };

  //get user order
  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log("User order", api.data);
    setUserOrder(api.data);
  };


  // console.log("user order", userOrder);
  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuhenticated,
        isAuhenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        decreaseQty,
        removeFormCart,
        clearCart,
        shippingAddress,
        userAddress,
        userOrder,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
