import { useQuery } from 'react-query';
import axios from 'axios';
import { API } from '../../../../config';

const fetchEmployee = async (id) => {
  const { data } = await axios.get(`${API}/api/employees/${id}`);
  console.log('Fetching Single Employee');
  console.log(data);
  return data.data;
};

const useEmployee = (id) => {
  return useQuery(['employee', id], () => fetchEmployee(id));
};

export default useEmployee;
