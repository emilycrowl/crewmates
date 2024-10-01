import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const CrewmateForm = ({ crewmates, setCrewmates }) => {
  const [name, setName] = useState('');
  const [attribute, setAttribute] = useState('');

  const addCrewmate = async (e) => {
    e.preventDefault();

    try {
      // Insert the new crewmate into the database
      const { data, error } = await supabase
        .from('crewmates')
        .insert([{ name, attribute }]);

      // Check if there was an error during insertion
      if (error) {
        console.error('Error inserting crewmate:', error);
        return;
      }

      // Ensure 'data' is an array and contains the new crewmate
      if (Array.isArray(data)) {
        // Update the state to include the new crewmate
        setCrewmates([...crewmates, ...data]); // Spread the current array and append new crewmate
      } else {
        console.error('Unexpected response format:', data);
      }

      // Reset form fields
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
        placeholder="Crewmate Name"
        required
      />
      <input
        type="text"
        value={attribute}
        onChange={(e) => setAttribute(e.target.value)}
        placeholder="Crewmate Attribute"
        required
      />
      <button type="submit">Add Crewmate</button>
    </form>
  );
};

export default CrewmateForm;
