import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName =(e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);

    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() =>{

        if(id){
            getEmployee(id).then((response) =>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.log(error);
            })
        }

    }, [id])
   

    const [errors ,setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    function saveOrUpdateEmployee(e){
        e.preventDefault();

        //validete the input field on submission 
        if(validateForm()){

            const employee = {firstName, lastName, email}
            console.log(employee)

            //update when id exists
            if(id){
                updateEmployee(id, employee).then((response) =>{
                    console.log(response.data);
                    navigator('/employees')
                }).catch(error => {
                    console.log(error);
                })
            }else{
                //create new if not
                createEmployee(employee).then((response) => {
                    console.log(response.data)
                    navigator('/employees')
                }).catch(error => {
                    console.log(error);
                })
            } 
        }
    }

    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        //validating if the first name input field is empty or not
        if (firstName.trim()){
            errorsCopy.firstName ='';
        }else{
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }
        
        //validating if the last name input field is empty or not
        if (lastName.trim()){
            errorsCopy.lastName ='';
        }else{
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        //validating if the email input field is empty or not
        if (email.trim()){
            errorsCopy.email ='';
        }else{
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    //changing the adding employee title to update employee since we are using the same page dynamically to fit both add and update functions
 
    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Employee</h2>
        }else{
            return <h2 className="text-center">Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br /> <br />
        <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                {
                    pageTitle()
                }
                <div className="card-body">
                    <form action="">
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">First Name: </label>
                            <input type="text"
                            placeholder='Enter Employee First Name' 
                            name='firstName'
                            value={firstName}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            onChange={handleFirstName}/>
                            { errors.firstName && <div className='invali-feedback'> {errors.firstName} </div>}
                        </div> 
                        
                        <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Last Name: </label>
                            <input type="text"
                            placeholder='Enter Employee Last Name' 
                            name='lastName'
                            value={lastName}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                            onChange={handleLastName}/>
                            { errors.lastName && <div className='invali-feedback'> {errors.lastName} </div>}

                        </div>
                        
                         <div className="form-group mb-2">
                            <label htmlFor="" className="form-label">Email: </label>
                            <input type="email"
                            placeholder='Enter Employee Email' 
                            name='email'
                            value={email}
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            onChange={handleEmail}/>
                            { errors.email && <div className='invali-feedback'> {errors.email} </div>}

                        </div>

                        <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Submit</button>

                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default EmployeeComponent