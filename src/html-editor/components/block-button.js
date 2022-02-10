import React from 'react';
import { useSlate } from 'slate-react';
import { isBlockActive, toggleBlock } from '../blocks';
import { Button } from './button';

export const BlockButton = ({ format, ...props }) => {
  const editor = useSlate();
  return (
    <Button
      {...props}
      format={format}
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    />
  )
}