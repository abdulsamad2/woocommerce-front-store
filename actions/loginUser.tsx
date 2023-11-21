"use server";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
export default async function loginUser({ username, password }: any) {
  const { data } = await axios.post(
    `/headless.abdulsamadfolio.com/wp-json/jwt-auth/v1/token}`,
    {
      username: username,
      password: password,
    }
  );

  return data;
}
