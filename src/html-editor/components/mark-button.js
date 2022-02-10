import React from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive, toggleMark } from '../marks';
import { Button } from './button';

export const MarkButton = ({ format, ...props }) => {
  const editor = useSlate();
  return (
    <Button
      {...props}
      format={format}
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    />
  )
}