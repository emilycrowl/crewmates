import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Adjust the path to your Supabase config
import CrewmateForm from './CrewmateForm';  // Form for adding new crewmates
import CrewmateList from './CrewmateList';  // List to display crewmates
import './App.css';

const App = () => {
  const [crewmates, setCrewmates] = useState([]);

  // Fetch existing crewmates from Supabase on initial render
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
    <div className="App">
      <h1>Destiny Team Builder</h1>

      {/* Form to add new crewmates */}
      <CrewmateForm crewmates={crewmates} setCrewmates={setCrewmates} />

      {/* List of all crewmates */}
      <CrewmateList crewmates={crewmates} setCrewmates={setCrewmates} />
    </div>
  );
};

export default App;
