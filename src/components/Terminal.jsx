import React, { useState, useEffect, useRef } from 'react';
import Input from './Input';
import Output from './Output';
import { executeCommand, ASCII_BANNER } from '../commands/index.jsx';
import { parseCommand } from '../commands/parser';

const BOOT_LINES = [
  "INITIALIZING ELITE DEVELOPER TERMINAL SECURE ENVIRONMENT...",
  "LOADING MODULE: terminal-system-v2.0............... [ OK ]",
  "LOADING MODULE: commands-registry-v2.0............. [ OK ]",
  "ESTABLISHING SECURE SSL CORESYNCRONIZATION.......... [ OK ]",
  "ESTABLISHING HOST CONNECTION....................... [ OK ]",
  "RETRIEVING PORTFOLIO BIOMETRICS..................... [ OK ]",
  "VIRTUAL DEPLOYMENT COMPLETE. LOADING INTERACTIVE CONSOLE...",
];

const Terminal = () => {
  const [history, setHistory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const [theme, setTheme] = useState("green");
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  
  // Boot screen states
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [bootIndex, setBootIndex] = useState(0);

  // Shutdown state
  const [exitStatus, setExitStatus] = useState(false);

  const inputRef = useRef(null);
  const terminalBodyRef = useRef(null);
  const canvasRef = useRef(null);

  // Boot animation typing effect
  useEffect(() => {
    if (bootIndex < BOOT_LINES.length) {
      const timer = setTimeout(() => {
        setBootLines((prev) => [...prev, BOOT_LINES[bootIndex]]);
        setBootIndex((prev) => prev + 1);
      }, 300); // delay between boot lines
      return () => clearTimeout(timer);
    } else {
      // Finished booting
      const timer = setTimeout(() => {
        completeBoot();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [bootIndex]);

  const completeBoot = () => {
    setHistory([
      { isBanner: true, output: ASCII_BANNER },
      { command: undefined, output: "System ready. Welcome to my command-line portfolio. Type 'help' to begin." }
    ]);
    setBooted(true);
    // Autofocus input
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  };

  // Matrix Rain Animation
  useEffect(() => {
    if (!matrixEnabled || !booted || exitStatus) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Fit canvas to parent window size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+=?<>_";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const rainDrops = Array(columns).fill(1);

    // Draw Loop
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Match theme color
      let glyphColor = '#00ff00';
      if (theme === 'amber') glyphColor = '#ffb000';
      if (theme === 'blue') glyphColor = '#00e5ff';
      if (theme === 'classic') glyphColor = '#a9b1d6';
      
      ctx.fillStyle = glyphColor;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [matrixEnabled, booted, theme, exitStatus]);

  // Keep input focused
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Auto scroll terminal log to bottom on output append
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, bootLines]);

  // Command input handlers
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const inputStr = inputValue.trim();
      setInputValue("");
      setHistoryIndex(null);

      if (!inputStr) {
        // Just print prompt
        setHistory((prev) => [...prev, { command: "", output: null }]);
        return;
      }

      // Add to local shell history
      setCommandHistory((prev) => [...prev, inputStr]);

      // Parse and execute
      const { command, args } = parseCommand(inputStr);
      const response = executeCommand(command, args);

      if (response.type === 'action') {
        if (response.action === 'clear') {
          setHistory([]);
        } else if (response.action === 'theme') {
          setTheme(response.value);
          setHistory((prev) => [
            ...prev,
            { command: inputStr, output: response.output }
          ]);
        } else if (response.action === 'matrix') {
          setMatrixEnabled((prev) => !prev);
          setHistory((prev) => [
            ...prev,
            { command: inputStr, output: response.output }
          ]);
        } else if (response.action === 'exit') {
          setHistory((prev) => [
            ...prev,
            { command: inputStr, output: response.output }
          ]);
          setTimeout(() => {
            setExitStatus(true);
          }, 800);
        }
      } else {
        // Standard text/component response
        setHistory((prev) => [
          ...prev,
          { command: inputStr, output: response.output }
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length === 0 || historyIndex === null) return;

      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInputValue("");
      } else {
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    }
  };

  const handleReconnect = () => {
    setExitStatus(false);
    setHistory([
      { isBanner: true, output: ASCII_BANNER },
      { command: undefined, output: "System reconnected. Welcome back. Type 'help' for instructions." }
    ]);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 50);
  };

  return (
    <div className={`terminal-app-container theme-${theme}`}>
      <div className="terminal-window" onClick={handleTerminalClick}>
        {matrixEnabled && <canvas ref={canvasRef} className="matrix-canvas" />}
        
        {/* Title Bar */}
        <header className="terminal-header">
          <div className="terminal-window-buttons">
            <span className="terminal-dot red" onClick={() => setExitStatus(true)}></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
          </div>
          <div className="terminal-title">
            <span>elite-developer@terminal:~</span>
            <span className="terminal-theme-badge">{theme.toUpperCase()}</span>
          </div>
          <div style={{ width: '52px' }}></div> {/* Spacer to center the title */}
        </header>

        {/* Console Screen Body */}
        <main ref={terminalBodyRef} className="terminal-body">
          {!booted ? (
            <div className="boot-screen">
              {bootLines.map((line, idx) => (
                <div key={idx} className="boot-line">{line}</div>
              ))}
              <button className="boot-skip-btn" onClick={completeBoot}>
                SKIP LOADER &gt;
              </button>
            </div>
          ) : (
            <>
              <Output history={history} />
              {!exitStatus && (
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
              )}
            </>
          )}

          {/* Fake Connection Closed / Exit Screen Overlay */}
          {exitStatus && (
            <div className="shutdown-overlay">
              <div className="shutdown-text">*** TERMINAL SHUTDOWN COMPLETE. CONNECTION CLOSED. ***</div>
              <button className="reconnect-btn" onClick={handleReconnect}>
                RE-CONNECT SESSION
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Terminal;
