import React from "react";
import ReactDOM from "react-dom/client";
import './styles/Style.scss'
import { Login } from "./Login";
import { Register } from "./Register";
import { Users } from "./Users";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Users" element={<Users />} />
            </Routes>
        </Router>
    </React.StrictMode>
);