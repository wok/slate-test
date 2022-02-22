import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export function HtmlEditor(props) {

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: props.value,
    onBlur: ({editor}) => {
      props.onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(props.value);
    }
  }, [props.value, editor]);


  return (
    <div>
      <EditorContent editor={editor} className="editable" />
    </div>
  )
};

