import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../Reducer/Actiontype/Actions";
import { useNavigate } from "react-router-dom";
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
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!phoneNumber.trim()) {
      validationErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      validationErrors.phoneNumber = "Invalid phone number format";
    }
    if (!location.trim()) {
      validationErrors.location = "location is required";
    }

    if (!shopName.trim()) {
      validationErrors.shopName = "Shopname is required";
    }

    if (!food.trim()) {
      validationErrors.food = "Food Name is required";
    }

    // if (!description.trim()) {
    //   validationErrors.name = "Desccr is required";
    // }

    // if (!addOn.trim()) {
    //   validationErrors.name = "Name is required";
    // }

    if (!quantity.trim()) {
      validationErrors.quantity = "Name is required";
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
      nav("/list");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="whole-page">
      <form onSubmit={handleSubmit} className="Form-card-css">
        <h3 className="title-haven"> Register your Order in Mango Haven</h3>
        <div className="inner-card">
          <div className="input-box">
            <label htmlFor="">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="input-box">
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
        </div>
        <div className="inner-card">
          <div className="input-box">
            <label htmlFor="">Phone Number</label>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && (
              <p className="error">{errors.phoneNumber}</p>
            )}
          </div>
          <div className="input-box">
            <label htmlFor="">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            {errors.location && <p className="error">{errors.location}</p>}
          </div>
        </div>

        <div className="inner-card">
          <div className="input-box">
            <label htmlFor="">Shop Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            {errors.shopName && <p className="error">{errors.shopName}</p>}
          </div>
          <div className="input-box">
            <label htmlFor="">Food</label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
            />
            {errors.food && <p className="error">{errors.food}</p>}
          </div>
        </div>

        <div className="inner-card">
          <div className="input-box">
            <label htmlFor="">Add on</label>
            <input
              type="text"
              value={addOn}
              onChange={(e) => setAddOn(e.target.value)}
            />
            {errors.addOn && <p className="error">{errors.addOn}</p>}
          </div>

          <div className="input-box">
            <label htmlFor="">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            {errors.quantity && <p className="error">{errors.quantity}</p>}
          </div>
        </div>

        <div className="inner-card">
          <div className="input-box">
            <label htmlFor="">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>
        </div>
        <button type="submit" className="button">
          Add User
        </button>
      </form>
    </div>
  );
};

export default Form;
