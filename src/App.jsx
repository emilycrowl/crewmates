import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import CrewmateForm from './CrewmateForm';
import CrewmateList from './CrewmateList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrewmateDetail from './CrewmateDetail';
import './App.css';

const App = () => {
  const [crewmates, setCrewmates] = useState([]);

  // fetch existing crewmates from Supabase on initial render
  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('crewmates')
        .select();
      
      if (error) {
        console.error('Error fetching crewmates:', error);
      } else {
        setCrewmates(data);
      }
    };

    fetchCrewmates();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Destiny Fireteam Builder</h1>

        {/* form to add new crewmates */}
        <CrewmateForm crewmates={crewmates} setCrewmates={setCrewmates} />

        {/* routes for navigation */}
        <Routes>
          <Route 
            path="/" 
            element={<CrewmateList crewmates={crewmates} setCrewmates={setCrewmates} />} 
          />
          <Route 
            path="/crewmates/:id" 
            element={<CrewmateDetail crewmates={crewmates} setCrewmates={setCrewmates} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
