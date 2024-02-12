import React, { useState } from 'react';
import { CustomButton } from './components/CustomButton';
import { useNavigate } from "react-router-dom";
import { CustomDropdown } from './components/CustomDropdown';

function SalaryPrediction() {
  const [location, setLocation] = useState('');
  const [job, setJob] = useState('');
  const [prediction, setPrediction] = useState('');
  const navigate = useNavigate();

  const apiUrl = 'http://127.0.0.1:5000';

  const navigateToPage = () => {
    navigate(-1)
}


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/predict", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({location: location, job: job}),
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data ? data: "Invalid Inputs");
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className=''>
      <div className='flex flex-row pb-10 gap-6'>
      <CustomButton buttonText="Back" onClick={navigateToPage}></CustomButton>
      <h1 className="font-bold text-2xl">Estimate Your Compensation</h1>
      </div>
      
      <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
        <label>
          Role: 
          <CustomDropdown items={ ["IT", "Data Scientist", "Building Security", "Custodial", "Software Engineer", "CyberSecurity", "HR", "Customer Support", "Finance", "Accounting"]} getter={job} setter={setJob}></CustomDropdown>
         
        </label>
        <label>
          Location: 
          <CustomDropdown items={["Hartford, Connecticut", "San Francisco, California", "Topeka, Kansas", "Boston, Massachusetts", "New York City, New York"]} getter={location} setter={setLocation}></CustomDropdown>

        </label>
        <CustomButton type="submit" buttonText="Predict"></CustomButton>

      </form>
      {prediction && (
        <div className="text-3xl font-medium">
          <p>The predicted salary for a {job} role in {location} is ${prediction.slice(1, prediction.length - 1)}</p>
        </div>
      )}
    </div>
  );
}

export default SalaryPrediction;