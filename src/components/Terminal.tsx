"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  personalInfo, 
  experiences, 
  projects, 
  skillCategories, 
  education 
} from "@/data/content";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "success" | "ascii" | "system";
  content: string | React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  "whoami",
  "ls experience/",
  "cat projects.md",
  "./skills --verbose",
  "ping alfonso",
  "help",
  "clear",
  "exit",
  "coffee",
  "matrix",
  "hack nasa",
  "ascii",
  "sudo hire alfonso",
  "rm -rf /",
];

const ASCII_ART = `
    ██████╗ ██╗  ██╗███████╗ ██████╗ ███╗   ██╗███████╗██╗   ██╗
   ██╔═████╗╚██╗██╔╝██╔════╝██╔═══██╗████╗  ██║╚══███╔╝╚██╗ ██╔╝
   ██║██╔██║ ╚███╔╝ █████╗  ██║   ██║██╔██╗ ██║  ███╔╝  ╚████╔╝ 
   ████╔╝██║ ██╔██╗ ██╔══╝  ██║   ██║██║╚██╗██║ ███╔╝    ╚██╔╝  
   ╚██████╔╝██╔╝ ██╗██║     ╚██████╔╝██║ ╚████║███████╗   ██║   
    ╚═════╝ ╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝   ╚═╝   
`;

