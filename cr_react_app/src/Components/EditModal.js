import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditModal({ record, isOpen, onSave, onCancel }) {
  const [editedRecord, setEditedRecord] = useState(record);

  useEffect(() => {
    console.log(record);
    if (record) {
      setEditedRecord(record.summary); // Ensure record is valid
    }
     // Update state when the record prop changes
  }, [record]);

  const handleSave = () => {
    const updateRecordData = {
      pid:record.project_id,
      cr_id:record.cr_id,
      requester_name:record.requester_name,
      title:record.title,
      summary:editedRecord
    }
    onSave(updateRecordData); // Pass the edited record back to the parent component
  };
  
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot" // #5 Optinal if using custom formats
  ];

  const modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ],
  }

  return (
    <Modal show={isOpen} onHide={onCancel}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Editing Change record </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <ReactQuill value={editedRecord} 
      onChange={(value)=>setEditedRecord(value)} 
      modules={modules}
      formats={formats}
      />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>Close</Button>
          <Button variant="primary" onClick={handleSave}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default EditModal;
