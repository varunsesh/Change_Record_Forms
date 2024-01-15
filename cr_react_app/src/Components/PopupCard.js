import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../styles.css";

function PopupCard({ isOpen, data, onCancel }) {
  var styles = {
    root: {
      maxWidth: "794px", // Width of A4 sheet at 96 DPI
      maxHeight: "1123px", // Height of A4 sheet at 96 DPI
      margin: "auto", // Center the modal
      overflowY: "auto" // Add scroll for overflow content
    },
    modal: {
      display: "block",
      overflow: "hidden"
    }
  }


  return (
    <div>
      {data && (
        <Modal show={isOpen} onHide={onCancel}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>{data.title}</h4>
              <p>{data.username}</p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body >
            <div align='left' style={styles} dangerouslySetInnerHTML={{__html: data.summary}}/>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onCancel}>Close</Button>
            <Button variant="primary" >Print</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default PopupCard;
