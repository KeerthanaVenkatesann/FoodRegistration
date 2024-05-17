import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../Reducer/Actiontype/Actions";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [shopName, setShopName] = useState("");
  const [food, setFood] = useState("");
  const [description, setDescription] = useState("");
  const [addOn, setAddOn] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Please fill your name!";
    }

    if (!email.trim()) {
      validationErrors.email = "please fill your email!";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!phoneNumber.trim()) {
      validationErrors.phoneNumber = "please fill your number!";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = "Invalid phone number format!";
    }
    if (!location.trim()) {
      validationErrors.location = "give your address!";
    }

    if (!shopName.trim()) {
      validationErrors.shopName = "Shop Name should be must!";
    }

    if (!food.trim()) {
      validationErrors.food = "Select your food please!";
    }

    // if (!description.trim()) {
    //   validationErrors.name = "Desccr is required";
    // }

    // if (!addOn.trim()) {
    //   validationErrors.name = "Name is required";
    // }

    if (!quantity.trim()) {
      validationErrors.quantity = "please is required!";
    }
    if (paymentMethod.length === 0) {
      validationErrors.paymentMethods =
        "Please select at least one payment method";
    }

    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        createUser({
          name,
          email,
          phoneNumber,
          location,
          shopName,
          food,
          description,
          addOn,
          quantity,
          paymentMethod,
        })
      );
      setName("");
      setEmail("");
      setPhoneNumber("");
      setLocation("");
      setShopName("");
      setFood("");
      setDescription("");
      setAddOn("");
      setQuantity("");
      setPaymentMethod("");
      nav("/list");
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePaymentMethodChange = (e) => {
    const { value } = e.target;

    // If the checkbox being clicked is already checked,
    // we uncheck it and return
    if (paymentMethod === value) {
      setPaymentMethod("");
      return;
    }

    // If a different checkbox is checked, we set the state accordingly
    setPaymentMethod(value);
  };
  return (
    <>
      <div className="main">
        <Link to="/"> back</Link>
        <div className="whole-page">
          <form onSubmit={handleSubmit} className="Form-card-css">
            <h2 className="title-haven">
              {" "}
              Register your <span className="order">Order in</span>{" "}
              <span className="mango"> Mango Haven</span>{" "}
            </h2>
            <div className="form-contain-ner">
              <div className="inner-card">
                <div className="input-box">
                  <label htmlFor="">Shop Name :</label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  {errors.shopName && (
                    <span className="error">{errors.shopName}</span>
                  )}
                </div>
                <div className="input-box">
                  <label htmlFor="">Food :</label>
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                  />
                  {errors.food && <span className="error">{errors.food}</span>}
                </div>
              </div>

              <div className="inner-card">
                <div className="input-box">
                  <label htmlFor="">Add on :</label>
                  <input
                    type="text"
                    value={addOn}
                    onChange={(e) => setAddOn(e.target.value)}
                  />
                  {errors.addOn && (
                    <span className="error">{errors.addOn}</span>
                  )}
                </div>

                <div className="input-box">
                  <label htmlFor="">Quantity :</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  {errors.quantity && (
                    <span className="error">{errors.quantity}</span>
                  )}
                </div>
              </div>

              <div className="inner-card">
                <div className="input-box text-box">
                  <label htmlFor="">Special`` Instructions ``:</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && (
                    <span className="error">{errors.description}</span>
                  )}
                </div>
              </div>
              <div className="inner-card">
                <div className="input-box">
                  <label htmlFor="">Name :</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="input-box">
                  <label htmlFor="">Email :</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
              </div>
              <div className="inner-card">
                <div className="input-box">
                  <label htmlFor="">Phone Number :</label>
                  <input
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {errors.phoneNumber && (
                    <span className="error">{errors.phoneNumber}</span>
                  )}
                </div>
                <div className="input-box">
                  <label htmlFor="">Delivery Address :</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  {errors.location && (
                    <span className="error">{errors.location}</span>
                  )}
                </div>
              </div>

              <div>
                {/* <div className="input-box"> */}
                <label htmlFor="" className="method">
                  Payment Method :
                </label>
                <div className="inner-card">
                  <div id="cod">
                    <label>
                      <input
                        type="checkbox"
                        value="Cash on Delivery/Pickup"
                        checked={paymentMethod === "Cash on Delivery/Pickup"}
                        onChange={handlePaymentMethodChange}
                      />
                      Cash on Delivery/Pickup
                    </label>
                  </div>
                  <div id="credit">
                    <label>
                      <input
                        type="checkbox"
                        value="Credit/Debit Card"
                        checked={paymentMethod === "Credit/Debit Card"}
                        onChange={handlePaymentMethodChange}
                      />
                      Credit/Debit Card
                    </label>
                  </div>
                </div>
                {/* </div> */}
                {errors.paymentMethod && (
                  <span className="error">{errors.paymentMethod}</span>
                )}
              </div>
            </div>
            <div className="btn-div">
              <button type="submit" className="button">
                Hurry up!
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
