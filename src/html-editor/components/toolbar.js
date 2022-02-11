import React from 'react';
import { MarkButton } from './mark-button';
import { BlockButton } from './block-button';
import { useSlateStatic } from 'slate-react';
import { insertLink } from '../actions/link';

export function Toolbar () {
  const editor = useSlateStatic();

  const handleInsertLink = () => {
    const url = prompt('Enter a URL');
    insertLink(editor, url);
  };
  
  return (
    <div className="toolbar">
      <MarkButton format="bold" />
      <MarkButton format="italic" />
      <MarkButton format="underline" />
      <BlockButton format="heading-one" text="H1" />
      <BlockButton format="heading-two" text="H2" />
      <BlockButton format="heading-three" text="H3" />
      <BlockButton format="heading-four" text="H4" />
      <BlockButton format="heading-five" text="H5" />
      <BlockButton format="numbered-list" icon="list-ol" />
      <BlockButton format="bulleted-list" icon="list-ul" />
      <button onClick={handleInsertLink}>
        Link
      </button>
    </div>
  );
};