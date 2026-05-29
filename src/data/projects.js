const projects = [
  {
    id: "devshell",
    name: "DevShell IDE",
    description: "An online interactive terminal environment for compiling and running JavaScript snippets directly in the browser using WebAssembly. Features custom sandboxing and syntax highlighting.",
    stack: ["React.js", "WebAssembly", "Xterm.js", "Tailwind CSS"],
    github: "https://github.com/elite/devshell",
    demo: "https://devshell.elitedev.com"
  },
  {
    id: "pulseapi",
    name: "PulseAPI Monitor",
    description: "A lightweight, real-time API performance monitoring and status-page service. Sends instant webhooks and email alerts on downtime, offering high-precision latency charts.",
    stack: ["Node.js", "Express", "InfluxDB", "Chart.js", "WebSockets"],
    github: "https://github.com/elite/pulse-api",
    demo: "https://pulse.elitedev.com"
  },
  {
    id: "glassblog",
    name: "GlassBlog CMS",
    description: "A sleek, responsive Next.js blog emphasizing modern design trends like glassmorphism and smooth micro-animations. Backed by a headless GraphQL CMS.",
    stack: ["Next.js", "GraphQL", "Tailwind CSS", "Framer Motion", "Hygraph"],
    github: "https://github.com/elite/glassblog",
    demo: "https://blog.elitedev.com"
  },
  {
    id: "secureauth",
    name: "SecureAuth Service",
    description: "A modular, plug-and-play authentication microservice using JWT, MFA, Redis token-revocation, and OAuth 2.0 provider integration. Focuses on security and performance.",
    stack: ["Go", "Redis", "PostgreSQL", "Docker", "MFA/TOTP"],
    github: "https://github.com/elite/secureauth",
    demo: "https://auth.elitedev.com"
  }
];

export default projects;
