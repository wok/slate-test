import React, { useEffect, useState } from 'react';
import JoditEditor from 'jodit-react';

export function HtmlEditor(props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleBlur = (value) => {
    props.onChange(value);
  }

  return (
    <JoditEditor
      value={value}
      onBlur={handleBlur}
    />
  )
}

// Otherwise works ok, but no support for nested lists: https://github.com/quilljs/quill/issues/979
// lists are indented using CSS which is a no-go