import React from 'react';

const TextComponent = ({ text, color }) => (
  <div className="cell" style={{ color }}>
    {text || ' '}
  </div>
);

export default TextComponent;
