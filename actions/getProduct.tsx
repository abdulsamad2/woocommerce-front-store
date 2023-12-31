const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRECT,
  version: "wc/v3",
});

export default async function getProduct(slug: string) {
  const { data } = await api.get("products", {
    slug: slug,
  });

  return data;
}
