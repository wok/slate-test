import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { htmlToSlate } from '.';
import { slateToHtml } from './serializer';
import { Toolbar } from './components/toolbar';
import { MarkButton } from './components/mark-button';
import { BlockButton } from './components/block-button';
import isHotkey from 'is-hotkey';
import { toggleMark } from './marks';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline'
}

export function HtmlEditor(props) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState(props.value || []);
  const [toolbarVisible, setToolbarVisible] = useState(false);

  useEffect(() => {
    setValue(htmlToSlate(props.value));
  }, [props.value]);

  const handleKeyDown = (event) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])

  const handleChange = useCallback(newValue => {
    setValue(newValue);
  }, []);

  const handleBlur = () => {
    setToolbarVisible(false);
    props.onChange(slateToHtml(value));
  };

  const handleFocus = () => {
    setToolbarVisible(true);
  }

  // https://github.com/ianstormtaylor/slate/pull/4540
  // value prop provided to Slate is only used as initalValue
  editor.children = value;
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={handleChange}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck={false}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="editable form-control"
      />
      { toolbarVisible && 
        <Toolbar>
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
        </Toolbar>
      }
    </Slate>
  );
}

HtmlEditor.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func, // will be called with new value as argument,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  maxLength: PropTypes.number,
};

HtmlEditor.defaultProps = {
  minRows: 3,
  maxRows: 15,
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}