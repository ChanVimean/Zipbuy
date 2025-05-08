import axios from "axios";

const fetch = async () => {
  const data = await axios.get("https://electronic-data.onrender.com/product");

  return data;
};

export default fetch;
