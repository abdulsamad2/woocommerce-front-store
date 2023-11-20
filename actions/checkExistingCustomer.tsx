"use server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRECT,
  version: "wc/v3",
});

export default async function checkExistingCustomer({ email, userName }: any) {
  //   const { fullName, email, password, userName } = values;
  //   const firstName = fullName.split(" ")[0];
  //   const lastName = fullName.split(" ")[1];
  console.log(email, userName);
  const { data } = await api.get(`customers?search=${userName}`);

  return data;
}
