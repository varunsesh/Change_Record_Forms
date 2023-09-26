import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor
import '../styles.css' ;
class CustomRichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleChange = (value) => {
    this.setState({ text: value });
  };

  render() {
    return (
      <div>
         <ReactQuill
          value={this.state.text}
          onChange={this.handleChange}
          modules={CustomRichTextEditor.modules}
          formats={CustomRichTextEditor.formats}
          className="custom-editor" // Apply the CSS class here
        />

      </div>
    );
  }
}

// Define the modules and formats for the editor
CustomRichTextEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ align: [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

CustomRichTextEditor.formats = [
  'header',
  'font',
  'list',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'link',
  'image',
];

export default CustomRichTextEditor;
