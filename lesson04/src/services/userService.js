import axios from "axios";

const API = "https://680fc8ae27f2fdac240f60df.mockapi.io/users";

export const getUsers = () => axios.get(API);
export const createUser = (user) => axios.post(API, user);
export const updateUser = (id, user) => axios.put(`${API}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API}/${id}`);