import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './component/Register.jsx';
import Login from './component/Login.jsx';
import ScriptCheck from './component/ScriptCheck.jsx'; // Import the ScriptCheck component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/script-check" element={<ScriptCheck />} /> {/* Adjust path as needed */}
            </Routes>
        </Router>
    );
};

export default App;
