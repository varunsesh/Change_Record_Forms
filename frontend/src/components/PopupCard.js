// PopupCard.js (Separate Component for Pop-Up Card)

import React from 'react';

function PopupCard({ data, onClose }) {
  return (
    <div className="popup-card">
      <button onClick={onClose}>Close</button>
      <h2>{data.username}</h2>
      <p>{data.title}</p>
      <p>{data.summary}</p>
    </div>
  );
}

export default PopupCard;
