import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4Njg5NDM0LCJpYXQiOjE3MTg2ODkxMzQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImFmYzBlM2FiLTM2MDUtNDNkNy04ODFkLTJjODQzMDllOTNkZSIsInN1YiI6Imtpc2hvcmVhbmFuZHIuMjFlY2VAa29uZ3UuZWR1In0sImNvbXBhbnlOYW1lIjoiS09OR1UgRU5HSU5FRVJJTkcgQ09MTEVHRSIsImNsaWVudElEIjoiYWZjMGUzYWItMzYwNS00M2Q3LTg4MWQtMmM4NDMwOWU5M2RlIiwiY2xpZW50U2VjcmV0IjoiYmVPcUR5REZWZ1ZNbmNUcyIsIm93bmVyTmFtZSI6Iktpc2hvcmUgQW5hbmQgUiIsIm93bmVyRW1haWwiOiJraXNob3JlYW5hbmRyLjIxZWNlQGtvbmd1LmVkdSIsInJvbGxObyI6IjIxRUNSMTEwIn0.DIYW_s8xI5ID-MJJFclJAASeMBbwXRDWofo2-C9sV5o";

function App() {
  const [numberId, setNumberId] = useState('');
  const [response, setResponse] = useState(null);

  const handleFetchNumbers = async () => {
    const data = {
      companyName: "KONGU ENGINEERING COLLEGE",
      clientID: "afc0e3ab-3605-43d7-881d-2c84309e93de",
      clientSecret: "beOqDyDFVgVMncTs",
      ownerName: "Kishore Anand R",
      ownerEmail: "kishoreanandr.21ece@kongu.edu",
      rollNo: "21ECR110"
    };

    try {
      const res = await axios.post(`http://localhost:9876/numbers/${numberId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Average Calculator</h1>
      <input
        type="text"
        value={numberId}
        onChange={(e) => setNumberId(e.target.value)}
        placeholder="Enter number ID (p, f, e, r)"
      />
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {response && (
        <div>
          <h2>Previous State</h2>
          <p>{JSON.stringify(response.windowPrevState)}</p>
          <h2>Current State</h2>
          <p>{JSON.stringify(response.windowCurrState)}</p>
          <h2>Fetched Numbers</h2>
          <p>{JSON.stringify(response.numbers)}</p>
          <h2>Average</h2>
          <p>{response.avg}</p>
        </div>
      )}
    </div>
  );
}

export default App;