const COFFEE_ASCII = `
        ( (
         ) )
      ........
      |      |]
      \\      /
       '----'
    BREWING...
`;

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 0,
      type: "system",
      content: "GHOST_SHELL v1.0.0 - Terminal Portfolio System",
    },
    {
      id: 1,
      type: "system",
      content: "Type 'help' for available commands.",
    },
    {
      id: 2,
      type: "system",
      content: "─".repeat(50),
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const lineIdRef = useRef(3);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLine = useCallback((type: TerminalLine["type"], content: string | React.ReactNode) => {
    const newLine: TerminalLine = {
      id: lineIdRef.current++,
      type,
      content,
    };
    setLines((prev) => [...prev, newLine]);
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const triggerMatrixFullscreen = () => {
    setShowMatrix(true);
    setTimeout(() => setShowMatrix(false), 5000);
  };

  const processCommand = useCallback(async (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    setIsProcessing(true);

    // Add small delay for effect
    await new Promise((resolve) => setTimeout(resolve, 100));

    switch (command) {
      case "help":
        addLine("output", (
          <div className="space-y-2">
            <p className="text-yellow-400">Available commands:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pl-4">
              <p><span className="text-cyan-400">whoami</span> - Learn about me</p>
              <p><span className="text-cyan-400">ls experience/</span> - View my career</p>
              <p><span className="text-cyan-400">cat projects.md</span> - See my projects</p>
              <p><span className="text-cyan-400">./skills --verbose</span> - Check my skills</p>
              <p><span className="text-cyan-400">ping alfonso</span> - Contact me</p>
              <p><span className="text-cyan-400">clear</span> - Clear terminal</p>
              <p><span className="text-cyan-400">help</span> - Show this message</p>
            </div>
            <p className="text-gray-500 text-sm mt-2">Hint: There might be some hidden commands... 🥚</p>
          </div>
        ));
        break;

      case "whoami":
        addLine("output", (
          <div className="space-y-4">
            <pre className="text-cyan-400 text-xs md:text-sm overflow-x-auto">{ASCII_ART}</pre>
            <div className="glass p-4 space-y-3">
              <h2 className="text-2xl font-bold text-cyan-400 neon-cyan">{personalInfo.name}</h2>
              <p className="text-magenta-400 text-pink-500">{personalInfo.title}</p>
              <p className="text-gray-300 leading-relaxed">{personalInfo.summary}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-xs">
                  {personalInfo.yearsExperience}+ years
                </span>
                <span className="px-2 py-1 bg-pink-500/20 border border-pink-500/50 rounded text-xs">
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </div>
        ));
        break;

      case "ls experience/":
      case "ls experience":
        addLine("output", (
          <div className="space-y-4">
            <p className="text-green-400">drwxr-xr-x  {experiences.length} items</p>
            <div className="space-y-3">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-4 hover:border-cyan-400/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-cyan-400 font-bold">{exp.role}</h3>
                      <p className="text-pink-500">{exp.company}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{exp.period}</span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-300 text-sm flex gap-2">
                        <span className="text-cyan-400">→</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ));
        break;

      case "cat projects.md":
      case "cat projects":
        addLine("output", (
          <div className="space-y-4">
            <p className="text-green-400"># Projects</p>
            <p className="text-gray-400">
              <a 
                href="https://github.com/0xFonzy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-pink-500 transition-colors underline"
              >
                → View GitHub Profile
              </a>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass p-4 hover:border-pink-500/50 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400">📁</span>
                    <h3 className="text-cyan-400 font-bold">{project.name}</h3>
                    <span className="text-xs text-gray-500 ml-auto">{project.visibility}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-1.5 py-0.5 bg-pink-500/10 border border-pink-500/30 rounded text-xs text-pink-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ));
        break;

      case "./skills --verbose":
      case "./skills":
      case "skills":
        addLine("output", (
          <div className="space-y-4">
            <p className="text-green-400">Executing skills analysis...</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-4"
                >
                  <h3 className="text-cyan-400 font-bold flex items-center gap-2">
                    <span>{category.icon}</span>
                    {category.name}
                  </h3>
                  <div className="mt-3 space-y-2">
                    {category.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{skill}</span>
                          </div>
                          <div className="h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${70 + Math.random() * 30}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                              className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="glass p-4 mt-4">
              <h3 className="text-yellow-400 font-bold">🎓 Education</h3>
              <p className="text-cyan-400 mt-2">{education.degree}</p>
              <p className="text-pink-500">{education.school}, {education.year}</p>
              <p className="text-gray-400 text-sm mt-2">{education.description}</p>
            </div>
          </div>
        ));
        break;

      case "ping alfonso":
      case "contact":
        addLine("output", (
          <div className="space-y-4">
            <p className="text-green-400">PING alfonso ({personalInfo.location}): 56 data bytes</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-cyan-400"
            >
              64 bytes from alfonso: icmp_seq=0 ttl=64 time=0.042 ms
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-green-400"
            >
              --- Connection established ---
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="glass p-6 space-y-4"
            >
              <h3 className="text-xl text-cyan-400 neon-cyan">Get In Touch</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded hover:bg-cyan-500/20 transition-colors"
                >
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-cyan-400">{personalInfo.email}</p>
                  </div>
                </a>
                <a
                  href={`tel:${personalInfo.phone.replace(/[^0-9]/g, "")}`}
                  className="flex items-center gap-3 p-3 bg-pink-500/10 border border-pink-500/30 rounded hover:bg-pink-500/20 transition-colors"
                >
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-pink-400">{personalInfo.phone}</p>
                  </div>
                </a>
                <a
                  href={`https://${personalInfo.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-500/10 border border-gray-500/30 rounded hover:bg-gray-500/20 transition-colors"
                >
                  <span className="text-2xl">💻</span>
                  <div>
                    <p className="text-gray-400 text-sm">GitHub</p>
                    <p className="text-gray-300">{personalInfo.github}</p>
                  </div>
                </a>
                <a
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors"
                >
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <p className="text-blue-400">{personalInfo.linkedin}</p>
                  </div>
                </a>
              </div>
              <p className="text-gray-500 text-sm text-center pt-2">
                📍 {personalInfo.location}
              </p>
            </motion.div>
          </div>
        ));
        break;

      case "clear":
        setLines([]);
        addLine("system", "Terminal cleared. Type 'help' for commands.");
        break;

      case "exit":
        addLine("output", (
          <p className="text-pink-500 italic">
            &quot;You can check out any time you like, but you can never leave&quot; 🎸
          </p>
        ));
        break;

      // Easter Eggs
      case "sudo hire alfonso":
        addLine("success", (
          <div className="space-y-2">
            <p className="text-green-400">[sudo] password for recruiter: ********</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-green-400 font-bold"
            >
              ✓ Access granted.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-cyan-400"
            >
              Sending offer letter to {personalInfo.email}...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-yellow-400 text-xl"
            >
              🎉 Congratulations! You made a great choice!
            </motion.p>
          </div>
        ));
        triggerConfetti();
        break;

      case "rm -rf /":
        addLine("error", (
          <div className="space-y-1">
            <p className="text-red-500">Deleting system files...</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-red-500"
            >
              rm: /bin: Operation not permitted
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-red-500"
            >
              rm: /etc: Permission denied
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-yellow-400"
            >
              Just kidding. Nice try though. 😏
            </motion.p>
          </div>
        ));
        break;

      case "coffee":
        addLine("ascii", (
          <div className="space-y-2">
            <pre className="text-yellow-600">{COFFEE_ASCII}</pre>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-cyan-400"
            >
              ☕ Coffee ready! Productivity increased by 200%.
            </motion.p>
          </div>
        ));
        break;

      case "matrix":
        addLine("success", "Entering the Matrix...");
        triggerMatrixFullscreen();
        break;

      case "hack nasa":
        addLine("output", (
          <div className="space-y-1">
            <p className="text-green-400">Connecting to nasa.gov...</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-green-400"
            >
              Bypassing firewall...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-green-400"
            >
              Accessing mainframe...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-yellow-400"
            >
              Decrypting files...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-red-500 font-bold"
            >
              ⚠️ ACCESS DENIED
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-red-400"
            >
              🚨 FBI has been notified. Agents are on their way.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-gray-500 text-sm"
            >
              (Just kidding, please don&apos;t actually hack NASA)
            </motion.p>
          </div>
        ));
        break;

      case "ascii":
        addLine("ascii", (
          <pre className="text-cyan-400 text-xs leading-tight">
{`
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║     █████╗ ██╗     ███████╗ ██████╗ ███╗   ██╗███████╗  ║
    ║    ██╔══██╗██║     ██╔════╝██╔═══██╗████╗  ██║██╔════╝  ║
    ║    ███████║██║     █████╗  ██║   ██║██╔██╗ ██║███████╗  ║
    ║    ██╔══██║██║     ██╔══╝  ██║   ██║██║╚██╗██║╚════██║  ║
    ║    ██║  ██║███████╗██║     ╚██████╔╝██║ ╚████║███████║  ║
    ║    ╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝  ║
    ║                                                          ║
    ║         ⚡ SENIOR SOFTWARE ENGINEER ⚡                   ║
    ║           React • TypeScript • Web3                      ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
`}
          </pre>
        ));
        break;

      default:
        if (command === "") {
          // Do nothing for empty commands
        } else {
          addLine("error", (
            <p>
              <span className="text-red-500">Command not found:</span>{" "}
              <span className="text-gray-400">{cmd}</span>
              <br />
              <span className="text-gray-500">Type &apos;help&apos; for available commands.</span>
            </p>
          ));
        }
    }

    setIsProcessing(false);
  }, [addLine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing || !currentInput.trim()) return;

    const cmd = currentInput.trim();
    addLine("input", `> ${cmd}`);
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setCurrentInput("");
    processCommand(cmd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete
      const matches = AVAILABLE_COMMANDS.filter((cmd) =>
        cmd.toLowerCase().startsWith(currentInput.toLowerCase())
      );
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      } else if (matches.length > 1) {
        addLine("system", `Suggestions: ${matches.join(", ")}`);
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      {/* Matrix Fullscreen Overlay */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <canvas
              ref={(canvas) => {
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
                const fontSize = 16;
                const columns = Math.floor(canvas.width / fontSize);
                const drops: number[] = Array(columns).fill(1);
                
                const draw = () => {
                  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
                  ctx.fillRect(0, 0, canvas.width, canvas.height);
                  ctx.fillStyle = "#00ff00";
                  ctx.font = `${fontSize}px monospace`;
                  
                  for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                      drops[i] = 0;
                    }
                    drops[i]++;
                  }
                };
                
                const interval = setInterval(draw, 33);
                setTimeout(() => clearInterval(interval), 5000);
              }}
              className="w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-green-500 text-4xl font-bold animate-pulse">
                WAKE UP, NEO...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="confetti"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: 720,
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                }}
                style={{
                  left: Math.random() * 100 + "%",
                  backgroundColor: ["#00ffff", "#ff00ff", "#ffff00", "#00ff00", "#ff0080"][
                    Math.floor(Math.random() * 5)
                  ],
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Terminal */}
      <div
        onClick={focusInput}
        className="min-h-screen w-full p-4 md:p-8 cursor-text"
      >
        <div className="max-w-5xl mx-auto">
          {/* Terminal Window */}
          <div className="glass-strong rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20">
            {/* Title Bar */}
            <div className="bg-gray-900/80 px-4 py-2 flex items-center gap-2 border-b border-cyan-500/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-sm ml-4 font-mono">
                ghost@shell:~
              </span>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="p-4 md:p-6 h-[70vh] overflow-y-auto font-mono text-sm md:text-base"
            >
              <AnimatePresence>
                {lines.map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-2 ${
                      line.type === "input"
                        ? "text-cyan-400"
                        : line.type === "error"
                        ? "text-red-400"
                        : line.type === "success"
                        ? "text-green-400"
                        : line.type === "system"
                        ? "text-gray-500"
                        : line.type === "ascii"
                        ? "text-cyan-400"
                        : "text-gray-300"
                    }`}
                  >
                    {line.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
                <span className="text-green-400">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder="Type a command..."
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  disabled={isProcessing}
                />
                <span className="cursor" />
              </form>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {["whoami", "ls experience/", "cat projects.md", "./skills --verbose", "ping alfonso"].map(
              (cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setCurrentInput(cmd);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 glass text-cyan-400 text-sm hover:bg-cyan-500/20 transition-colors rgb-split"
                >
                  {cmd}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
