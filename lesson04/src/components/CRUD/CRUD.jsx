import React, { useEffect, useState, useRef } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import { handleEvent } from "../../utils";
import "./CRUD.sass";

export default function RUD() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const marriedRef = useRef();

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const newUser = {
      name: nameRef.current.value,
      married: marriedRef.current.checked,
    };
    const res = await createUser(newUser);
    setUsers((prev) => [...prev, res.data]);
    nameRef.current.value = "";
    marriedRef.current.checked = false;
  };

  const handleChange = (id, key, value) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const updated = { ...user, [key]: value };
    updateUser(id, updated).then((res) => {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? res.data : u))
      );
    });
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() =>
      setUsers((prev) => prev.filter((u) => u.id !== id))
    );
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
    <>
      <div className="crud">
        <h2 className="crud__title">Add New User</h2>
        <form onSubmit={handleCreate} className="crud__form">
          <input
            type="text"
            ref={nameRef}
            className="crud__input"
            placeholder="Enter name"
            required
          />
          <label className="crud__label">
            Married:
            <input type="checkbox" ref={marriedRef} />
          </label>
          <button type="submit" className="crud__button">Add</button>
        </form>
      </div>

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

              <button onClick={(e) => handleEvent(e, handleDelete, [user.id])}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>);
}
