import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const CrewmateForm = ({ crewmates, setCrewmates }) => {
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');

  const addCrewmate = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('crewmates')
        .insert([{ name, attribute }])
        .select(); // explicitly request the data to be returned

      if (error) {
        console.error('Error inserting crewmate:', error);
        return;
      }

      if (Array.isArray(data)) {
        setCrewmates([...crewmates, ...data]);
      } else {
        console.error('Unexpected response format:', data);
      }

      setName('');
      setAttribute('');
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <form onSubmit={addCrewmate}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Fireteam Member Name"
        required
      />
      
      <select value={attribute} onChange={(e) => setAttribute(e.target.value)} required>
        <option value="" disabled>Select Class</option>
        <option value="Hunter">Hunter</option>
        <option value="Warlock">Warlock</option>
        <option value="Titan">Titan</option>
      </select>

      <button type="submit">Add Fireteam Member</button>
    </form>
  );
};

export default CrewmateForm;
