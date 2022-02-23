import React from 'react';
import { FaBold, FaItalic, FaUnderline, FaListOl, FaListUl, FaRemoveFormat, FaUndo, FaRedo } from 'react-icons/fa';

const HeadingButton = ({editor, level}) => (
  <button
    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
    className={editor.isActive('heading', {level}) ? 'active': ''}
  >
    H{level}
  </button>
)

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
      <HeadingButton editor={editor} level={1} />
      <HeadingButton editor={editor} level={2} />
      <HeadingButton editor={editor} level={3} />
      <HeadingButton editor={editor} level={4} />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'active' : ''}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'active' : ''}
      >
        <FaListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <FaRemoveFormat />
      </button>
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <FaUndo />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <FaRedo />
      </button>
    </div>
  )
}

export default Toolbar;