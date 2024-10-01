import React from 'react';
import { supabase } from './supabaseClient';

const CrewmateList = ({ crewmates, setCrewmates }) => {

  const deleteCrewmate = async (id) => {
    const { error } = await supabase
      .from('crewmates')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting crewmate:', error);
    } else {
      setCrewmates(crewmates.filter((crewmate) => crewmate.id !== id));
    }
  };

  return (
    <ul>
      {crewmates.map((crewmate) => (
        <li key={crewmate.id}>
          {crewmate.name}
          <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default CrewmateList;
