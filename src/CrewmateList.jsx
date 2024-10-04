import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';

const CrewmateList = ({ crewmates, setCrewmates }) => {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newAttribute, setNewAttribute] = useState('');

  // delete
  const deleteCrewmate = async (id) => {
    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting crewmate:', error);
      } else {
        // update local state
        setCrewmates(crewmates.filter(crewmate => crewmate.id !== id));
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  // update
  const updateCrewmate = async (id) => {
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({ name: newName, attribute: newAttribute })
        .eq('id', id);

      if (error) {
        console.error('Error updating crewmate:', error);
      } else {
        // update local state
        const updatedCrewmates = crewmates.map(crewmate =>
          crewmate.id === id
            ? { ...crewmate, name: newName, attribute: newAttribute }
            : crewmate
        );
        setCrewmates(updatedCrewmates);
        setEditingId(null); // close editing mode
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div>
      <h2>Fireteam Members</h2>
      <ul>
        {crewmates.map((crewmate) => (
          <li key={crewmate.id}>
            {/* show update form if editing, otherwise show crewmate info */}
            {editingId === crewmate.id ? (
              <div>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  placeholder="New Name" 
                />
                <input 
                  type="text" 
                  value={newAttribute} 
                  onChange={(e) => setNewAttribute(e.target.value)} 
                  placeholder="New Attribute" 
                />
                <button onClick={() => updateCrewmate(crewmate.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <Link to={`/crewmates/${crewmate.id}`}>{crewmate.name}</Link> - {crewmate.attribute}
                <button onClick={() => { setEditingId(crewmate.id); setNewName(crewmate.name); setNewAttribute(crewmate.attribute); }}>Edit</button>
                <button onClick={() => deleteCrewmate(crewmate.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrewmateList;
