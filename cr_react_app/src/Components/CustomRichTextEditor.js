import React, { Component, useState } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageUploader from "quill-image-uploader";
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor
import '../styles.css' ;
import { resizeFile } from 'react-image-file-resizer';
import Button from 'react-bootstrap/Button'


function CustomRichTextEditor({ onContentChange, onClose, data, editMode }) {
  const [editorHtml, setEditorHtml] = useState('');
  const [base64Images, setBase64Images] = useState([]);

  
  const showData = ()=>{
    console.log("Update component");
    console.log(editMode);
    const summary = editMode ? data.summary:"";
    console.log(data.summary);
    setEditorHtml(summary);
  }
  
  const handleEditorChange = (html) => {
    console.log("Edit Mode " + editMode);
    // console.log(html);
    {
      setEditorHtml(html);
      onContentChange(html, data.id);
    }
    
    
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    // Resize and convert image to base64
    resizeFile(file, 300, 300, 'JPEG', 100, 0, (base64) => {
      setBase64Images([...base64Images, base64]);
    });
    
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
    <div className='custom-editor'>
      <ReactQuill theme="snow" 
        value={editorHtml}
        onChange={handleEditorChange}
        onFocus={showData}
        modules={modules}
        formats={formats}
      />
      <br></br>
      {editMode && <Button onClick={onClose}>Update</Button>}
    </div>
  );
}

export default CustomRichTextEditor;
