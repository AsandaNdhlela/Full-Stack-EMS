import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';
//get all method
export const listEmployees = () => {
    return axios.get(REST_API_BASE_URL);
}

//create method
export const createEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
}

//get method
export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL + '/' + employeeId);

//update method
export const updateEmployee = (employeeId, employee) => axios.put(REST_API_BASE_URL + '/' + employeeId, employee); 

//delete methode
export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL + '/' + employeeId)