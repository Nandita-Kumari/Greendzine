import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container" >
      <div>
        <h1 className="title">Employee List</h1>
        <input
          type="text"
          placeholder="Search by first name"
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="main-employee-list">
        <ul className="employee-list">
          {filteredEmployees.map((employee) => (
            <li key={employee.id} className="employee-item">
              <div className="avatar-container">
                <span className="employee-id">{employee.id}</span>
                <img src={employee.avatar} alt={employee.first_name} className="employee-avatar" />
                <span className="employee-name">{employee.first_name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
