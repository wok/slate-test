import React, { useEffect, useState } from 'react'
import './App.css';
import { HtmlEditor, htmlToSlate } from './html-editor';

function App() {
  const [content, setContent] = useState();

  useEffect(() => {
    loadContent();
  }, []);

  const handleTextChange = (event) => {
    // console.log(event);
    setContent(event.target.value);
  };

  const handleSlateChange = (html) => {
    console.log(html);
    setContent(html);
  };


  const loadContent = () => {
    const storedContent = window.localStorage.getItem('editor-content');
    if (storedContent) {
      setContent(storedContent);
    }
  }

  const saveContent = () => {
    window.localStorage.setItem('editor-content', content);
  }

  return (
    <div className="row m-2">
      <div className="col-4">
        <h2>Editor</h2>
        <div className="form-group">
          <textarea className="form-control" onChange={handleTextChange} rows={10} value={content} />
        </div>
        <div className="my-3">
          <button type="button" className="btn btn-primary" onClick={saveContent}>Save</button>
          <button type="button" className="btn btn-link" onClick={loadContent}>Load</button>
        </div>
        <div className="form-group mt-5">
          <HtmlEditor className="form-control" onChange={handleSlateChange} minRows={10} value={content} />
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
  );
}

export default App;
