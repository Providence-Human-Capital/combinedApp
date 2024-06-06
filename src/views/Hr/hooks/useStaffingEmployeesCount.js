import { useQuery } from "react-query";
import axios from "axios";
import { API } from "../../../../config";

const fetchStaffingEmployeesCount = async () => {
    const { data } = await axios.get(`${API}/api/staffing-employees-count`);
    return data;
};

const useStaffingEmployeesCount = () => {
    return useQuery('staffingEmployeesCount', fetchStaffingEmployeesCount);
};

export default useStaffingEmployeesCount;
