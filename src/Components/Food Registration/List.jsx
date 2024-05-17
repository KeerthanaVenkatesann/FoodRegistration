// List.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../Reducer/Actiontype/Actions";
import Loader from "../Loader/Loader";

const List = () => {
  const users = useSelector((state) => state.users);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  
      await dispatch(fetchUsers());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    setDialogVisible(false);
  };

  const showDialog = (id) => {

    setSelectedUserId(id);
    setDialogVisible(true);
  };

  const closeDialog = () => {
    setDialogVisible(false);
    setSelectedUserId(null);
  };

  return (
    <div className="main">
      {loading && <Loader />}
      <Link to="/">
        {" "}
     back
      </Link>
      <div className="whole-page">
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
                  <td id="action">
                    <button
                      className="delete"
                      onClick={() => showDialog(user.id)}
                    >
                      Delete
                    </button>
                    {/* <button className='delete' onClick={() => handleDelete(user.id)}>Delete</button> */}
                    <button className="edit">
                      <Link className="editby" to={`/form/${user.id}/edit`}>
                        Edit
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {dialogVisible && (
            <dialog open className="dailog">
              <h3 className="title-haven">
                {" "}
                Are you sure!.. <span className="order">
                  You want delete
                </span>{" "}
                <span className="mango"> Your Favorite order🥹?</span>{" "}
              </h3>
              <form method="dialog">
                <button
                  type="button"
                  className="del"
                  onClick={() => handleDelete(selectedUserId)}
                >
                  Yes
                </button>
                <button className="nope" type="button" onClick={closeDialog}>
                  No
                </button>
              </form>
            </dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
