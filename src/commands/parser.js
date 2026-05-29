/**
 * Simple command parser for the terminal portfolio.
 * Splits input by spaces and extracts the command and its arguments.
 * 
 * @param {string} rawInput - The raw string input from the terminal.
 * @returns {Object} { command: string, args: Array<string> }
 */
export const parseCommand = (rawInput) => {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { command: "", args: [] };
  }

  // Split by whitespace
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  return { command, args };
};
