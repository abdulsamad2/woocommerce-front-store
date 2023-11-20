"use server";
import axios from "axios";

export default async function loginUser({ username, password }: any) {
  const { data } = await axios.post(
    "http://localhost:10006/wp-json/jwt-auth/v1/token",
    {
      username: username,
      password: password,
    }
  );

  return data;
}
