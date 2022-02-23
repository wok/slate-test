import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import classNames from 'classnames';
import Toolbar from './toolbar';

const souldShowBubble = ({ editor, view, state, oldState, from, to }) => {
  return editor.isActive('link')
};


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
      Underline,
      Link.configure({
        openOnClick: false,
      }),
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

  if (!editor) {
    return null;
  }

  return (
    <div className={classNames('html-editor', props.className)}>
      <BubbleMenu editor={editor} tippyOptions={{ duration: 100, placement: 'bottom' }} shouldShow={souldShowBubble}>
        <div className="link-menu">
          {editor.getAttributes('link').href}
        </div>
      </BubbleMenu>
      <EditorContent editor={editor} />
      <Toolbar editor={editor} />
    </div>
  )
};

export default HtmlEditor;