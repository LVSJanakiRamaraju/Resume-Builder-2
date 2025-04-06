import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ResumeForm from "./components/ResumeForm";
import ResumeList from "./components/ResumeList";
import ViewResume from './components/ViewResume';

const App = () => {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/resumes/list");
            setResumes(response.data);
        } catch (error) {
            console.error("Error fetching resumes:", error);
        }
    };

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-5">📄 Resume Builder</h1>
            <Router>
                <Routes>
                    <Route path="/" element={<ResumeForm onResumeAdded={fetchResumes} />} />
                    <Route path="/view-resume" element={<ViewResume />} />
                </Routes>
            </Router>
             
        </div>
    );
};

export default App;
