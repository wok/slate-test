import React from 'react';
import PropTypes from 'prop-types';

function HtmlEditor (props) {
  
};

export default HtmlEditor;


HtmlEditor.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func, // will be called with new value as argument,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  maxLength: PropTypes.number,
};

HtmlEditor.defaultProps = {
  minRows: 3,
  maxRows: 15,
};