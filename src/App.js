import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    imageLink: '',
    gender: '',
    skills: {
      java: false,
      html: false,
      css: false,
      python: false,
    },
  });
  const [students, setStudents] = useState(JSON.parse(localStorage.getItem('students')) || []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      skills: {
        ...prevData.skills,
        [name]: checked,
      },
    }));
  };

  const handleSubmit = () => {
    setStudents((prevStudents) => [...prevStudents, formData]);
    localStorage.setItem('students', JSON.stringify([...students, formData]));
    // Clear the form data
    setFormData({
      name: '',
      email: '',
      website: '',
      imageLink: '',
      gender: '',
      skills: {
        java: false,
        html: false,
        css: false,
        python: false,
      },
    });
  };

  return (
    <div className="app-container">
      <h1>Student Enrollment Form</h1>
      <hr></hr>
      <div className="body-container">
      <div className="form-container">
        <h2>Enroll Here</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
          <label>Image Link:</label>
          <input
            type="text"
            name="imageLink"
            value={formData.imageLink}
            onChange={handleInputChange}
          />
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label>Skills:</label>
          <div>
          <div className="skills-container">
  <label>
    <input
      type="checkbox"
      name="java"
      checked={formData.skills.java}
      onChange={handleCheckboxChange}
    />
    Java
  </label>
  <label>
    <input
      type="checkbox"
      name="html"
      checked={formData.skills.html}
      onChange={handleCheckboxChange}
    />
    HTML
  </label>
  <label>
    <input
      type="checkbox"
      name="css"
      checked={formData.skills.css}
      onChange={handleCheckboxChange}
    />
    CSS
  </label>
  <label>
    <input
      type="checkbox"
      name="python"
      checked={formData.skills.python}
      onChange={handleCheckboxChange}
    />
    Python
  </label>
</div>

          </div>
          <button type="button" onClick={handleSubmit}>
            Enroll Student
          </button>
        </form>
      </div>
      <div className="cards-container">
      <h2>Enrolled students</h2>
      <br/>
      {students.map((student, index) => (
        <div key={index} className="student-card">
          <div className="student-image">
            <img src={student.imageLink} alt={`${student.name}'s Photo`} />
          </div>
          <div className="student-details">
            <h3>{student.name}</h3>
            <p>Email: {student.email}</p>
            <p>Website: {student.website}</p>
            <p>Gender: {student.gender}</p>
            <p>Skills: {Object.keys(student.skills).filter(skill => student.skills[skill]).join(', ')}</p>
            {/* Display other student information */}
          </div>
        </div>
      ))}
    </div></div>
  </div>
  );
  
}

export default App;
