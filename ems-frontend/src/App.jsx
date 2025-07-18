
import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponnent from './components/FooterComponnent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* http://localhost:3000 */}
            <Route path='/' element= { <ListEmployeeComponent /> } />
            {/* http://localhost:3000/employees */}
            <Route path='/employees' element= { <ListEmployeeComponent /> } />
            {/* http://localhost:3000/add-employee */}
            <Route path='/add-employee' element= { <EmployeeComponent />} />  
            {/* http://localhost:3000/edit-employee/1 */}
            <Route path='/edit-employee/:id' element= { <EmployeeComponent />} />
            
          </Routes>
        
        <FooterComponnent />
      </BrowserRouter>
      
    </>
  )
}

export default App
