import axios from "axios";

const fetchApi = async () => {
  const res = await axios.get("https://electronic-data.onrender.com/product");

  return res.data;
};

export default fetchApi;
