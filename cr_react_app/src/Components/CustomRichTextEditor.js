import React, { Component, useState, useEffect } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import ImageUploader from "quill-image-uploader";
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor
import '../styles.css' ;
import { resizeFile } from 'react-image-file-resizer';
import Button from 'react-bootstrap/Button'


function CustomRichTextEditor({ onContentChange, isReset }) {
  const [editorHtml, setEditorHtml] = useState('');
  const [base64Images, setBase64Images] = useState([]);

  useEffect (()=>{
    if(isReset){setEditorHtml("");isReset=false;}
    onContentChange(editorHtml, isReset);
  
  }, [editorHtml, isReset]);
  

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
    "imageBlot" // #5 Optional if using custom formats
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
     <ReactQuill value={editorHtml} 
      onChange={(value)=>setEditorHtml(value)} 
      modules={modules}
      formats={formats}
      />
      <br></br>
    </div>
  );
}

export default CustomRichTextEditor;
