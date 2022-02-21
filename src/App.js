import React, { useEffect, useState } from 'react'
import './App.css';
import { HtmlEditor, htmlToSlate } from './html-editor';

const initalContent = '<h1>Hello</h1><p>This is a <b>test</b> for formatting</p><ul><li>First</li><li>Second</li></ul>';

function App() {
  const [content, setContent] = useState();
  const [internalValue, setInternalValue] = useState();

  useEffect(() => {
    loadContent();
  }, []);

  const handleSlateChange = (html) => {
    setContent(html);
    console.log(html);
  };


  const loadContent = () => {
    const storedContent = window.localStorage.getItem('editor-content');
    setContent(storedContent || initalContent);
  }

  const saveContent = () => {
    window.localStorage.setItem('editor-content', content);
  }

  return (
    <div className="content">
      <h1 className="ml-4">Slate HTML Editor proof of concept</h1>
      <div className="row m-2">
        <div className="col-4">
          <h2>Editor</h2>
          <div className="form-group">
            <label>Slate HTML editor</label>
            <HtmlEditor className="form-control" onChange={handleSlateChange} minRows={10} value={content}
              onInternalValueChange={(internalValue) => setInternalValue(internalValue)} />
          </div>
          <div className="my-3">
            <button type="button" className="btn btn-primary" onClick={saveContent}>Save</button>
            <button type="button" className="btn btn-link" onClick={loadContent}>Load</button>
          </div>
        </div>
        <div className="col-4">
          <h2>JSON Editor value</h2>
          <code>
            {JSON.stringify(internalValue, null, '  ')}
          </code>
        </div>
        <div className="col-4">
          <h2>Result</h2>
          <div className="result" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    </div>
  </div>
  );
}

export default App;
