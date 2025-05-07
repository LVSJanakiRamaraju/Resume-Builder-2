import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResumeForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    skills: '',
    experience: '',
    hobbies: '',
    achievements: '',
    projects: '',
    linkedin: '',
    github: '',
    portfolio: '',
    languages: '',
    certifications: '',
    objective: '',
    dob: '',
    gender: '',
  });

  const [showViewButton, setShowViewButton] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://resume-builder-2-q4xd.onrender.com/api/resumes/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Resume added successfully!');
        setForm({
          name: '',
          email: '',
          phone: '',
          address: '',
          education: '',
          skills: '',
          experience: '',
          hobbies: '',
          achievements: '',
          projects: '',
          linkedin: '',
          github: '',
          portfolio: '',
          languages: '',
          certifications: '',
          objective: '',
          dob: '',
          gender: '',
        });
        setShowViewButton(true);
      } else {
        alert(data.message || 'Failed to add resume');
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    background: '#f0f4f8',
    minHeight: '100vh',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '700px',
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    marginBottom: '6px',
    fontSize: '0.95rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginBottom: '16px',
    backgroundColor: '#f9f9f9',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <>
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>📝 Add Resume</h2>

        {Object.entries(form).map(([key, value]) => (
          <div key={key}>
            <label style={labelStyle}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              required={['name', 'email', 'education', 'skills', 'experience'].includes(key)}
              style={inputStyle}
            />
          </div>
        ))}

        <button type="submit" style={buttonStyle}>
          Submit Resume
        </button>
      </form>
      </div>
      <div>
      
        <button
          onClick={() => navigate('/view-resume')}
          style={{ marginTop: '20px', backgroundColor: '#2196F3', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '6px' }}
        >
          View Resume
        </button>
      </div>
    
    </>
    
  );
}

export default ResumeForm;
