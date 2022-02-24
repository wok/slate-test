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
