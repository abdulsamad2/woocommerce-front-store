import axios from "axios";
const URL = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`;

const getSiteData = async () => {
  const { data } = await axios.get(URL);

  return data;
};

export default getSiteData;
