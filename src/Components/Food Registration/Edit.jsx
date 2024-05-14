// Edit.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../Reducer/Actiontype/Actions';
import { useParams, useNavigate } from 'react-router-dom';
import "./Registration.css";
const Edit = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [shopName, setShopName] = useState('');
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');
  const [addOn, setAddOn] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  // Fetch user data by ID when the component mounts
  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  // Get user data from Redux store
  const userToUpdate = useSelector((state) => state.user);

  // Update local state when user data changes
  useEffect(() => {
    if (userToUpdate) {
      setName(userToUpdate.name); 
      setEmail(userToUpdate.email);
      setPhoneNumber(userToUpdate.phoneNumber);
      setLocation(userToUpdate.location);
      setShopName(userToUpdate.shopName);
      setFood(userToUpdate.food);    
      setDescription(userToUpdate.description);
      setAddOn(userToUpdate.addOn);
      setQuantity(userToUpdate.quantity);
    }
  }, [userToUpdate]);

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
      validationErrors.name = "Shopname is required";
    }

    if (!food.trim()) {
      validationErrors.name = "Food Nmae is required";
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
      dispatch(updateUser(userToUpdate.id, {    name,
        email,
        phoneNumber,
        location,
        shopName,
        food,
        description,
        addOn,
        quantity}));
      setName(''); 
      nav("/list");
    }
    else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='whole-page'>
    <form onSubmit={handleSubmit} className='Form-card-css'>
       
    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Name</label>
        <input
        type="text"
        
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
         {errors.name && <p className="error">{errors.name}</p>}
      </div> 
        <div className='input-box'>
        <label htmlFor="">Email</label>
        <input
        type="text"
        
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       {errors.email && <p className="error">{errors.email}</p>}
      
      </div> 
    </div>
    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Phone Number</label>
        <input
        type="text"
        
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}

      />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}</div> 
        <div className='input-box'>
        <label htmlFor="">Location</label>
        <input
        type="text"
        
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
       {errors.location && <p className="error">{errors.location}</p>}
      </div> 
    </div>

    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Shop Name</label>
        <input
        type="text"
        
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      /></div> 
        <div className='input-box'>
        <label htmlFor="">Food</label>
        <input
        type="text"
        
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />
         {errors.food && <p className="error">{errors.food}</p>}
      </div> 
    </div>

    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Description</label>
        <input
        type="text"
        
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      {errors.description && <p className="error">{errors.description}</p>}
      </div> 
        <div className='input-box'>
        <label htmlFor="">Add on</label>
        <input
        type="text"
       
        value={addOn}
        onChange={(e) => setAddOn(e.target.value)}
      />
      
      {errors.addOn && <p className="error">{errors.addOn}</p>}
      </div> 
    </div>

    <div className='inner-card'><div className='input-box'>
        <label htmlFor="">Quantity</label>
        <input
        type="text"
        
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
        {errors.quantity && <p className="error">{errors.quantity}</p>}
      
      
      </div> 
        {/* <div className='input-box'>
        <label htmlFor=""></label>
        <input
        type="text"
        
        value={name}
        onChange={(e) => setName(e.target.value)}
      /></div>  */}
    </div>
      <button type="submit">update User</button>
    </form></div>
  );
};

export default Edit;
