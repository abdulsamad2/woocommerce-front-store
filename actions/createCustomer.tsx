"use server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRECT,
  version: "wc/v3",
});

export default async function createCustomer(values: any) {
  const { fullName, email, password, userName } = values;
  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];
  const { data } = await api.post("customers", {
    email: email,
    first_name: firstName,
    last_name: lastName,
    username: userName,
    password: password,
    billing: {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: email,
      phone: "",
    },
    shipping: {
      first_name: firstName,
      last_name: lastName,
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
  });
  console.log(data);
  return data;
}
