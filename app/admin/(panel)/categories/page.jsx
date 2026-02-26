"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [list, setList] = useState([]);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  fetch("http://localhost:8080/api/category")
    .then(res => res.json())
    .then(data => setCategories(data))
    .catch(console.error);
}, []);

  return (
    <div>
      <h2>Categories</h2>

      <table style={table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {list.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const table = {
  width: "100%",
  background: "white",
  padding: 10
};