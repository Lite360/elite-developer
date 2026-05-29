import React from 'react';

/**
 * Input component providing a shell prompt, hidden native input, and custom blinking caret.
 * Uses forwardRef so the parent terminal window can programmaticly focus the input.
 */
const Input = React.forwardRef(({ value, onChange, onKeyDown }, ref) => {
  return (
    <div className="terminal-input-container">
      <span className="shell-prompt">
        <span className="shell-user">guest@elitedev</span>
        <span className="shell-symbol">:</span>
        <span className="shell-dir">~</span>
        <span className="shell-symbol">$</span>
      </span>
      <div className="visible-input-wrapper" style={{ marginLeft: '8px' }}>
        <span className="visible-text">{value}</span>
        <span className="custom-cursor blinking"></span>
      </div>
      <input
        ref={ref}
        type="text"
        className="hidden-input"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-label="Terminal command input"
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
