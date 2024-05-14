// List.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from '../Reducer/Actiontype/Actions';

const List = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
<div className='whole-page'>
     
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Location</th>
              <th>Shop Name</th>
              <th>Food</th>
              <th>Description</th>
              <th>Add On</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.location}</td>
                <td>{user.shopName}</td>
                <td>{user.food}</td>
                <td>{user.description}</td>
                <td>{user.addOn}</td>
                <td>{user.quantity}</td>
                <td>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                  <Link to={`/form/${user.id}/edit`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
