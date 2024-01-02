import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../styles.css";

function PopupCard({ isOpen, data, onCancel }) {
  return (
    <div className="popup-card">
      {data && (
        <Modal show={isOpen} onHide={onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>{data.title}</h4>
              <p>{data.username}</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className='.popup-card'>
            <div align='left' dangerouslySetInnerHTML={{__html: data.summary}}/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default PopupCard;
