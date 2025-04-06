import { useState } from 'react';

function ViewResume() {
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const formattedEmail = email.trim().toLowerCase();
      const res = await fetch(`http://localhost:5000/api/resumes/list/${formattedEmail}`);
      if (!res.ok) throw new Error('Resume not found');

      const data = await res.json();
      if (data.length === 0) throw new Error('Resume not found');

      setResume(data[0]);
      setError('');
    } catch (err) {
      setResume(null);
      setError('Resume not found');
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f2f2f2', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div style={{
        maxWidth: '850px',
        margin: '0 auto',
        background: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🎯 View My Resume</h2>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              padding: '10px',
              width: '300px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            View
          </button>
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

        {resume && (
          <div style={{ marginTop: '40px' }}>
            {/* Header Section */}
            <div style={{ borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '20px' }}>
              <h1 style={{ margin: 0, fontSize: '32px' }}>{resume.name}</h1>
              <p style={{ margin: '5px 0', fontSize: '16px' }}>
                {resume.email} | {resume.phone} | {resume.address}
              </p>
              <p style={{ margin: '5px 0', fontSize: '16px' }}>
                <a href={resume.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> |{' '}
                <a href={resume.github} target="_blank" rel="noreferrer">GitHub</a> |{' '}
                <a href={resume.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
              </p>
            </div>

            {/* Objective */}
            <Section title="Career Objective" content={resume.objective} />

            {/* Education */}
            <Section title="Education" content={resume.education} />

            {/* Experience */}
            <Section title="Experience" content={resume.experience} />

            {/* Projects */}
            <Section title="Projects" content={resume.projects} />

            {/* Skills */}
            <Section title="Skills" content={Array.isArray(resume.skills) ? resume.skills.join(', ') : resume.skills} />

            {/* Certifications */}
            <Section title="Certifications" content={resume.certifications} />

            {/* Achievements */}
            <Section title="Achievements" content={resume.achievements} />

            {/* Hobbies */}
            <Section title="Hobbies" content={resume.hobbies} />

            {/* Languages */}
            <Section title="Languages Known" content={resume.languages} />

            {/* Personal Details */}
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ borderBottom: '1px solid #aaa', paddingBottom: '5px' }}>Personal Information</h3>
              <p><strong>Date of Birth:</strong> {resume.dob}</p>
              <p><strong>Gender:</strong> {resume.gender}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;
  return (
    <div style={{ marginBottom: '25px' }}>
      <h3 style={{
        borderBottom: '1px solid #aaa',
        paddingBottom: '5px',
        fontSize: '20px',
        color: '#333'
      }}>{title}</h3>
      <p style={{ fontSize: '16px', marginTop: '10px', whiteSpace: 'pre-line' }}>{content}</p>
    </div>
  );
}

export default ViewResume;
