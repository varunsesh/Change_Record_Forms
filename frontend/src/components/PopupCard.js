// PopupCard.js (Separate Component for Pop-Up Card)

import React from 'react';

function PopupCard({ data, onClose }) {


   const summaryHTML = {__html: data.summary};
  

  return (
    <div className="popup-card">
      <h2>{data.username}</h2>
      <p>{data.title}</p>
      <div dangerouslySetInnerHTML={summaryHTML}/>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default PopupCard;
