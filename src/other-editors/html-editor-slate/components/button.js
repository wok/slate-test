import classNames from 'classnames';
import React from 'react';

export function Button ({ format, active, icon, text, ...props }) {
  icon = icon || format;
  return (
    <div {...props} className={classNames('button', { active })} >
      { text ? <div>{text}</div> : 
       <div className={`fa fa-${icon}`} />
      }
    </div>
  )
}