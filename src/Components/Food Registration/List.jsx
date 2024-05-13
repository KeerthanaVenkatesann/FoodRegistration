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
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            {user.email}
            {user.phoneNumber}
            {user.location}
            {user.shopName}
            {user.food}
            {user.description}
            {user.addOn}
            {user.quantity}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
            <Link to={`/form/${user.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
