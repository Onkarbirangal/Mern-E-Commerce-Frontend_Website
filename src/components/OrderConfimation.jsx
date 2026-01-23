import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";
const OrderConfimation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);
  console.log("latest order", latestOrder);
  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">Your order has been comfirm,</h1>
        <h3 className="text-center">It will delivered soon</h3>
      </div>

      <div className="container ">
        <table className="table table-bordered  border-primary bg-dark ">
          <thead className="text-center">
            <tr>
              <th scope="col" className="bg-dark text-light">
                OrderItems
              </th>

              <th scope="col" className="bg-dark text-light">
                OrderDetails & ShippingAddress
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-dark text-light">
                {/* <TableProduct cart={cart} /> */}
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td
                className="bg-dark text-light "
                style={{ fontWeight: "bold" }}
              >
                <ul>
                  <li>OrderId : {latestOrder?.orderId}</li>
                  <li>PaymentId : {latestOrder?.paymentId}</li>
                  <li>PayStatus : {latestOrder?.payStatus}</li>
                  <li>Name : {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone : {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country : {latestOrder?.userShipping?.country}</li>
                  <li>State : {latestOrder?.userShipping?.state}</li>
                  <li>City : {latestOrder?.userShipping?.city}</li>
                  <li>PinCode : {latestOrder?.userShipping?.pincode}</li>
                  <li>Nearby : {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="container text-center my-3">
        <button
          className="btn btn-secondary btn-lg "
          style={{ fontWeight: "bold" }}
        >
          Procced To Pay
        </button>
      </div> */}
    </>
  );
};

export default OrderConfimation;
