import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export function HtmlEditor(props) {
  const [value, setValue] = useState('');

  const handleChange = (value) => {
    setValue(value);
  }

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleBlur = () => {
    props.onChange(value);
  }

  return (
    <ReactQuill
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      theme="snow"
    />
  )
}

// Otherwise works ok, but no support for nested lists: https://github.com/quilljs/quill/issues/979
// lists are indented using CSS which is a no-go