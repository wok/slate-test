import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import classNames from 'classnames';
import Toolbar from './toolbar';
import { getLinkDetails, insertLink, LinkEditor, removeLink } from './link';
import { FaUnlink, FaPen } from 'react-icons/fa';
import Image from '@tiptap/extension-image';

const truncate = (str, max) => {
  return (str?.length || 0) < max ? str : 
  `${str.substr(0, max)}...`;
}

function HtmlEditor(props) {

  const [linkForEditing, setLinkForEditing] = useState();
  const [focus, setFocus] = useState(false);

  const souldShowBubble = ({ editor, view, state, oldState, from, to }) => {
    return editor.isActive('link');
  };

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
      Link.extend({
        addKeyboardShortcuts() {
          return {
            'Mod-k': () => setLinkForEditing(getLinkDetails(this.editor)),
          }
        }
      }).configure({
        openOnClick: false,
        autolink: false,
        HTMLAttributes: {
          target: null,
          rel: null
        }
      }),
      Image
    ],
    content: props.value,
    onBlur: ({editor}) => {
      props.onChange(editor.getHTML());
      setFocus(false);
    },
    onFocus: () => {
      setFocus(true);
    }
  });

  const handleEditLink = () => {
    setLinkForEditing(getLinkDetails(editor));
  };

  useEffect(() => {
    if (editor && editor.getHTML() !== props.value) {
      editor.commands.setContent(props.value);
    }
  }, [props.value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={classNames('html-editor', props.className, {focus: focus && !linkForEditing})}>
      <BubbleMenu editor={editor} tippyOptions={{ placement: 'bottom-start' }} shouldShow={souldShowBubble}>
        <div className="link-menu">
          <a href={editor.getAttributes('link').href} target="_blank" rel="noreferrer">{truncate(editor.getAttributes('link').href, 40)}</a>
          <button onClick={handleEditLink}><FaPen /> </button>
          <button onClick={() => removeLink(editor)}><FaUnlink /></button>
        </div>
      </BubbleMenu>
      <EditorContent editor={editor} />
      <Toolbar editor={editor} onEditLink={handleEditLink} />
      {linkForEditing && 
        <LinkEditor 
          {...linkForEditing}
          onCancel={() => setLinkForEditing(null)}
          onSubmit={(link) => {
            insertLink(editor, link);
            setLinkForEditing(null);
            setTimeout(() => editor.commands.focus(), 100);
          }}
        />
      }
    </div>
  )
};

export default HtmlEditor;