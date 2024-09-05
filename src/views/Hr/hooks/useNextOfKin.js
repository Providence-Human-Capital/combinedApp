import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../config";

const fetchNextOfKin = async (employeeId) => {
  const { data } = await axios.get(`${API}/api/employees/${employeeId}/next-of-kin`);

  console.log("This is the Next", data.data[0])
  return data.data[0];
};

const useNextOfKin = (employeeId) => {
  return useQuery(["nextofkin", employeeId], () => fetchNextOfKin(employeeId));
};

export default useNextOfKin;
