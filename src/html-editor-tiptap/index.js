import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import classNames from 'classnames';
import Toolbar from './toolbar';

function HtmlEditor(props) {

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1,2,3,4]
        },
        code: false,
        codeBlock: false,
        mention: false
      }),
      Underline
    ],
    content: props.value,
    onBlur: ({editor}) => {
      props.onChange(editor.getHTML());
    }
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== props.value) {
      editor.commands.setContent(props.value);
    }
  }, [props.value, editor]);


  return (
    <div className={classNames('html-editor', props.className)}>
      <EditorContent editor={editor} />
      <Toolbar editor={editor} />
    </div>
  )
};

export default HtmlEditor;