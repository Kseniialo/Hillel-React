import React, { useState, useEffect } from "react";
import { handleEvent } from "../../utils";
import "./RUD.sass";

const API = "https://680fc8ae27f2fdac240f60df.mockapi.io/users";

export default function RUD() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const updateUser = (updatedUser) => {
    fetch(`${API}/${updatedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((result) => {
        setUsers((prev) =>
          prev.map((u) => (u.id === result.id ? result : u))
        );
      });
  };

  const deleteUser = (id) => {
    fetch(`${API}/${id}`, { method: "DELETE" }).then(() =>
      setUsers((prev) => prev.filter((u) => u.id !== id))
    );
  };

  const handleChange = (id, key, value) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    updateUser({ ...user, [key]: value });
  };

  const renderObject = (obj) =>
    Object.entries(obj).map(([key, value]) =>
      typeof value === "object" && value !== null ? (
        <li key={key}>
          {key}:
          <ul>{renderObject(value)}</ul>
        </li>
      ) : (
        <li key={key}>
          {key}: {value?.toString()}
        </li>
      )
    );

  return (
    <div className="rud">
      {users.map((user) => (
        <div className="rud_item" key={user.id}>
          <ul>{renderObject(user)}</ul>

          <div className="rud_controls">
            <label>
              Name:
              <input
                type="text"
                value={user.name}
                onChange={(e) =>
                  handleChange(user.id, "name", e.target.value)
                }
              />
            </label>

            <label>
              Married:
              <input
                type="checkbox"
                checked={user.married || false}
                onChange={(e) =>
                  handleChange(user.id, "married", e.target.checked)
                }
              />
            </label>

            <button onClick={(e) => handleEvent(e, deleteUser, [user.id])}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
