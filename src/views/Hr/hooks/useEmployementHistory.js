import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../config";

const fetchEmploymentHistory = async (employeeId) => {
  const { data } = await axios.get(`${API}/api/employees/${employeeId}/employment-history`);
  return data.data;
};

const useEmploymentHistory = (employeeId) => {
  return useQuery(["employmentHistory", employeeId], () => fetchEmploymentHistory(employeeId));
};

export default useEmploymentHistory;