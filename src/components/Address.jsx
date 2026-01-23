import React, { useContext } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });
  const onChangeHander = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;
  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    );

    if (result.success) {
      navigate("/checkout");
    }
    // console.log(formData);
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };
  return (
    <>
      <div
        className="container my-5 p-4"
        style={{
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center">Shipping Address</h1>
        <form className="my-3" onSubmit={submitHandler}>
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail3" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={onChangeHander}
                className="form-control bg-dark text-light"
                id="exampleInputEmail3"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={onChangeHander}
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={onChangeHander}
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail3" className="form-label">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={onChangeHander}
                className="form-control bg-dark text-light"
                id="exampleInputEmail3"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Pincode
              </label>
              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={onChangeHander}
                className="form-control bg-dark text-light"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3 col-md-4">
              <label htmlFor="exampleInputPassword1" className="form-label">
                PhoneNumber
              </label>
              <input
                type="number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChangeHander}
                className="form-control bg-dark text-light"
                id="exampleInputPassword1"
              />
            </div>
          </div>

          <div className="row">
            <div className="mb-3 ">
              <label htmlFor="exampleInput" className="form-label">
                Address/Nearby
              </label>
              <textarea
                type="text"
                name="address"
                value={formData.address}
                onChange={onChangeHander}
                className="form-control bg-dark text-light"
                id="exampleInputEmail"
              />
            </div>
          </div>

          <div className="d-grid col-6 mx-auto my-3">
            <button type="submit" className="btn btn-primary"
            style={{fontWeight:'bold'}}>
              Submit
            </button>
          </div>
        </form>

        {userAddress && (
          <>
            <div className="d-grid col-6 mx-auto my-3">
              <button
                className="btn btn-warning"
                onClick={() => navigate("/checkout")}
              style={{fontWeight:'bold'}}>
                Use Old Address
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Address;
