import pretty from 'pretty';
import React, { useEffect, useState } from 'react'
import './App.scss';
import HtmlEditor from './html-editor-tiptap';

const initalContent = `
<p>This a POC for the <a href="https://tiptap.dev">tiptap</a> editor, which is based on <a href="https://prosemirror.net/">ProseMirror</a> framework.</p>
<p><u>The editor supports the following operations:</u></p>
<ul>
  <li>
    <p>Text formatting (using menu below or hotkeys)</p>
  </li>
  <li>
    <p>Paste formatted text</p>
  </li>
  <li>
    <p>Links (Added by using menu below or Mod+K hotkey, editing by clicking on existing link)</p>
  </li>
</ul>
<p>Contents on the right side are updated on Editor blur. Editor contents can be presisted to localStorage</p>
`.trim();

function App() {
  const [content, setContent] = useState();

  useEffect(() => {
    loadContent();
  }, []);

  const handleChange = (html) => {
    setContent(html);
  };


  const loadContent = () => {
    const storedContent = window.localStorage.getItem('editor-content');
    setContent(storedContent || initalContent);
  }

  const saveContent = () => {
    window.localStorage.setItem('editor-content', content);
  }

  const resetContent = () => {
    setContent(initalContent);
  }

  return (
    <div className="content">
      <div className="row m-2">
        <div className="col-6">
          <div className="form-group">
            <h2>HTML editor</h2>
            <HtmlEditor className="form-control" onChange={handleChange} minRows={10} value={content} />
          </div>
          <div className="my-3">
            <button type="button" className="btn btn-primary" onClick={saveContent}>Save</button>
            <button type="button" className="btn btn-link" onClick={loadContent}>Load</button>
            <button type="button" className="btn btn-link" onClick={resetContent}>Reset</button>
          </div>
        </div>
        <div className="col-6">
          <h2>Result</h2>
          <div className="result" dangerouslySetInnerHTML={{ __html: content }} />
          <h2 className="mt-5">HTML</h2>
          <code>{pretty(content)}</code>
        </div>
    </div>
  </div>
  );
}

export default App;
