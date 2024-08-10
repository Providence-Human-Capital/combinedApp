import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../config";

const fetchCompanies = async () => {
  const { data } = await axios.get(`${API}/api/company`);
  return data.data;
};

const useCompanies = () => {
  return useQuery("allCompanies", fetchCompanies);
};

export default useCompanies;
