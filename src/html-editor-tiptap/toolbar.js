import React from 'react';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';

function Toolbar ({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'active' : ''}
      ><FaBold /></button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'active' : ''}
      ><FaItalic /></button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'active' : ''}
      ><FaUnderline /></button>
    </div>
  )
}

export default Toolbar;