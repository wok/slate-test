import React, { Component, useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import { ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const editorStateFromHtml = (html) => {
  const contentBlock = htmlToDraft(html || '');
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    return EditorState.createWithContent(contentState);
  }
  else {
    return EditorState.createEmpty();
  }
}

export function HtmlEditor(props) {

  const [editorState, setEditorState] = useState(editorStateFromHtml(props.value));

  useEffect(() => {
    setEditorState(editorStateFromHtml(props.value));
  }, [props.value]);

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  }

  const handleBlur = () => {
    const htmlValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    props.onChange(htmlValue);
  }

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorStateChange}
      onBlur={handleBlur}
    />
  )
};

