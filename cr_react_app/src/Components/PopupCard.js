// PopupCard.js (Separate Component for Pop-Up Card)

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function PopupCard({ isOpen, data }) {
  

  const summaryHTML = {__html: data.summary};
  const onCancel = ()=>{console.log("cancel madi");}

  return (
    <div className="popup-card">
      <Modal show={isOpen}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title><h4>{data.title}</h4></Modal.Title>
          <Modal.Title><p>{data.username}</p></Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <div align='left' dangerouslySetInnerHTML={summaryHTML}/>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
      {/* <h4>{data.title}</h4>
      <p>{data.username}</p>
      <div align="left" dangerouslySetInnerHTML={summaryHTML}/>
      <button onClick={onClose}>Close</button> */}
    </div>
  );
}

export default PopupCard;
