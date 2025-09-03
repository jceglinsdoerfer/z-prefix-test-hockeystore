import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CreateNewUser from "./components/CreateNewUser";
import Items from "./components/Items";
import ItemsDetails from "./components/ItemsDetails";
import Login from "./components/Login";
import UserItems from "./components/UserItems";
import Users from "./components/Users";
import UsersDetails from "./components/UsersDetails";

function App() {
  return (
    <>
      <Routes> 
        <Route path="/" element={<Navigate to="/Home" replace />}/> 
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/CreateNewUser" element={<CreateNewUser/>}/>
        <Route path="/Items" element={<Items/>}/>
        <Route path="/Users" element={<Users/>}/>
      </Routes> 
      
    </>
  );
}

export default App
