import React, { useEffect, useState } from 'react'
import './App.css';
import { HtmlEditor, htmlToSlate } from './html-editor';

const initalContent = '<h1>Hello</h1><p>This is a <b>test</b> for formatting</p><ul><li>First</li><li>Second</li></ul>';

function App() {
  const [content, setContent] = useState();

  useEffect(() => {
    loadContent();
  }, []);

  const handleTextChange = (event) => {
    setContent(event.target.value);
  };

  const handleSlateChange = (html) => {
    console.log(html);
    setContent(html);
  };


  const loadContent = () => {
    const storedContent = window.localStorage.getItem('editor-content') || initalContent;
    setContent(initalContent);
  }

  const saveContent = () => {
    window.localStorage.setItem('editor-content', content);
  }

  return (
    <div className="content">
      <h1 class="ml-4">Slate HTML Editor proof of concept</h1>
      <div className="row m-2">
        <div className="col-4">
          <h2>Editor</h2>
          <div className="form-group">
            <label>Slate HTML editor</label>
            <HtmlEditor className="form-control" onChange={handleSlateChange} minRows={10} value={content} />
          </div>
          <hr />
          <div className="form-group mt-5">
            <label>Plain HTML editor</label>
            <textarea className="form-control" onChange={handleTextChange} rows={10} value={content} />
          </div>
          <div className="my-3">
            <button type="button" className="btn btn-primary" onClick={saveContent}>Save</button>
            <button type="button" className="btn btn-link" onClick={loadContent}>Load</button>
          </div>
        </div>
        <div className="col-4">
          <h2>JSON</h2>
          <code>
            {JSON.stringify(htmlToSlate(content), null, '  ')}
          </code>
          <hr/>
          <h2>HTML</h2>
          <code>
            {content}
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
