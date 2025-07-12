import React, {useEffect, useState} from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const ListEmployeeComponent = () => {

    // const dummyData = [
    //     {
    //         "id" : 1,
    //         "firstName" : "Luyanda",
    //         "lastName" : "Nkosi", 
    //         "email" : "luyandan@gmail.com",
    //     },
    //     {
    //         "id" : 2,
    //         "firstName" : "Liya",
    //         "lastName" : "Goodman",
    //         "email" : "liyagoodma@gmail.com",

    //     },
    //     {
    //         "id" : 3,
    //         "firstName" : "Johnny",
    //         "lastName" : "Bravo", 
    //         "email" : "jbravo@gmail.com"

    //     },
    // ]

    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getAllEmployee();
    }, [])


    function getAllEmployee(){
         listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    const navigator = useNavigate();

    //changing to the page of adding new employee
    function addNewEmployee(){
        navigator('/add-employee')
    }

    //changing to the page of updating an employee
    function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
    }  

    //remove the employee id
    function removeEmployee(id){
        console.log(id);

        deleteEmployee(id).then((response) => {
            getAllEmployee(id)

        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>List Of Emloyees</h2>

        <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => updateEmployee(employee.id)}>Update</button>
                                <button className="btn btn-danger" onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent