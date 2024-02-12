import { useState, useEffect } from 'react'
import { getEmployees, getEmployeesForManager, getEmployeeInfo } from './getData'
import {Table, TableHolder} from './Table'
import './App.css'
import { CustomButton } from './components/CustomButton'
import { TextField } from './components/TextField'
import { useParams } from 'react-router-dom'
import { CurrentEmployeeInfo } from './CurrentEmployeeInfo'
import { useNavigate } from "react-router-dom";

function PrintData() {
  console.log("EHEKE")
}

function App() {
  const [managedEmployees, setManagedEmployees] = useState([])
  const [managers, setManagers] = useState([])
  const [otherEmployees, setOtherEmployees] = useState([])
  const [currentManagerInfo, seManagerInfo] = useState([])
  const [isInHR, setIsInHR] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  let { id } = useParams();
  const navigate = useNavigate();

  const goToSalaryPrediction = () => {
    navigate(`/salaryPrediction`)
}

const logOutOfSite = () => {
  navigate(`/login`)
}

  useEffect(() => {
    getEmployeesForManager(id, searchTerm)
      .then(data => 
        {setManagedEmployees(data.employeesmanaged),
        setManagers(data.othermanagers),
        setOtherEmployees(data.otheremployees)}
            )
  }, [searchTerm]);

  useEffect(() => {
    getEmployeeInfo(id)
      .then(data => 
        {seManagerInfo(data),
        setIsInHR(data.job=="HR")}
            )
  }, []);

  return (
    <>
    <div className='w-full h-20 flex flex-wrap flex-row justify-between items-center align-middle'>
    <CustomButton buttonText="Back" onClick={logOutOfSite}></CustomButton>
    <h3 className="font-bold">Employee Database</h3>
      <div className='gap-6 flex flex-row'>
      <TextField placeholder="Search names" getter={searchTerm} setter={setSearchTerm}></TextField>
      <CustomButton buttonText="Salary Predictor" onClick={goToSalaryPrediction}></CustomButton>
      </div>
    </div>
    <CurrentEmployeeInfo employee={currentManagerInfo}></CurrentEmployeeInfo>

<TableHolder title="Employees I Manage">
      {managedEmployees.length ? 
      <Table isExpanded={managedEmployees.length == 0 ? true : false} showSalary={currentManagerInfo.isManager || isInHR} employees={managedEmployees}></Table> : <h1> Loading....</h1> } 
</TableHolder>

<TableHolder title="Other Managers">
      {managers.length ? 
      <Table isExpanded={managedEmployees.length == 0 ? true : false} showSalary={isInHR} employees={managers}></Table> : <h1> Loading....</h1> } 
</TableHolder>

<TableHolder title="All Other Employees">
      {otherEmployees.length ? 
      <Table isExpanded={otherEmployees.length == 0 ? true : false} showSalary={isInHR} employees={otherEmployees}></Table> : <h1> Loading....</h1> } 
</TableHolder>
    </>
  )
}

export default App