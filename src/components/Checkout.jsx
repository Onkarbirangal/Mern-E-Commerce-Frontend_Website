import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);

  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart?.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderRespons = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user?._id,
      });
      console.log("order respons", orderRespons);
      const { orderId, amount: orderAmount } = orderRespons.data;

      var options = {
        key: "rzp_test_S69O5grKveQzOf", // Enter the Key ID generated from the Dashboard
        amount: orderAmount * 100, // Amount is in currency subunits.
        currency: "INR",
        name: "My Mern Project",
        description: "My Mern Project",

        order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_payment_id,
            paymentId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData,
          );
          console.log("razarpay res", api.data);
          if (api.data.success) {
            clearCart();
            navigate("/orderconfirmation");
          }
        },
        prefill: {
          name: "My Mern project",
          email: "onkarbirangal@gmail.com",
          contact: "+919876543210",
        },
        notes: {
          address: "At Post Bavi Jamkhed Ahilyanager",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container t my-3">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered  border-primary bg-dark ">
          <thead>
            <tr>
              <th scope="col" className="bg-dark text-light">
                Product Details
              </th>

              <th scope="col" className="bg-dark text-light">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                <TableProduct cart={cart} />
              </td>
              <td className="bg-dark text-light" style={{ fontWeight: "bold" }}>
                <ul>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.phoneNumber}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>City : {userAddress?.city}</li>
                  <li>PinCode : {userAddress?.pincode}</li>
                  <li>Nearby : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center my-3">
        <button
          className="btn btn-secondary btn-lg "
          style={{ fontWeight: "bold" }}
          onClick={handlePayment}
        >
          Procced To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
