import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../../../../config';

const fetchEmployeeOccupations = async () => {
    const { data } = await axios.get(`${API}/api/occupations`);
console.log("Occupations",data);
    return data;
};

const useOccupations = () => {
    return useQuery('staffingOccupations', fetchEmployeeOccupations);
};

export default useOccupations;
