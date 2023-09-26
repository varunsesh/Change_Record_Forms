import React, { Component, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor
import '../styles.css' 

function CustomRichTextEditor({ onContentChange }) {
  const [editorHtml, setEditorHtml] = useState('');

  const handleEditorChange = (html) => {
    setEditorHtml(html);
    onContentChange(html);
  };

  return (
    <div className='custom-editor'>
      <ReactQuill 
        value={editorHtml}
        onChange={handleEditorChange}
        
      />
    </div>
  );
}

export default CustomRichTextEditor;
