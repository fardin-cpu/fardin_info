import { SkillItem } from '../types';

export const SKILL_ITEMS: SkillItem[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    categoryLabel: 'Specialized Engineering',
    isGeneralLiteracy: false,
    accentColor: 'cyan',
    iconName: 'fa-solid fa-code',
    shortSummary: 'Crafting responsive, high-performance web applications, clean component architectures, and dynamic user interfaces.',
    detailedOverview: 'Developing modern, accessible single-page applications and responsive web systems with clean component hierarchies, robust type-safety, and reactive state management.',
    tools: [
      { name: 'React', iconType: 'fa', iconValue: 'fa-brands fa-react', role: 'UI Framework' },
      { name: 'TypeScript', iconType: 'fa', iconValue: 'fa-solid fa-file-code', role: 'Typed Logic' },
      { name: 'Tailwind CSS', iconType: 'fa', iconValue: 'fa-solid fa-wind', role: 'Styling System' },
      { name: 'Vite', iconType: 'fa', iconValue: 'fa-solid fa-bolt-lightning', role: 'Build Engine' },
      { name: 'Node.js', iconType: 'fa', iconValue: 'fa-brands fa-node-js', role: 'Runtime' },
      { name: 'Git & GitHub', iconType: 'fa', iconValue: 'fa-brands fa-git-alt', role: 'Version Control' }
    ],
    aiWorkflow: {
      badge: 'AI-Co-pilot Augmented',
      description: 'AI models act as active pair programmers for rapid prototyping, type generation, edge-case unit testing, and algorithmic optimization.',
      capabilities: [
        'Iterative code generation & refactoring',
        'TypeScript interface synthesis & lint fixing',
        'Responsive layout debugging & micro-interactions'
      ]
    },
    workProjects: [
      {
        id: 'web-fardin-tech',
        title: 'Fardin.Tech Cyber Portfolio & Skills Hub',
        subtitle: 'Production Interactive Portfolio & Matrix Engine',
        description: 'Designed and deployed an interactive futuristic portfolio integrating glassmorphism, responsive navigation, custom typography, and dynamic modal workflows.',
        deliverables: [
          'Modular React 19 architecture with zero layout shift',
          'Cyber-neon visual language with custom CSS token system',
          'Interactive skills inspector modal with deep state tracking'
        ],
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion'],
        liveStatus: 'Active Deployment'
      },
      {
        id: 'web-system-dashboard',
        title: 'System Telemetry & Resource Monitor',
        subtitle: 'Lightweight Client-Side Metric Visualizer',
        description: 'Built a real-time reactive dashboard simulating client system telemetry, hardware metrics, and device diagnostic feeds with responsive charts.',
        deliverables: [
          'Dynamic metric gauges and rolling telemetry graph',
          'Custom dark theme with high-contrast accessibility',
          'Stateful alert system for simulated threshold breaches'
        ],
        techStack: ['React', 'HTML5 Canvas', 'Tailwind CSS', 'Lucide Icons'],
        liveStatus: 'Prototype Ready'
      }
    ]
  },
  {
    id: 'digital-documentation',
    name: 'Digital Documentation & PDF Creation',
    categoryLabel: 'Technical Communication',
    isGeneralLiteracy: false,
    accentColor: 'purple',
    iconName: 'fa-solid fa-file-pdf',
    shortSummary: 'Authoring publication-grade technical documents, formatted research papers, structured engineering guides, and clean vector PDFs.',
    detailedOverview: 'Producing crisp, typography-driven technical documentation, structured whitepapers, and automated PDF exports that communicate complex technical concepts with visual clarity.',
    tools: [
      { name: 'LaTeX', iconType: 'fa', iconValue: 'fa-solid fa-square-root-variable', role: 'Typesetting' },
      { name: 'Typst', iconType: 'fa', iconValue: 'fa-solid fa-font', role: 'Modern Markup' },
      { name: 'Markdown', iconType: 'fa', iconValue: 'fa-brands fa-markdown', role: 'Content Architecture' },
      { name: 'Pandoc', iconType: 'fa', iconValue: 'fa-solid fa-arrows-rotate', role: 'Format Compiler' },
      { name: 'Adobe Acrobat', iconType: 'fa', iconValue: 'fa-solid fa-file-lines', role: 'PDF Vector Output' }
    ],
    aiWorkflow: {
      badge: 'AI Synthesis & Formatting',
      description: 'Leveraging LLMs for structural outlining, automated bibliography formatting, multi-page indexing, and technical grammar precision.',
      capabilities: [
        'Automated LaTeX table & formula conversion',
        'Technical outline expansion & cross-referencing',
        'Consistency linting across multi-chapter documentation'
      ]
    },
    workProjects: [
      {
        id: 'doc-engineering-handbook',
        title: 'Hardware & Microcontroller Engineering Notes',
        subtitle: 'Comprehensive Reference Guide & Pinout Compendium',
        description: 'Authored an extensive, beautifully formatted technical reference compendium covering ESP32 architecture, GPIO mappings, and electronics fundamentals.',
        deliverables: [
          'High-density vector diagrams and schematic legends',
          'LaTeX-typeset mathematical equations and circuit laws',
          'Print-ready vector PDF with interactive hyperlinks and TOC'
        ],
        techStack: ['LaTeX', 'Typst', 'Vector SVG', 'Adobe Acrobat'],
        liveStatus: 'Published Artifact'
      },
      {
        id: 'doc-structured-cheat-sheet',
        title: 'Modern Web & Terminal Quick Reference Cards',
        subtitle: 'Minimalist Two-Column Visual Cheatsheets',
        description: 'Designed concise, laminated-style reference cards for essential bash commands, Git branching paradigms, and electronics color codes.',
        deliverables: [
          'Information-dense micro-layouts optimized for rapid lookup',
          'Standardized color-coded syntax callouts and error tables',
          'Modular Markdown-to-PDF automated build pipeline'
        ],
        techStack: ['Markdown', 'Pandoc', 'Typst Engine'],
        liveStatus: 'Version 2.4 Available'
      }
    ]
  },
  {
    id: 'pcb-electronics',
    name: 'PCB Design & Electronics',
    categoryLabel: 'Hardware Engineering',
    isGeneralLiteracy: false,
    accentColor: 'blue',
    iconName: 'fa-solid fa-microchip',
    shortSummary: 'Schematic capture, PCB layout routing, embedded circuits with microcontrollers (ESP32/Arduino), and hardware prototyping.',
    detailedOverview: 'Designing custom printed circuit boards from circuit schematic capture to 2-layer routing, component selection, sensor bus integration (I2C/SPI), and board assembly.',
    tools: [
      { name: 'KiCad', iconType: 'fa', iconValue: 'fa-solid fa-layer-group', role: 'EDA & PCB Layout' },
      { name: 'EasyEDA', iconType: 'fa', iconValue: 'fa-solid fa-diagram-project', role: 'Schematic Capture' },
      { name: 'ESP32 / ESP-IDF', iconType: 'fa', iconValue: 'fa-solid fa-wifi', role: 'Microcontroller Core' },
      { name: 'Arduino IDE', iconType: 'fa', iconValue: 'fa-solid fa-microchip', role: 'Firmware Dev' },
      { name: 'SPICE Sim', iconType: 'fa', iconValue: 'fa-solid fa-wave-square', role: 'Circuit Simulation' }
    ],
    aiWorkflow: {
      badge: 'AI Circuit Diagnostics',
      description: 'Utilizing AI assistance to verify pinout constraints, evaluate trace impedances, review component errata, and diagnose firmware sensor bugs.',
      capabilities: [
        'Pin multiplexing checks and schematic auditing',
        'Component parameter comparisons & alternative part search',
        'Firmware driver scaffolding & logic debugging'
      ]
    },
    workProjects: [
      {
        id: 'pcb-esp32-node',
        title: 'ESP32 Compact Environmental Telemetry Node',
        subtitle: 'Custom 2-Layer IoT Development Board',
        description: 'Designed a custom PCB carrier incorporating an ESP32-WROOM module, onboard 3.3V LDO regulator, BME280 sensor breakout, and battery charge management.',
        deliverables: [
          'Full schematic capture and DRC-validated 2-layer routing',
          'Optimized ground planes and low-noise analog signal paths',
          'Tested firmware for WiFi UDP telemetry and deep-sleep cycling'
        ],
        techStack: ['KiCad EDA', 'ESP32', 'C++', 'I2C Bus', 'Fusion 360'],
        liveStatus: 'Gerber Files & Prototype'
      },
      {
        id: 'pcb-sensor-carrier',
        title: 'Modular Sensor & Display Expansion Shield',
        subtitle: 'Plug-and-Play Prototyping Platform',
        description: 'Created a modular prototyping board with dedicated headers for OLED I2C displays, rotary encoders, and digital sensors to eliminate breadboard wire tangles.',
        deliverables: [
          'Reverse-polarity protected power input with resettable PPTC fuse',
          'Silk-screened pin legends for error-free wiring in the lab',
          'Accompanying 3D CAD step models for custom 3D printed enclosures'
        ],
        techStack: ['EasyEDA', 'SPICE', 'Hardware Bench Testing'],
        liveStatus: 'Bench Validated'
      }
    ]
  },
  {
    id: 'scientific-visualization',
    name: 'Scientific & Technical Visualization',
    categoryLabel: 'Analytical Modeling',
    isGeneralLiteracy: false,
    accentColor: 'emerald',
    iconName: 'fa-solid fa-chart-line',
    shortSummary: 'Transforming mathematical equations, physical simulations, and experimental data into interactive graphics and vector diagrams.',
    detailedOverview: 'Bridging the gap between raw data and human intuition through graphical plotting, vector geometry models, interactive physics visualizers, and system flow representations.',
    tools: [
      { name: 'Python (Matplotlib/NumPy)', iconType: 'fa', iconValue: 'fa-brands fa-python', role: 'Data & Plotting' },
      { name: 'D3.js / Charting', iconType: 'fa', iconValue: 'fa-solid fa-chart-simple', role: 'Interactive Visuals' },
      { name: 'Desmos / GeoGebra', iconType: 'fa', iconValue: 'fa-solid fa-shapes', role: 'Math Modeling' },
      { name: 'CAD 3D Visuals', iconType: 'fa', iconValue: 'fa-solid fa-cube', role: 'Spatial Renders' },
      { name: 'Graphviz', iconType: 'fa', iconValue: 'fa-solid fa-network-wired', role: 'System Graphs' }
    ],
    aiWorkflow: {
      badge: 'AI Mathematical Modeling',
      description: 'Employing AI to derive coordinate transformation scripts, generate parametric equations, and construct mathematical plotting pipelines.',
      capabilities: [
        'Rapid translation of mathematical formulas to plotting scripts',
        'Custom colormap generation and visual normalization',
        'Algorithmic simulation logic generation'
      ]
    },
    workProjects: [
      {
        id: 'vis-vector-fields',
        title: 'Interactive 2D/3D Vector Field Simulation',
        subtitle: 'Physical Force & Potential Gradient Visualizer',
        description: 'Built a mathematical simulation engine rendering gravitational and electromagnetic vector fields with particle path tracing and equipotential contours.',
        deliverables: [
          'Interactive canvas with dynamic source charge manipulation',
          'Smooth Runge-Kutta numerical integration for streamline curves',
          'Normalized color gradients mapping field strength and divergence'
        ],
        techStack: ['Python', 'HTML5 Canvas', 'NumPy', 'D3.js'],
        liveStatus: 'Interactive Experiment'
      },
      {
        id: 'vis-telemetry-telecom',
        title: 'Sensor Telemetry Fourier & Spectral Visualizer',
        subtitle: 'Real-time Signal Decomposition',
        description: 'Developed an interactive frequency domain visualizer that applies Fast Fourier Transforms (FFT) to noisy accelerometer and audio sensor streams.',
        deliverables: [
          'Waterfall spectrogram rendering with configurable frequency bands',
          'Harmonic peak detection and signal-to-noise ratio calculation',
          'Exportable vector charts for technical publications'
        ],
        techStack: ['Python', 'Matplotlib', 'SciPy', 'Canvas API'],
        liveStatus: 'Demonstrated Pipeline'
      }
    ]
  },
  // GENERAL LITERACY (Kept separate as foundational computer capabilities)
  {
    id: 'computer-software-literacy',
    name: 'Computer & Software Literacy',
    categoryLabel: 'Foundational Literacy',
    isGeneralLiteracy: true,
    accentColor: 'cyan',
    iconName: 'fa-solid fa-terminal',
    shortSummary: 'Foundational mastery of operating systems (Linux/Windows), terminal workflows, file system management, and workflow automation.',
    detailedOverview: 'Deep comfort across Unix/Linux shell environments, command-line utilities, file system hierarchies, permission management, environment configuration, and daily computational productivity.',
    tools: [
      { name: 'Linux Bash / Zsh', iconType: 'fa', iconValue: 'fa-solid fa-terminal', role: 'CLI & Scripting' },
      { name: 'Windows PowerTools', iconType: 'fa', iconValue: 'fa-brands fa-windows', role: 'System Utilities' },
      { name: 'Git CLI', iconType: 'fa', iconValue: 'fa-solid fa-code-branch', role: 'VCS Operations' },
      { name: 'Browser DevTools', iconType: 'fa', iconValue: 'fa-solid fa-magnifying-glass-chart', role: 'Inspection' },
      { name: 'Security & Backup', iconType: 'fa', iconValue: 'fa-solid fa-shield-halved', role: 'Data Hygiene' }
    ],
    aiWorkflow: {
      badge: 'AI Terminal & Workflow Assistant',
      description: 'Using AI to quickly compose complex shell commands, verify regex patterns, and automate multi-step system maintenance scripts.',
      capabilities: [
        'Shell pipeline syntax & sed/awk script synthesis',
        'Cross-platform path and environment variable troubleshooting',
        'Rapid troubleshooting of CLI error messages'
      ]
    },
    workProjects: [
      {
        id: 'lit-dev-environment',
        title: 'Automated Development Environment Rig',
        subtitle: 'Scripted Linux & Windows Workspace Setup',
        description: 'Created shell configuration scripts (dotfiles) that bootstrap a complete programming environment with tailored Zsh aliases, Git hooks, and package managers.',
        deliverables: [
          'Portable setup scripts running on Ubuntu, Debian, and WSL2',
          'Automated SSH key generation and GitHub credential management',
          'Built-in system performance aliases and log clean-up routines'
        ],
        techStack: ['Bash', 'Zsh', 'Git CLI', 'WSL2', 'Vim'],
        liveStatus: 'Daily Driver Setup'
      },
      {
        id: 'lit-backup-pipeline',
        title: 'Local & Cloud Redundant Backup Pipeline',
        subtitle: 'Zero-Friction Project Synchronization',
        description: 'Configured automated cron jobs and encrypted file sync scripts ensuring project code and electronics designs are backed up across multiple storage nodes.',
        deliverables: [
          'Rsync and Tar automated incremental backup scripts',
          'System health checks and automatic disk space alerts',
          'Integrity verification using SHA256 checksums'
        ],
        techStack: ['Cron', 'Bash', 'Rsync', 'OpenSSH'],
        liveStatus: 'Active Background System'
      }
    ]
  },
  {
    id: 'computer-hardware-literacy',
    name: 'Computer Hardware Literacy',
    categoryLabel: 'Foundational Literacy',
    isGeneralLiteracy: true,
    accentColor: 'purple',
    iconName: 'fa-solid fa-hard-drive',
    shortSummary: 'Foundational understanding of computer architecture, component assembly, diagnostics, thermal dynamics, and bus interfaces.',
    detailedOverview: 'Hands-on competence in PC hardware architecture, component balance (CPU, GPU, RAM, NVMe), BIOS/UEFI firmware configuration, hardware diagnostics, and thermal optimization.',
    tools: [
      { name: 'Diagnostic Suites', iconType: 'fa', iconValue: 'fa-solid fa-stethoscope', role: 'HWiNFO / MemTest' },
      { name: 'BIOS / UEFI', iconType: 'fa', iconValue: 'fa-solid fa-gears', role: 'Firmware & Clocks' },
      { name: 'Digital Multimeter', iconType: 'fa', iconValue: 'fa-solid fa-gauge-high', role: 'Voltage / Rail Testing' },
      { name: 'Thermal Management', iconType: 'fa', iconValue: 'fa-solid fa-temperature-half', role: 'Cooling Dynamics' },
      { name: 'Bench Assembly', iconType: 'fa', iconValue: 'fa-solid fa-screwdriver-wrench', role: 'Component Building' }
    ],
    aiWorkflow: {
      badge: 'AI Hardware Diagnostics',
      description: 'Employing AI to cross-reference motherboard pinout specifications, analyze diagnostic error codes, and verify component power budgets.',
      capabilities: [
        'Motherboard beep & POST code lookup and fault isolation',
        'PCIe lane bifurcation & power supply wattage budgeting',
        'Thermal dissipation modeling for compact enclosures'
      ]
    },
    workProjects: [
      {
        id: 'hw-custom-rig',
        title: 'Optimized Workstation Assembly & Benchmarking',
        subtitle: 'High-Efficiency Computing Rig',
        description: 'Planned, sourced, and assembled a custom desktop workstation designed for CAD simulation, software development, and rapid compile workloads.',
        deliverables: [
          'Balanced component selection preventing thermal or PCIe bottlenecks',
          'Custom fan curves and undervolt profiles achieving low noise under load',
          'Complete stress testing reports using Cinebench and Prime95'
        ],
        techStack: ['UEFI BIOS', 'HWiNFO64', 'Stress Testing Tools', 'Thermal Analysis'],
        liveStatus: 'Operational Workstation'
      },
      {
        id: 'hw-troubleshooting-casebook',
        title: 'Hardware Fault Diagnosis & Component Recovery',
        subtitle: 'System Recovery & Diagnostic Case Studies',
        description: 'Diagnosed and resolved hardware issues including memory instability, faulty power delivery rails, and overheating laptops through structured isolation testing.',
        deliverables: [
          'Step-by-step diagnostic flowcharts for non-POSTing systems',
          'Multimeter measurement logs of 12V, 5V, and 3.3V ATX rail stability',
          'Component replacement documentation and thermal repasting benchmarks'
        ],
        techStack: ['Digital Multimeter', 'MemTest86', 'Component Isolation'],
        liveStatus: 'Documented Case Studies'
      }
    ]
  }
];
