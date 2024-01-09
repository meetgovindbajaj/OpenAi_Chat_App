import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/signin", { email, password });
  const data = await res.data;
  if (res.status !== 200) throw new Error(data.cause);
  document.cookie = data.Cookie_Name + "=" + data.token + ";" + data.expires;
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  const data = await res.data;
  if (res.status !== 201) throw new Error(data.cause);
  document.cookie = data.Cookie_Name + "=" + data.token + ";" + data.expires;
  return data;
};

export const checkAuthToken = async () => {
  const res = await axios.get("/user/signin");
  if (res.status !== 200) throw new Error("Automatic login failed");
  const data = await res.data;
  return data;
};

export const sendMessage = async (message: string) => {
  const res = await axios.post("/chats/new", { message });
  if (res.status !== 200) throw new Error("Some error occured");
  const data = await res.data;
  return data;
};

export const getMessages = async () => {
  const res = await axios.get("/chats");
  if (res.status !== 200) throw new Error("Some error occured");
  const data = await res.data;
  return data;
};

export const deleteMessages = async () => {
  const res = await axios.delete("/chats");
  if (res.status !== 200) throw new Error("Some error occured");
};

export const userLogout = async () => {
  await axios.get("/user/logout");
};
