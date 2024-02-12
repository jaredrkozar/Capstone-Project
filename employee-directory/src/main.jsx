import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Manager from './Manager.jsx'
import {LoginPage} from './LoginPage.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SalaryPrediction from './SalaryPrediction.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/employees/:id" element={<App />}></Route>
        <Route path="/manager/:id" element={<Manager />}></Route>
        <Route path="/salaryPrediction" element={<SalaryPrediction />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
