import { useEffect, useState } from 'react';
import { Editor, Transforms } from 'slate';
import { useSelected, useFocused, useSlateStatic } from "slate-react";
import { removeLink } from '../actions/link';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUnlink, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export function Link ({ attributes, element, children }) {
  const editor = useSlateStatic();
  const selected = useSelected();

  const [popupVisble, setPopupVisible] = useState(false);

  useEffect(() => {
    if (!selected) {
      console.log('hiding popup');
      setPopupVisible(false);
    }
  }, [selected]);

  const handleClick = (e) => {
    e.preventDefault();
    setPopupVisible(true);
  }

  const handleRemove = () => {
    removeLink(editor);
  }

  const handleEdit = () => {
    const href = prompt('Update URL', element.href);
    if (href) {
      const [, location] = Editor.above(editor, {
        at: path,
        match: (n) => n.type === "link",
      })
      Transforms.setNodes(editor, { href }, { at: location });
    }
  }

  const [path, setPath] = useState([]);

  useEffect(() => {
    if (selected) {
      setPath(editor.selection.anchor.path);
    }
  }, [editor.selection, selected]);

  return (
    <span className="element-link">
      <a {...attributes} href={element.href} onClick={handleClick}>
        {children}
      </a>
      {popupVisble &&
        <span className="popup" contentEditable={false}>
          <a href={element.href} rel="noreferrer" target="_blank">
            {element.href}
          </a>
          <button onClick={handleEdit} className="button">
            <span className="fa fa-edit" />
          </button>
          <button onClick={handleRemove} className="button">
            <span className="fa fa-trash"/>
          </button>
        </span>
      }
    </span>
  );
};

