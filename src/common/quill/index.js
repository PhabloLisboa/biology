import React, {Component} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types'

import 'react-quill/dist/quill.snow.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    this.quill = React.createRef(); // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this)
  }
  modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      [ 'bold', 'italic', 'underline', 'strike' ],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'super' }, { 'script': 'sub' }],
      [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
      [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
      [ 'direction', { 'align': [] }],
      [ 'link', 'image', 'video', 'formula' ],
      [ 'clean' ]
    ],
  }

  handleChange(value) {    
    this.setState({ text: value })
  }

  insertComplementation(number){
    const editor = this.quill.current.makeUnprivilegedEditor(this.quill.current.getEditor())
    this.quill.current.focus()
    const cursorPosition = editor.getSelection().index
    this.quill.current.getEditor().setSelection(cursorPosition + 1)
    this.quill.current.getEditor().insertText(cursorPosition, `Complementação ${number}`)
    this.quill.current.getEditor().setSelection(this.quill.current.getEditor().getLength() + 2)
  }

  render() {
    return (
      <ReactQuill value={this.state.text}
                  onChange={this.handleChange}
                  modules={this.modules}
                  ref={this.quill}/>
    )
  }
}

export default Editor