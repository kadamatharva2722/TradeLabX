import React from "react";
import './App.css';
import Navbar from "./component/navbar";
import MainHeading from "./component/mainHeading";
import Buttonn from "./component/buttons";
import CardDiv from "./component/card";
import { Routes, Route } from 'react-router'
import Signin from "./signin";
import Login from "./login";
import DashBoard from "./dashboard";
import History from "./history";
import UserProfile from "./component/userProfile";

function App() {

  return (
    <Routes>
      <Route path='/' element={<div className="background">
        <Navbar />
        <MainHeading />
        <Buttonn />
        <CardDiv />
      </div>} />

      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<DashBoard />}></Route>
      <Route path="history" element={<History />}></Route>
        <Route path="/userProfile" element={<UserProfile/>}></Route>
    </Routes>
  )
}

export default App;
