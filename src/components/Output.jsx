import React from 'react';

/**
 * Output component to render previous commands and their outputs.
 * 
 * @param {Object} props
 * @param {Array} props.history - List of command execution records.
 */
const Output = ({ history }) => {
  return (
    <>
      {history.map((item, index) => {
        // Render raw ASCII banner or output directly without the prompt line
        if (item.isBanner) {
          return (
            <div key={index} className="terminal-banner">
              {item.output}
            </div>
          );
        }

        return (
          <div key={index} className="history-item">
            {item.command !== undefined && (
              <div className="history-command-line">
                <span className="shell-prompt">
                  <span className="shell-user">guest@elitedev</span>
                  <span className="shell-symbol">:</span>
                  <span className="shell-dir">~</span>
                  <span className="shell-symbol">$</span>
                </span>
                <span style={{ marginLeft: '8px', color: 'var(--text-color)' }}>
                  {item.command}
                </span>
              </div>
            )}
            <div className="history-output">
              {item.output}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Output;
