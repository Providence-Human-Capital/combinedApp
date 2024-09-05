import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../config";

const fetchBankInformation = async (employeeId) => {
  const { data } = await axios.get(`${API}/api/employees/${employeeId}/bank-information`);
  return data.data[0];
};

const useBankInformation = (employeeId) => {
  return useQuery(["bankInformation", employeeId], () => fetchBankInformation(employeeId));
};

export default useBankInformation;