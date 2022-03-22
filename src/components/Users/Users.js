import React from "react";
import UserName from "./UserName/UserName";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      await fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => setUsers(json));
    };
    getUsers();
  }, []);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>
              <UserName
                name={user.name}
                username={user.username}
                email={user.email}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Users;
