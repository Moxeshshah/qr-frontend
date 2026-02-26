"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/user/all")
      .then(res => res.json())
      .then(setList);
  }, []);

  return (
    <div>
      <h2>Users</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {list.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = { width: "100%", background: "white" };