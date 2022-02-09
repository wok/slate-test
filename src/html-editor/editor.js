import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { createEditor, Editor, Text, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { htmlToSlate } from '.';

const initalValue = JSON.parse(localStorage.getItem('content')) || [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'And a second paragraph.' }],
  },
];

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}


export function HtmlEditor(props) {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue(htmlToSlate(props.html));
  }, [props.html]);

  const handleKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case 'c': {
        event.preventDefault()
        CustomEditor.toggleCodeBlock(editor);
        break;
      }

      case 'b': {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }

      default:
        break;
    }
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, []);

  const handleChange = useCallback(newValue => {
    setValue(newValue);
    const isAstChange = editor.operations.some(
      op => 'set_selection' !== op.type
    )
    if (isAstChange) {
      // Save the value to Local Storage.
      const content = JSON.stringify(newValue)
      localStorage.setItem('content', content)
    }
  }, [editor]);


  console.log(value);
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={handleChange}
    >
      <div>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={event => {
            event.preventDefault()
            CustomEditor.toggleCodeBlock(editor)
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck={false}
        onKeyDown={handleKeyDown}
        className="editable"
      />
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


const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

// Define a React component to render leaves with bold text.
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}
