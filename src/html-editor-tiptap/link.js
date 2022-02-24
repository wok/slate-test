import { useEffect, useRef, useState } from 'react';

export const removeLink = (editor) => {
  editor.chain().focus().unsetLink().run()
};

const getSelectedText = (editor) => {
  const { from, to, empty } = editor.state.selection;

  if (empty) {
    return null;
  }

  return editor.state.doc.textBetween(from, to, ' ');
}

export const insertLink = (editor, {title, href}) => {
  title = title?.trim() || href;
  editor.commands.insertContent({
    type: 'text',
    text: title,
    marks: [{
      type: 'link',
      attrs: { href }
    }]
  });
}

export const getLinkDetails = (editor) => {
  const result = { href: null, title: null };

  if (editor.isActive('link')) {
    result.href = editor.getAttributes('link').href;
    editor.chain().focus().extendMarkRange('link').run();
  }
  // needs to be done here so that we can get title for current link after selection
  result.title = getSelectedText(editor);
  return result;
}

const isValidUrl = (text) => {
  let url;
  
  try {
    url = new URL(text);
  } catch (_) {
    return false;  
  }

  return url.protocol === "https:";
}

export function LinkEditor(props) {
  const [href, setHref] = useState(props.href || 'https://');
  const [title, setTitle] = useState(props.title || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({title, href});
    return false;
  }

  const focusRef = useRef();

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const urlValid = isValidUrl(href);

  return (
    <div className="link-editor">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>URL</label>
          <input type="text" ref={focusRef} value={href} onChange={e => setHref(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control"/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!urlValid}>Submit</button>
        <button type="cancel" className="btn btn-link" onClick={() => props.onCancel()}>Cancel</button>
      </form>
    </div>
  )
}