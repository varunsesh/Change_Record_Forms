// PopupCard.js (Separate Component for Pop-Up Card)

import React from 'react';

function PopupCard({ data, onClose }) {


   const summaryHTML = {__html: data.summary};
  

  return (
    <div className="popup-card">
      <h4>{data.title}</h4>
      <p>{data.username}</p>
      <div align="left" dangerouslySetInnerHTML={summaryHTML}/>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default PopupCard;
