import pretty from 'pretty';
import React, { useEffect, useState } from 'react'
import './App.scss';
import HtmlEditor from './html-editor-tiptap';

const initalContent = `
  <h1>Hello</h1>
  <p>This is a <b>test</b> for formatting</p>
  <ul>
    <li>First
      <ol>
        <li>Ordered item 1</li>
        <li>Ordered item 2</li>
      </ol>
    </li>

    <li>Second</li>
  </ul>
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
    const storedContent = false; // window.localStorage.getItem('editor-content');
    setContent(storedContent || initalContent);
  }

  const saveContent = () => {
    window.localStorage.setItem('editor-content', content);
  }

  return (
    <div className="content">
      <h1 className="ml-4"><a href="https://tiptap.dev" target="_blank">tiptap</a> HTML Editor proof of concept</h1>
      <div className="row m-2">
        <div className="col-6">
          <div className="form-group">
            <label>HTML editor</label>
            <HtmlEditor className="form-control" onChange={handleChange} minRows={10} value={content} />
          </div>
          <div className="my-3">
            <button type="button" className="btn btn-primary" onClick={saveContent}>Save</button>
            <button type="button" className="btn btn-link" onClick={loadContent}>Load</button>
          </div>
        </div>
        <div className="col-6">
          <h2>Result</h2>
          <div className="result" dangerouslySetInnerHTML={{ __html: content }} />
          <h2>HTML</h2>
          <code>{pretty(content)}</code>
        </div>
    </div>
  </div>
  );
}

export default App;
