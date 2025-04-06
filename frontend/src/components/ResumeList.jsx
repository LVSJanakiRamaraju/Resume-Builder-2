import React from "react";

const ResumeList = ({ resumes }) => {
    return (
        <div className="mt-5 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center">📋 Submitted Resumes</h2>
            {resumes.map((resume, index) => (
                <div key={index} className="bg-white p-3 my-3 shadow-lg rounded">
                    <p><strong>Name:</strong> {resume.name}</p>
                    <p><strong>Email:</strong> {resume.email}</p>
                    <p><strong>Education:</strong> {resume.education}</p>
                    <p><strong>Skills:</strong> {resume.skills.join(", ")}</p>
                    <p><strong>Experience:</strong> {resume.experience}</p>
                    {resume.fileUrl && <a href={`https://resume-builder-2-q4xd.onrender.com/${resume.fileUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">📄 View Resume</a>}
                </div>
            ))}
        </div>
    );
};

export default ResumeList;
