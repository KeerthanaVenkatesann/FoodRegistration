import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../Reducer/Actiontype/Actions';
import { useNavigate } from 'react-router-dom';
import "./Registration.css"
const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [shopName, setShopName] = useState('');
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');
  const [addOn, setAddOn] = useState('');
  const [quantity, setQuantity] = useState('');
 
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ 
        name,
        email,
        phoneNumber,
        location,
        shopName,
        food,
        description,
        addOn,
        quantity
      }));
    setName('');
    setEmail('');
    setPhoneNumber('');
    setLocation('');
    setShopName('');
    setFood('');
    setDescription('');
    setAddOn('');
    setQuantity('');
    nav("/list");
  };

  return (
    <div className='whole-page'>
    <form onSubmit={handleSubmit} className='Form-card-css'>
       
    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Name</label>
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /></div> 
        <div className='input-box'>
        <label htmlFor="">Email</label>
        <input
        type="text"
        placeholder="Name"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /></div> 
    </div>
    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Phone Number</label>
        <input
        type="text"
        placeholder="Name"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      /></div> 
        <div className='input-box'>
        <label htmlFor="">Location</label>
        <input
        type="text"
        placeholder="Name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      /></div> 
    </div>

    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Shop Name</label>
        <input
        type="text"
        placeholder="Name"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      /></div> 
        <div className='input-box'>
        <label htmlFor="">Food</label>
        <input
        type="text"
        placeholder="Name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      /></div> 
    </div>

    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Description</label>
        <input
        type="text"
        placeholder="Name"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /></div> 
        <div className='input-box'>
        <label htmlFor="">Add on</label>
        <input
        type="text"
        placeholder="addOn"
        value={addOn}
        onChange={(e) => setAddOn(e.target.value)}
      /></div> 
    </div>

    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Quantity</label>
        <input
        type="text"
        placeholder="Name"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      /></div> 
        {/* <div className='input-box'>
        <label htmlFor=""></label>
        <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /></div>  */}
    </div>
      <button type="submit">Add User</button>
    </form></div>
  );
};

export default Form;
