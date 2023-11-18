"use server";
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRECT,
  version: "wc/v3",
});

export default async function createOrder(values: any) {
  const { fullName, email, phone, address, cart, total, city } = values;
  const items = cart.map((item: any) => ({
    product_id: item.id,
    quantity: item.qunatity,
  }));

  const firstName = fullName.split(" ")[0];
  const lastName = fullName.split(" ")[1];

  const { data } = await api.post("orders", {
    payment_method: "COD",
    payment_method_title: "Cash on Delivery",
    set_paid: true,
    billing: {
      first_name: firstName,
      last_name: lastName,
      address_1: address,
      address_2: "",
      city: city,
      state: " ",
      postcode: " ",
      country: "Pak",
      email: email,
      phone: phone.toString(),
    },
    shipping: {
      first_name: firstName,
      last_name: lastName,
      address_1: address,
      address_2: "",
      city: city,
      state: " ",
      postcode: " ",
      country: "Pak",
    },
    downloadable: false,
    downloads: [],
    line_items: [...items],
    shipping_lines: [
      {
        method_id: "free_shipping",
        method_title: "Free Shipping",
        total: "0.00",
      },
    ],
  });

  return data;
}
