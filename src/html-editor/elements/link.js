import { useSelected, useFocused, useSlateStatic } from "slate-react";
import { removeLink } from '../actions/link';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUnlink, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

export function Link ({ attributes, element, children }) {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  if (!element) {
    return null;
  }

  return (
    <span className="element-link">
      <a {...attributes} href={element.href}>
        {children}
      </a>
      {selected && focused && (
        <div className="popup" contentEditable={false}>
          <a href={element.href} rel="noreferrer" target="_blank">
            {/* <FontAwesomeIcon icon={faExternalLinkAlt} /> */}
            {element.href}
          </a>
          <button onClick={() => {
            console.log('click');
            }}>
            Remove
          </button>
        </div>
      )}
    </span>
  );
};

