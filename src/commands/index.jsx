import React from 'react';
import projectsData from '../data/projects';
import skillsData from '../data/skills';

// ASCII Banner
export const ASCII_BANNER = `
 ███████╗██╗     ██╗████████╗███████╗    ██████╗ ███████╗██╗   ██╗
 ██╔════╝██║     ██║╚══██╔══╝██╔════╝    ██╔══██╗██╔════╝██║   ██║
 █████╗  ██║     ██║   ██║   █████╗      ██║  ██║█████╗  ██║   ██║
 ██╔══╝  ██║     ██║   ██║   ██╔══╝      ██║  ██║██╔══╝  ╚██╗ ██╔╝
 ███████╗███████╗██║   ██║   ███████╗    ██████╔╝███████╗ ╚████╔╝ 
 ╚══════╝╚══════╝╚═╝   ╚═╝   ╚══════╝    ╚═════╝ ╚══════╝  ╚═══╝  
                    - TERMINAL PORTFOLIO V2.0 -
             Type 'help' to see list of active commands.
`;

export const executeCommand = (command, args) => {
  const normalizedCommand = command.trim().toLowerCase();

  switch (normalizedCommand) {
    case 'help':
      return {
        type: 'component',
        output: (
          <div className="help-output">
            <p>Available commands:</p>
            <div className="help-table">
              <span className="help-cmd">about</span>
              <span className="help-desc">Developer bio and professional summary.</span>

              <span className="help-cmd">skills</span>
              <span className="help-desc">Technical skills grouped by category.</span>

              <span className="help-cmd">projects</span>
              <span className="help-desc">Portfolio project showcase with links.</span>

              <span className="help-cmd">contact</span>
              <span className="help-desc">Social links and contact information.</span>

              <span className="help-cmd">theme [name]</span>
              <span className="help-desc">Change console theme (green, amber, blue, matrix, classic).</span>

              <span className="help-cmd">whoami</span>
              <span className="help-desc">Show session and user metadata.</span>

              <span className="help-cmd">matrix</span>
              <span className="help-desc">Toggle the matrix rain background animation.</span>

              <span className="help-cmd">clear</span>
              <span className="help-desc">Clear the terminal screen.</span>

              <span className="help-cmd">exit</span>
              <span className="help-desc">Simulate terminal connection shutdown.</span>
            </div>
          </div>
        )
      };

    case 'about':
      return {
        type: 'component',
        output: (
          <div className="about-output">
            <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '8px' }}>
              ELITE DEVELOPER - Senior Full-Stack Engineer
            </p>
            <p style={{ marginBottom: '12px', lineHeight: '1.5' }}>
              I am a software engineer focused on building robust APIs, performant frontend architectures, 
              and memorable interactive interfaces. I specialize in designing full-stack applications with 
              clean modules, scalable data schemas, and modern aesthetic designs.
            </p>
            <p>
              Status: <span style={{ color: 'var(--accent-color)' }}>Open for contract work and collaboration.</span>
            </p>
          </div>
        )
      };

    case 'skills':
      return {
        type: 'component',
        output: (
          <div className="skills-output">
            <p style={{ marginBottom: '8px' }}>My Technical Skill Matrix:</p>
            <div className="skills-grid">
              {Object.entries(skillsData).map(([category, items]) => (
                <div key={category} className="skills-category">
                  <h3>{category}</h3>
                  <div className="skills-list">
                    {items.map((skill) => (
                      <div key={skill.name} className="skill-tag">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-desc">{skill.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      };

    case 'projects':
      return {
        type: 'component',
        output: (
          <div className="projects-output">
            <p style={{ marginBottom: '10px' }}>Recent projects from my repository:</p>
            <div className="projects-container">
              {projectsData.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-name">{project.name}</div>
                  <div className="project-desc">{project.description}</div>
                  <div className="project-stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className="stack-badge">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="terminal-link">
                      [github_repo]
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="terminal-link">
                      [live_demo]
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      };

    case 'contact':
      return {
        type: 'component',
        output: (
          <div className="contact-output">
            <p style={{ color: 'var(--accent-color)', fontWeight: 'bold', marginBottom: '8px' }}>
              CONNECT WITH ME
            </p>
            <div className="help-table" style={{ marginTop: '0' }}>
              <span className="help-cmd">Email:</span>
              <span><a href="mailto:contact@elitedev.com" className="terminal-link">contact@elitedev.com</a></span>

              <span className="help-cmd">GitHub:</span>
              <span><a href="https://github.com/elite" target="_blank" rel="noreferrer" className="terminal-link">github.com/elite</a></span>

              <span className="help-cmd">LinkedIn:</span>
              <span><a href="https://linkedin.com/in/elitedev" target="_blank" rel="noreferrer" className="terminal-link">linkedin.com/in/elitedev</a></span>

              <span className="help-cmd">Twitter:</span>
              <span><a href="https://twitter.com/elitedev" target="_blank" rel="noreferrer" className="terminal-link">twitter.com/elitedev</a></span>
            </div>
            <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--text-dim)' }}>
              Shoot me an email or click any link above to establish contact.
            </p>
          </div>
        )
      };

    case 'whoami':
      return {
        type: 'component',
        output: (
          <div className="whoami-output">
            <p>Session Metadata:</p>
            <div className="help-table" style={{ marginTop: '8px' }}>
              <span className="help-cmd">User:</span>
              <span>guest_explorer</span>
              
              <span className="help-cmd">Host:</span>
              <span>elite-developer-terminal</span>
              
              <span className="help-cmd">Permissions:</span>
              <span>Read-Only</span>
              
              <span className="help-cmd">System Time:</span>
              <span>{new Date().toLocaleString()}</span>

              <span className="help-cmd">Location:</span>
              <span>Cyberspace Node</span>
            </div>
            <p style={{ marginTop: '10px', fontStyle: 'italic', color: 'var(--text-dim)' }}>
              "A curious developer traversing the infinite web."
            </p>
          </div>
        )
      };

    case 'theme':
      const targetTheme = args[0] ? args[0].toLowerCase() : '';
      const allowedThemes = ['green', 'amber', 'blue', 'matrix', 'classic'];
      
      if (!targetTheme) {
        return {
          type: 'text',
          output: `Usage: theme [name]\nAvailable themes: ${allowedThemes.join(', ')}`
        };
      }

      if (!allowedThemes.includes(targetTheme)) {
        return {
          type: 'text',
          output: `Error: Theme '${targetTheme}' not found.\nAvailable themes: ${allowedThemes.join(', ')}`
        };
      }

      return {
        type: 'action',
        action: 'theme',
        value: targetTheme,
        output: `Console theme changed to '${targetTheme}'.`
      };

    case 'clear':
      return {
        type: 'action',
        action: 'clear',
        output: null
      };

    case 'matrix':
      return {
        type: 'action',
        action: 'matrix',
        output: 'Matrix background animation toggled.'
      };

    case 'exit':
      return {
        type: 'action',
        action: 'exit',
        output: 'Closing connection...'
      };

    default:
      return {
        type: 'text',
        output: `command not found: '${command}'. Type 'help' for available commands.`
      };
  }
};
