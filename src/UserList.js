import React, { useEffect, useState } from "react";
import axios from "axios";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      console.log("users data", response.data);
      setUsers(response.data);
    } catch (err) {
      console.log("Err", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && users.length > 0
        ? users.map((user, index) => {
            return (
              <div key={index}>
                <p>{user.name}</p>
              </div>
            );
          })
        : !loading && <p>No users found</p>}
    </div>
  );
};

export default UserList;
