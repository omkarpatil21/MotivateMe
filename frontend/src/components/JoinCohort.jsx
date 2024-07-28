import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JoinCohort() {
  const [cohortName, setCohortName] = useState('');
  const [cohorts, setCohorts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all cohorts from the backend
    const fetchCohorts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/cohort/`);
        setCohorts(response.data);
      } catch (error) {
        console.error('Error fetching cohorts:', error);
      }
    };

    fetchCohorts();
  }, []);

  const handleJoin = async (cohortName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const username = tokenPayload.username;

      if (!username) {
        throw new Error('Username not found in token');
      }

      // Send a request to the backend to join the cohort
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/cohort/join`, 
        { cohortName, username },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          }
        }
      );

      console.log(response.data);
      navigate(`/cohort/${cohortName}`); // Navigate after successfully joining the cohort
    } catch (error) {
      console.error('Error joining cohort:', error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Join a Cohort</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Cohort Name:
          <input 
            type="text" 
            value={cohortName}
            onChange={(e) => setCohortName(e.target.value)}
            required
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button 
          onClick={() => handleJoin(cohortName)} 
          style={{ padding: '10px 20px', marginLeft: '10px' }}
        >
          Join
        </button>
      </div>
      <h3>Available Cohorts:</h3>
      <ul>
        {cohorts.map(cohort => (
          <li key={cohort._id} style={{ marginBottom: '10px' }}>
            {cohort.name}
            <button 
              onClick={() => handleJoin(cohort.name)} 
              style={{ padding: '5px 10px', marginLeft: '10px' }}
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JoinCohort;
