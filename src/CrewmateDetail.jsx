import React from 'react';
import { useParams } from 'react-router-dom';

const CrewmateDetail = ({ crewmates }) => {
  const { id } = useParams();
  const crewmate = crewmates.find((c) => c.id === id);

  if (!crewmate) {
    return <div>Fireteam member not found</div>;
  }

  return (
    <div>
      <h2>Fireteam Member Details</h2>
      <p>Name: {crewmate.name}</p>
      <p>Class: {crewmate.attribute}</p>
    </div>
  );
};

export default CrewmateDetail;
