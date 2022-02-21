import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { htmlToSlate } from '.';
import { slateToHtml } from './serializer';
import { Toolbar } from './components/toolbar';
import isHotkey from 'is-hotkey';
import { toggleMark } from './marks';
import { Link } from './elements/link';
import { pipe } from './utils/pipe';
import { withLinks } from './plugins/with-links';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline'
};

const createEditorWithPlugins = pipe(
  withReact,
  withLinks,
);

export function HtmlEditor(props) {
  const editor = useMemo(() => createEditorWithPlugins(createEditor()), []);
  const [value, setValue] = useState(props.value || []);
  const [selection, setSelection] = useState(editor.selection);

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

  const handleChange = newValue => {
    setValue(newValue);
    setSelection(editor.selection);
    if (props.onInternalValueChange) {
      props.onInternalValueChange(newValue);
    }
  };

  const handleBlur = () => {
    props.onChange(slateToHtml(value));
  };


  // https://github.com/ianstormtaylor/slate/pull/4540
  // value prop provided to Slate is only used as initalValue
  editor.children = value;
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={handleChange}
    >
      <Toolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck={false}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="editable form-control"
      />
      <SelectionInfo {...selection} />
    </Slate>
  );
}

const locationToString = ({path, offset}) => {
  path = path.join(',');
  return `${path} - ${offset}`;
};

const SelectionInfo = ({anchor, focus}) => {
  anchor = anchor ? locationToString(anchor) : '';
  focus = focus ? locationToString(focus): '';
  if (focus === anchor) {
    focus = '';
  } else {
    focus = ` Focus: ${focus}`;
  }
  return (
    <div>
      Selection: {anchor}{focus}
    </div>
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
    case 'link':
      return <Link attributes={attributes} element={element}>{children}</Link>
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