import React from 'react';
import { useSlateStatic } from 'slate-react';
import { isBlockActive, toggleBlock } from '../blocks';
import { Button } from './button';

export const BlockButton = ({ format, ...props }) => {
  const editor = useSlateStatic();
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