import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../../../../config';

const fetchStaffingCompanies = async () => {
    const { data } = await axios.get(`${API}/api/staffing-companies`);
    return data.data;
};

const useStaffingCompanies = () => {
    return useQuery('staffingCompanies', fetchStaffingCompanies);
};

export default useStaffingCompanies;
