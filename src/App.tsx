import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  User, 
  Cpu, 
  Target, 
  BarChart3, 
  FileText,
  Link as LinkIcon,
  List,
  Zap,
  Lightbulb,
  Award,
  Map,
  Brain,
  Code2,
  Github,
  Linkedin,
  Mail,
  X,
  Search,
  GitBranch,
  Blocks,
  Settings,
  Terminal,
  CheckCircle2,
  FileCode,
  MapPin,
  Briefcase,
  MailIcon,
  ExternalLink,
  Sparkles,
  Globe,
  Send,
  Layers,
  PenTool,
  Code,
  Palette,
  Terminal as TerminalIcon,
  Monitor,
  Moon,
  Sun,
  Sparkle,
  SquarePower,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';

// Types
type FileType = 'about_me' | 'ai_synergy' | 'checkpoint' | 'gtm' | 'qa';

interface File {
  id: FileType;
  name: string;
  icon: React.ReactNode;
  color: string;
  folder?: string;
}

const files: File[] = [
  { id: 'about_me', name: 'About me', icon: <User size={16} />, color: 'text-blue-400' },
  { id: 'ai_synergy', name: 'AI-Powered Synergy', icon: <FileText size={16} />, color: 'text-[#CCCCCC]', folder: 'My impact' },
  { id: 'checkpoint', name: 'EDAIS Design System', icon: <FileText size={16} />, color: 'text-[#CCCCCC]', folder: 'My impact' },
  { id: 'gtm', name: 'GTM Saffron Adoption', icon: <FileText size={16} />, color: 'text-[#CCCCCC]', folder: 'My impact' },
  { id: 'qa', name: 'Q&A', icon: <FileText size={16} />, color: 'text-green-400' },
];

const Background = ({ theme }: { theme: string }) => (
  <div className={`bg-mesh transition-opacity duration-1000 ${theme === 'go-crazy' ? 'opacity-0' : 'opacity-100'}`}>
    <div className="bg-blob w-[500px] h-[500px] bg-teal-500/10 top-[-10%] left-[-10%]" />
    <div className="bg-blob w-[400px] h-[400px] bg-purple-500/10 bottom-[-5%] right-[-5%] [animation-delay:2s]" />
    <div className="bg-blob w-[300px] h-[300px] bg-blue-500/10 top-[40%] right-[20%] [animation-delay:4s]" />
  </div>
);

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}=+*&^%$#@!'.split('');
    const codeSnippets = [
      'const user = { name: "Mario" };',
      'function render() { return <App />; }',
      'useEffect(() => { ... }, []);',
      'import { motion } from "framer-motion";',
      'export default function Portfolio() {',
      'const [theme, setTheme] = useState("dark");',
      'className="text-teal-400 font-bold"',
      'await ai.models.generateContent();',
      'npm install lucide-react',
      'git commit -m "Go Crazy!"',
      'while(true) { build(); }',
      'if (isCreative) { pushLimits(); }'
    ];

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const colors = ['#2dd4bf', '#a855f7', '#ec4899', '#3b82f6', '#f59e0b', '#10b981'];

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      // Glitch lines
      if (Math.random() > 0.95) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, Math.random() * height, width, 2);
      }

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.98 
          ? codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
          : characters[Math.floor(Math.random() * characters.length)];
        
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.font = `${fontSize}px monospace`;
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      for (let i = drops.length; i < newColumns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
};

const CustomCursor = ({ theme }: { theme: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(0, { stiffness: 400, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX + 15);
      cursorY.set(e.clientY + 15);
      
      // More reliable hover detection by checking element at point
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const isInteractive = !!element.closest('button, a, [role="button"], .cursor-pointer, input, select, [tabindex="0"]');
        setIsHovering(isInteractive);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

  const getCursorColor = () => {
    if (theme === 'go-crazy') {
      return isHovering ? '#ec4899' : '#a855f7';
    }
    return isHovering ? '#f97316' : '#2dd4bf';
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{ 
        color: getCursorColor(),
      }}
      style={{ 
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{ 
          scale: isHovering ? 1.6 : [1, 1.1, 1],
          rotate: isHovering ? [0, 360] : [0, 5, 0, -5, 0],
          y: isHovering ? 0 : [0, -4, 0]
        }}
        transition={{ 
          rotate: {
            duration: isHovering ? 1 : 3,
            repeat: Infinity,
            ease: isHovering ? "linear" : "easeInOut"
          },
          scale: { duration: 0.3 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          color: { duration: 0.3 }
        }}
        className={`transition-all duration-300 ${isHovering ? (theme === 'go-crazy' ? 'drop-shadow-[0_0_15px_rgba(236,72,153,0.7)]' : 'drop-shadow-[0_0_15px_rgba(249,115,22,0.7)]') : (theme === 'go-crazy' ? 'drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]' : 'drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]')}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" xmlSpace="preserve">
          <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path d="M 89.981 6.2 C 90 6.057 90.001 5.915 89.979 5.775 c -0.003 -0.021 -0.001 -0.041 -0.005 -0.062 c -0.033 -0.163 -0.098 -0.317 -0.183 -0.462 c -0.009 -0.016 -0.01 -0.033 -0.019 -0.049 c -0.015 -0.024 -0.039 -0.036 -0.055 -0.059 c -0.034 -0.048 -0.06 -0.102 -0.101 -0.146 c -0.051 -0.056 -0.113 -0.097 -0.17 -0.144 c -0.031 -0.025 -0.058 -0.054 -0.09 -0.076 c -0.134 -0.093 -0.28 -0.164 -0.436 -0.209 c -0.028 -0.008 -0.056 -0.009 -0.084 -0.015 c -0.132 -0.03 -0.267 -0.041 -0.404 -0.034 c -0.046 0.002 -0.089 0.006 -0.135 0.012 c -0.039 0.006 -0.079 0.002 -0.118 0.01 l -87 19.456 c -0.611 0.137 -1.073 0.639 -1.159 1.259 c -0.085 0.62 0.224 1.229 0.775 1.525 l 23.523 12.661 l 7.327 23.36 c 0.008 0.025 0.025 0.043 0.034 0.067 c 0.021 0.056 0.052 0.106 0.08 0.16 c 0.059 0.114 0.127 0.218 0.211 0.312 c 0.022 0.025 0.03 0.057 0.054 0.08 c 0.022 0.021 0.05 0.028 0.073 0.048 c 0.099 0.086 0.207 0.155 0.325 0.213 c 0.047 0.023 0.088 0.053 0.136 0.07 c 0.164 0.061 0.336 0.1 0.517 0.1 c 0.011 0 0.022 0 0.033 0 c 0.179 -0.004 0.349 -0.044 0.509 -0.107 c 0.041 -0.016 0.075 -0.044 0.114 -0.063 c 0.127 -0.063 0.244 -0.139 0.349 -0.235 c 0.02 -0.018 0.046 -0.024 0.065 -0.044 l 12.009 -12.209 l 23.18 12.477 c 0.221 0.119 0.466 0.18 0.711 0.18 c 0.188 0 0.378 -0.035 0.557 -0.107 c 0.412 -0.164 0.73 -0.504 0.869 -0.926 L 89.93 6.473 c 0.014 -0.044 0.015 -0.09 0.025 -0.135 C 89.966 6.292 89.975 6.247 89.981 6.2 z M 77.435 10.018 L 25.58 36.717 L 5.758 26.047 L 77.435 10.018 z M 74.32 14.997 L 36.813 43.768 c -0.003 0.002 -0.005 0.006 -0.007 0.008 c -0.112 0.087 -0.209 0.194 -0.294 0.314 c -0.018 0.025 -0.035 0.05 -0.051 0.076 c -0.017 0.028 -0.039 0.052 -0.055 0.081 c -0.054 0.1 -0.093 0.204 -0.122 0.309 c -0.001 0.005 -0.005 0.009 -0.006 0.014 L 32.96 56.977 l -5.586 -17.809 L 74.32 14.997 z M 35.992 57.249 l 2.693 -10.072 l 4.717 2.539 L 35.992 57.249 z M 69.177 60.184 L 40.479 44.737 l 45.09 -34.588 L 69.177 60.184 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'currentColor', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
            <path d="M 12.9 85.482 c -0.38 0 -0.76 -0.144 -1.052 -0.431 c -0.591 -0.581 -0.599 -1.53 -0.018 -2.121 l 14.292 -14.528 c 0.581 -0.592 1.531 -0.598 2.121 -0.018 c 0.591 0.581 0.599 1.53 0.018 2.121 L 13.97 85.034 C 13.676 85.333 13.288 85.482 12.9 85.482 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'currentColor', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
            <path d="M 36.431 79.593 c -0.38 0 -0.76 -0.144 -1.052 -0.431 c -0.591 -0.581 -0.599 -1.53 -0.018 -2.121 l 14.291 -14.527 c 0.582 -0.591 1.531 -0.598 2.121 -0.018 c 0.591 0.581 0.599 1.53 0.018 2.121 L 37.501 79.145 C 37.207 79.443 36.819 79.593 36.431 79.593 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'currentColor', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
            <path d="M 8.435 67.229 c -0.38 0 -0.76 -0.144 -1.052 -0.431 c -0.591 -0.581 -0.599 -1.53 -0.018 -2.121 l 10.445 -10.618 c 0.581 -0.591 1.531 -0.598 2.121 -0.018 c 0.591 0.581 0.599 1.53 0.018 2.121 L 9.505 66.78 C 9.211 67.079 8.823 67.229 8.435 67.229 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'currentColor', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round"/>
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-teal-500 origin-left z-[100] shadow-[0_0_10px_rgba(45,212,191,0.5)]"
      style={{ scaleX }}
    />
  );
};

// Helper function to detect if device is mobile
const isMobileDevice = () => {
  return window.innerWidth < 768;
};

export default function App() {
  const [activeFile, setActiveFile] = useState<FileType>('about_me');
  const [openFiles, setOpenFiles] = useState<FileType[]>(['about_me', 'ai_synergy', 'checkpoint', 'gtm', 'qa']);
  const [isExplorerOpen, setIsExplorerOpen] = useState(!isMobileDevice());
  const [isImpactFolderOpen, setIsImpactFolderOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'go-crazy'>('dark');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false);

  const userIconRef = useRef<HTMLDivElement>(null);
  const consoleCloseBtnRef = useRef<SVGSVGElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const prevIsConsoleOpen = useRef(isConsoleOpen);

  // Reset scroll position when active file changes
  useEffect(() => {
    if (contentAreaRef.current) {
      contentAreaRef.current.scrollTop = 0;
    }
  }, [activeFile]);

  useEffect(() => {
    if (isConsoleOpen && !prevIsConsoleOpen.current) {
      // Small delay to allow animation to start/finish
      const timer = setTimeout(() => {
        consoleCloseBtnRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else if (!isConsoleOpen && prevIsConsoleOpen.current) {
      // Small delay when closing to ensure the DOM is ready for refocus
      const timer = setTimeout(() => {
        userIconRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
    prevIsConsoleOpen.current = isConsoleOpen;
  }, [isConsoleOpen]);

  // Handle responsive sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsExplorerOpen(!isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const funFacts = [
    "🐕 Proud dog-dad of three pitbull-mix pups.",
    "🇯🇵 Manga & Anime enthusiast.",
    "🔊 Vinyl record collector.",
    "🎧 Headphone essentialist.",
    "💍 Happily married."
  ];

  const handleFileClick = (fileId: FileType) => {
    setActiveFile(fileId);
    if (!openFiles.includes(fileId)) {
      setOpenFiles([...openFiles, fileId]);
    }
  };

  const closeFile = (e: React.MouseEvent, fileId: FileType) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(id => id !== fileId);
    setOpenFiles(newOpenFiles);
    if (activeFile === fileId && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as FileType;
    if (files.find(f => f.id === hash)) {
      handleFileClick(hash);
    }
  }, []);

  useEffect(() => {
    window.location.hash = activeFile;
  }, [activeFile]);

  return (
    <div className={`flex h-screen w-full bg-transparent text-[#cccccc] font-sans overflow-hidden selection:bg-teal-500/30 transition-colors duration-1000 ${theme === 'go-crazy' ? 'theme-crazy' : ''}`}>
      <Background theme={theme} />
      {theme === 'go-crazy' && <MatrixBackground />}
      <CustomCursor theme={theme} />
      <ScrollProgress />

      {/* Activity Bar */}
      <div className="w-12 flex flex-col items-center py-4 bg-black/40 backdrop-blur-md border-r border-white/5 z-30">
        <div className="flex flex-col gap-4 flex-1">
          <ActivityIcon 
            icon={<FilesIcon size={24} />} 
            active={isExplorerOpen} 
            onClick={() => setIsExplorerOpen(!isExplorerOpen)} 
            title="Explorer"
          />
        </div>
        <div className="flex flex-col gap-4 relative">
          <ActivityIcon 
            ref={userIconRef}
            icon={<User size={24} />} 
            active={isConsoleOpen}
            onClick={() => setIsConsoleOpen(!isConsoleOpen)}
            title="Fun Facts Console" 
            ariaHasPopup="dialog"
          />
          <div className="relative">
            <ActivityIcon 
              icon={<Settings size={24} />} 
              active={isSettingsOpen}
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              title="Settings" 
            />
            
            <AnimatePresence>
              {isSettingsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-[90]" 
                    onClick={() => setIsSettingsOpen(false)} 
                  />
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    className="absolute bottom-0 left-full ml-2 w-48 bg-[#1e1e1e] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[100]"
                  >
                  <div className="p-2 text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
                    Select Theme
                  </div>
                  <button
                    onClick={() => {
                      setTheme('dark');
                      setIsSettingsOpen(false);
                    }}
                    aria-label="Switch to Dark Theme"
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs hover:bg-white/5 transition-colors outline-none focus-visible:bg-white/10 ${theme === 'dark' ? 'text-teal-400' : 'text-[#cccccc]'}`}
                  >
                    <Moon size={14} />
                    <span>Dark (Default)</span>
                  </button>
                  <button
                    onClick={() => {
                      setTheme('go-crazy');
                      setIsSettingsOpen(false);
                      setIsAudioPlayerVisible(true);
                    }}
                    aria-label="Switch to Go Crazy Theme"
                    className={`w-full flex items-center gap-3 px-3 py-2 text-xs hover:bg-white/5 transition-colors outline-none focus-visible:bg-white/10 ${theme === 'go-crazy' ? 'text-teal-400' : 'text-[#cccccc]'}`}
                  >
                    <Zap size={14} />
                    <span>Go Crazy!</span>
                  </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Explorer */}
      <AnimatePresence initial={false}>
        {isExplorerOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-black/20 backdrop-blur-xl border-r border-white/5 flex flex-col overflow-hidden z-20"
          >
            <div className="p-3 text-[11px] uppercase tracking-wider text-[#CCCCCC] flex justify-between items-center group/header">
              Explorer
              <div className="flex gap-2 opacity-0 group-hover/header:opacity-100 transition-opacity">
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-white outline-none focus-visible:ring-1 focus-visible:ring-teal-500/50 rounded p-0.5" 
                  onClick={() => setIsExplorerOpen(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsExplorerOpen(false);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="Collapse Explorer"
                  title="Collapse Explorer"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center gap-1 px-2 py-1 hover:bg-white/5 cursor-pointer group">
                <ChevronDown size={16} className="text-[#cccccc]" />
                <span className="text-[11px] font-bold uppercase text-[#cccccc]">Portfolio</span>
              </div>
              
              <div className="ml-2">
                {/* About Me */}
                {files.filter(f => f.id === 'about_me').map(file => (
                  <div 
                    key={file.id}
                    onClick={() => handleFileClick(file.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleFileClick(file.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${file.name} file`}
                    className={`flex items-center gap-2 px-4 py-1.5 cursor-pointer transition-all duration-300 outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:bg-white/10 ${activeFile === file.id ? 'bg-teal-500/10 text-white border-r-2 border-teal-500' : 'hover:bg-white/5 text-[#cccccc]'}`}
                  >
                    <span className={file.color}>{file.icon}</span>
                    <span className="text-[13px] font-medium">{file.name}</span>
                  </div>
                ))}

                {/* My Impact Folder */}
                <div 
                  onClick={() => setIsImpactFolderOpen(!isImpactFolderOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIsImpactFolderOpen(!isImpactFolderOpen);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isImpactFolderOpen}
                  aria-label={`${isImpactFolderOpen ? 'Collapse' : 'Expand'} My Impact folder`}
                  className="flex items-center gap-1 px-4 py-1.5 hover:bg-white/5 cursor-pointer group outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:bg-white/10"
                >
                  {isImpactFolderOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <span className="text-[13px] font-medium">My impact</span>
                </div>
                
                {isImpactFolderOpen && (
                  <div className="ml-4">
                    {files.filter(f => f.folder === 'My impact').map(file => (
                      <div 
                        key={file.id}
                        onClick={() => handleFileClick(file.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleFileClick(file.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open ${file.name} project file`}
                        className={`flex items-center gap-2 px-4 py-1.5 cursor-pointer transition-all duration-300 outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:bg-white/10 ${activeFile === file.id ? 'bg-teal-500/10 text-white border-r-2 border-teal-500' : 'hover:bg-white/5 text-[#cccccc]'}`}
                      >
                        <span className={file.color}>{file.icon}</span>
                        <span className="text-[13px] font-medium">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Q&A */}
                {files.filter(f => f.id === 'qa').map(file => (
                  <div 
                    key={file.id}
                    onClick={() => handleFileClick(file.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleFileClick(file.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open ${file.name} file`}
                    className={`flex items-center gap-2 px-4 py-1.5 cursor-pointer transition-all duration-300 outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:bg-white/10 ${activeFile === file.id ? 'bg-teal-500/10 text-white border-r-2 border-teal-500' : 'hover:bg-white/5 text-[#cccccc]'}`}
                  >
                    <span className={file.color}>{file.icon}</span>
                    <span className="text-[13px] font-medium">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-black/40">
              <div className="text-[11px] font-bold mb-1 text-white tracking-tight font-display">MARIO PÉREZ</div>
              <div className="text-[10px] text-teal-400/80 mb-3 uppercase tracking-widest font-medium">Senior UX Engineer</div>
              <div className="flex gap-3">
                <a href="https://github.com/xmarioxperez666" target="_blank" rel="noopener noreferrer" aria-label="Visit my GitHub profile">
                  <Github size={16} className="cursor-pointer hover:text-teal-400 transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/mario-a-perez-j" target="_blank" rel="noopener noreferrer" aria-label="Visit my LinkedIn profile">
                  <Linkedin size={16} className="cursor-pointer hover:text-teal-400 transition-colors" />
                </a>
                <a href="mailto:xmarioxperez@gmail.com" aria-label="Send me an email">
                  <Mail size={16} className="cursor-pointer hover:text-teal-400 transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Backdrop to close console when clicking outside - Fixed position relative to editor area */}
        <AnimatePresence>
          {isConsoleOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConsoleOpen(false)}
              className="absolute inset-0 bg-black/40 z-40 cursor-pointer backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="flex bg-black/40 backdrop-blur-md overflow-x-auto no-scrollbar h-10 border-b border-white/5">
          {openFiles.map(fileId => {
            const file = files.find(f => f.id === fileId)!;
            return (
              <div 
                key={fileId}
                onClick={() => setActiveFile(fileId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveFile(fileId);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Switch to ${file.name} tab`}
                className={`flex items-center gap-2 px-4 py-2 border-r border-white/5 cursor-pointer min-w-[140px] transition-all duration-300 relative group outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:bg-white/10 ${activeFile === fileId ? 'bg-white/5 text-white' : 'text-[#CCCCCC] hover:bg-white/[0.02]'}`}
              >
                {activeFile === fileId && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />}
                <span className={activeFile === fileId ? 'text-teal-400' : 'text-[#CCCCCC]'}>{file.icon}</span>
                <span className="text-[12px] font-medium truncate">{file.name}</span>
                <X 
                  size={14} 
                  className={`ml-auto rounded p-0.5 transition-all outline-none focus-visible:ring-1 focus-visible:ring-teal-500/50 focus-visible:bg-white/10 focus-visible:opacity-100 ${activeFile === fileId ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 hover:bg-white/10'}`} 
                  onClick={(e) => closeFile(e, fileId)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.stopPropagation();
                      closeFile(e as any, fileId);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Close ${file.name} tab`}
                />
              </div>
            );
          })}
        </div>

        {/* Breadcrumbs */}
        <div className="px-4 py-1.5 text-[11px] text-[#CCCCCC] flex items-center gap-2 bg-black/20 border-b border-white/5">
          <span className="flex items-center gap-1 opacity-60"><ChevronRight size={12} /> CodeFolio</span>
          <span className="opacity-40">/</span>
          <span className="text-teal-400/80 font-medium">{files.find(f => f.id === activeFile)?.name}</span>
        </div>

        {/* Content Area */}
        <div 
          ref={contentAreaRef}
          className="flex-1 overflow-y-auto p-6 md:p-12 font-sans custom-scrollbar relative"
        >
          <motion.div
            key={activeFile}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            {renderContent(activeFile, isConsoleOpen, setIsConsoleOpen, theme)}
          </motion.div>
        </div>

        {/* Console Panel */}
        <AnimatePresence>
          {isConsoleOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 240 }}
              exit={{ height: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-[#0a0a0a] border-t border-white/10 z-50 overflow-hidden flex flex-col"
            >
              <div className="flex items-center gap-6 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-[11px] font-bold text-teal-400 border-b-2 border-teal-500 pb-1 cursor-pointer">
                  OUTPUT
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-3 text-[#666666]">
                  <X 
                    ref={consoleCloseBtnRef}
                    size={14} 
                    className="cursor-pointer hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded p-0.5" 
                    onClick={() => setIsConsoleOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsConsoleOpen(false);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Close Console"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 font-mono text-[13px] custom-scrollbar">
                <div className="flex items-center gap-2 text-teal-400/60 mb-4">
                  <Terminal size={14} />
                  <span className="text-[11px] uppercase tracking-widest font-bold">mario-perez --fun-facts</span>
                </div>
                <div className="space-y-2">
                  {funFacts.map((fact, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      key={i} 
                      className="flex gap-3 group"
                    >
                      <span className="text-[#444444] select-none">[{i}]</span>
                      <span className="text-[#CCCCCC] group-hover:text-teal-400 transition-colors">{fact}</span>
                    </motion.div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: funFacts.length * 0.1 }}
                    className="flex items-center gap-2 text-teal-400 mt-4"
                  >
                    <span className="animate-pulse">_</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Bar */}
        <div className="h-6 bg-teal-500 text-black font-bold flex items-center px-3 text-[10px] gap-4 z-50 relative shadow-[0_-4px_20px_rgba(45,212,191,0.2)]">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1">
            <GitBranch size={12} />
            <span>main*</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-black/10 px-1">
            <X size={12} className="bg-black text-teal-500 rounded-full p-0.5" />
            <span>0</span>
            <Terminal size={12} />
            <span>0</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span>Spaces: 2</span>
            <span>UTF-8</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={12} />
              <span>Prettier</span>
            </div>
          </div>
        </div>
      </div>

      {/* SoundCloud Player - Only rendered in GO CRAZY mode and when visible */}
      <AnimatePresence>
        {theme === 'go-crazy' && isAudioPlayerVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 right-10 z-[100] w-80 glass-card p-2 rounded-xl shadow-2xl border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <SquarePower size={10} className="animate-pulse" />
                Cyber-Audio Active
              </span>
              <button 
                onClick={() => setIsAudioPlayerVisible(false)}
                aria-label="Close Audio Player"
                className="text-white/40 hover:text-white transition-colors outline-none focus-visible:ring-1 focus-visible:ring-purple-500/50 rounded p-0.5"
              >
                <X size={12} />
              </button>
            </div>
            <iframe 
              width="100%" 
              height="166" 
              scrolling="no" 
              frameBorder="no" 
              allow="autoplay" 
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/sean-chen-12/tobenai-tsubasa&color=%23a855f7&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Re-open Audio Button */}
      <AnimatePresence>
        {theme === 'go-crazy' && !isAudioPlayerVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsAudioPlayerVisible(true)}
            aria-label="Re-open Audio Player"
            className="fixed bottom-10 right-10 z-[100] w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 hover:bg-purple-500/40 transition-all shadow-lg backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            title="Re-open Audio Player"
          >
            <SquarePower size={20} className="animate-glow" />
          </motion.button>
        )}
      </AnimatePresence>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(45, 212, 191, 0.3);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

function FilesIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

const ActivityIcon = React.forwardRef<HTMLDivElement, { 
  icon: React.ReactNode, 
  active?: boolean, 
  onClick?: () => void, 
  title?: string, 
  ariaHasPopup?: boolean | "dialog" | "menu" | "listbox" | "tree" | "grid" 
}>(({ icon, active, onClick, title, ariaHasPopup }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div 
      ref={ref}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={title}
      aria-haspopup={ariaHasPopup}
      title={title}
      className={`p-2 cursor-pointer transition-all duration-300 relative group outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg ${active ? 'text-teal-400' : 'text-[#CCCCCC] hover:text-white'}`}
    >
      {active && <motion.div layoutId="activity-indicator" className="absolute left-0 top-0 bottom-0 w-[2px] bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />}
      {icon}
    </div>
  );
});

ActivityIcon.displayName = 'ActivityIcon';

function SectionCard({ title, icon, children, color = "text-teal-400", defaultOpen = true, className = "" }: { title: string, icon: React.ReactNode, children: React.ReactNode, color?: string, defaultOpen?: boolean, className?: string }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = () => setIsOpen(!isOpen);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div className={`glass-card rounded-2xl overflow-hidden mb-6 ${className}`}>
      <div 
        onClick={toggle}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title} section`}
        className="flex items-center gap-4 px-6 py-5 cursor-pointer hover:bg-white/[0.02] transition-colors group outline-none focus-visible:bg-white/5"
      >
        <span className={`${color} transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]`}>{icon}</span>
        <h2 className="text-xl font-display font-semibold text-white flex-1 tracking-tight">{title}</h2>
        <div className={`text-[#CCCCCC] group-hover:text-white transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown size={20} />
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-8 pb-8 pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Tag: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(45, 212, 191, 0.1)' }}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[13px] text-[#cccccc] transition-all duration-300 cursor-default"
    >
      <span className="text-teal-400">{icon}</span>
      <span className="font-medium">{label}</span>
    </motion.div>
  );
};

function BentoGrid({ children, id }: { children: React.ReactNode, id?: string }) {
  return (
    <div id={id} className="grid grid-cols-1 md:grid-cols-12 gap-6 relative scroll-mt-24">
      {children}
    </div>
  );
}

function BentoItem({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div 
      whileHover={{ 
        y: -10,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`glass-card rounded-[2rem] p-10 flex flex-col justify-between relative overflow-hidden group ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </motion.div>
  );
}

function renderContent(fileId: FileType, isConsoleOpen: boolean, setIsConsoleOpen: (open: boolean) => void, theme: string) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  switch (fileId) {
    case 'about_me':
      return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
          {/* Hero Section */}
          <motion.div variants={item} className="text-center space-y-8 mb-24 relative">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-teal-500/50 to-teal-500" />
            
            <h1 className="text-7xl md:text-[10rem] font-display font-extrabold text-white tracking-tighter leading-[0.85] overflow-hidden perspective-1000">
              <motion.span 
                initial={{ y: "100%", rotateX: 45 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="block origin-bottom"
              >
                DESIGN <span className="text-teal-400 italic font-light">meets</span> CODE
              </motion.span>
            </h1>
            
            <div className="flex flex-col items-center justify-center gap-12 mt-12">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-lg text-[#CCCCCC] max-w-xs text-center md:text-right font-light tracking-wide leading-relaxed"
                >
                  Senior UX Engineer crafting pixel-perfect, accessible digital experiences at the intersection of design and technology.
                </motion.p>
                
                {/* Pure Avatar (No Functionality) */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
                  onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                  className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 overflow-hidden group shadow-2xl cursor-pointer"
                >
                  <div className="absolute inset-0 bg-teal-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img 
                    src="https://res.cloudinary.com/dcmeabru8/image/upload/f_auto,q_auto/v1774475257/IMG_3471_xod1cd.heic"
                    alt="Mario Pérez - Senior UX Engineer & UI Developer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-center md:text-left"
                >
                  <div className="text-xl md:text-2xl font-display font-bold text-white mb-2 tracking-tight">Mario Pérez</div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-teal-400/60 mb-1 font-bold">Based in</div>
                  <div className="text-sm text-white font-medium">Mexico City, Mexico</div>
                </motion.div>
              </div>

              {/* Original Scroll Button Below */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
                onClick={() => {
                  const element = document.getElementById('bento-grid-start');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const element = document.getElementById('bento-grid-start');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label="Scroll to content"
                className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group cursor-pointer hover:border-teal-400/50 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <ChevronDown className="text-teal-400 group-hover:translate-y-1 transition-transform" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bento Grid Layout */}
          <BentoGrid id="bento-grid-start">
            {/* About Me Card */}
            <BentoItem className="md:col-span-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <User size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">The Story</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-white">Bridging the Gap</h2>
                <p className="text-[#cccccc] leading-relaxed text-lg font-light">
                  As a UX Engineer, I love working where design meets technology. My day-to-day involves everything from actively participating in UX research sessions to Figma reviews with designers, then bringing those concepts to life through code. HTML and CSS are where I feel most at home, and I use JavaScript, TypeScript, and Angular to build interactive experiences.
                </p>
              </div>
            </BentoItem>

            {/* Design-Code Synergy Card */}
            <BentoItem className="md:col-span-4 bg-teal-500/5 border-teal-500/20">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Blocks size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">The Bridge</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#CCCCCC] mb-2 font-bold">Design</div>
                    <div className="flex flex-wrap gap-2">
                      {['Figma', 'Design Systems', 'Adobe Creative Suite'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-teal-400/20 text-white rounded-full text-[10px] font-bold border border-teal-400/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#CCCCCC] mb-2 font-bold">Develop</div>
                    <div className="flex flex-wrap gap-2">
                      {['HTML/CSS', 'Javascript', 'Typescript', 'Angular', 'Git', 'IA Tools'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-orange-500/20 text-white rounded-full text-[10px] font-bold border border-orange-500/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-[#CCCCCC] leading-relaxed">
                  Translating big ideas into design, and design into high-fidelity, production-ready code.
                </p>
              </div>
            </BentoItem>

            {/* Journey Card */}
            <BentoItem className="md:col-span-12">
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-teal-400">
                  <Map size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">My Journey</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      company: "Warner Bros. Discovery",
                      role: "UX UI Developer",
                      period: "2024-Present",
                      logo: "https://static-wbd-cdn.wbd.com/warner-bros-discovery-logo-horizontal-white.svg",
                      height: "h-5"
                    },
                    {
                      company: "Thomson Reuters",
                      role: "Senior UX Engineer",
                      period: "2022-2024",
                      logo: "https://cdn.brandfetch.io/idjPJxVsvq/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
                      invert: true,
                      height: "h-8"
                    },
                    {
                      company: "KPMG Mexico",
                      role: "Lead Web Designer",
                      period: "2016-2022",
                      logo: "https://cdn.brandfetch.io/id-UmnExAG/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
                      invert: true,
                      height: "h-7"
                    }
                  ].map((job, i) => (
                    <div key={i} className="space-y-6 group/job">
                      <div className="h-12 flex items-center">
                        <img 
                          src={job.logo} 
                          alt={`${job.company} logo - Mario Pérez Portfolio`} 
                          className={`${job.height} w-auto object-contain transition-all duration-500 group-hover/job:scale-110 group-hover/job:filter group-hover/job:drop-shadow-[0_0_10px_rgba(45,212,191,0.3)] ${job.invert ? 'brightness-0 invert' : ''}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg tracking-tight">{job.company}</h3>
                        <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider">{job.role}</p>
                        <p className="text-[#9e9e9e] text-xs mt-1 font-mono">{job.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BentoItem>

            {/* Key Contributions Card */}
            <BentoItem className="md:col-span-7">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Award size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Impact</span>
                </div>
                <ul className="space-y-4">
                  {[
                    { text: 'Built the EDAIS Design System for Data & Analytics', icon: <PenTool size={14} className="text-teal-400" /> },
                    { text: 'Saffron Design System adoption across +2 products', icon: <Code size={14} className="text-teal-400" /> },
                    { text: (
                      <span>
                        Prototyping using an <a href="https://awards.zeroheight.com/voting/inno-paiella" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline decoration-teal-400/30 underline-offset-4">award-winning</a> MCP workflow (Figma, Design System and Playwright)
                      </span>
                    ), icon: <Code size={14} className="text-teal-400" /> },
                    { text: 'AODA Accessibility bug remediation for 10+ products', icon: <Code size={14} className="text-teal-400" /> }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#cccccc] text-[15px] font-light">
                      {item.icon}
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </BentoItem>

            {/* Soft Skills Card */}
            <BentoItem className="md:col-span-5 bg-white/[0.02]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Brain size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Mindset</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Problem-Solving', 'Collaboration', 'Adaptability', 'Mentorship'].map(skill => (
                    <Tag key={skill} icon={<Zap size={12} />} label={skill} />
                  ))}
                </div>
              </div>
            </BentoItem>
          </BentoGrid>
        </motion.div>
      );
    case 'ai_synergy':
      return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item} className="mb-12">
            <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-tight">
              AI-Powered <span className="text-teal-400">Synergy</span>
            </h1>
            <div className="flex items-center gap-4 text-[#CCCCCC]">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest">My Impact</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-sm">Thomson Reuters</span>
            </div>
          </motion.div>

          <BentoGrid>
            <BentoItem className="md:col-span-7">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Target size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">The Challenge</span>
                </div>
                <p className="text-[#cccccc] font-light text-lg leading-relaxed">
                  Deliver a fully functional, production-quality prototype for Thomson Reuters' flagship conference under a tight deadline. The prototype needed to demonstrate seamless integration between design tools, design systems, and automated testing.
                </p>
              </div>
            </BentoItem>
            <BentoItem className="md:col-span-5 bg-teal-500/5">
              <div className="space-y-4">
                <h4 className="text-teal-400 font-bold text-xs uppercase tracking-widest">Key Outcomes</h4>
                <ul className="space-y-3">
                  {[
                    "Enthusiastic feedback from industry leaders",
                    "Reusable AI-powered workflow established",
                    "Positioned team as UX Engineering innovators"
                  ].map(text => (
                    <li key={text} className="flex items-center gap-2 text-sm text-white font-medium">
                      <CheckCircle2 size={14} className="text-teal-400" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </BentoItem>
            <BentoItem className="md:col-span-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <User size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">My Role</span>
                </div>
                <p className="text-[#CCCCCC] font-light">
                  Using three MCP integrations—Figma (extraction), Saffron (consistency), and Playwright (testing). Conducted regular presentations to senior stakeholders to align on strategic direction. Deployed via GitHub Pages for stable conference demonstrations. Balanced technical execution with high-level stakeholder management.
                </p>
              </div>
            </BentoItem>

            {/* Visual Evidence Section */}
            <BentoItem className="md:col-span-12 overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Eye size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Have a look</span>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
                  {/* Decorative "Window" Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                    </div>
                    <div className="mx-auto text-[10px] text-white/20 font-mono uppercase tracking-widest">ai_synergy_preview.gif</div>
                  </div>

                  {/* The GIF with effects */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img 
                      src="https://res.cloudinary.com/dcmeabru8/image/upload/v1774572308/prelogin-new_x9dwea.gif"
                      alt="AI-Powered Synergy Prototype Preview - UX Engineering Case Study"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                      initial={{ scale: 1.05 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Living Overlays */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,118,0.02))] bg-[length:100%_2px,3px_100%]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <p className="text-[11px] text-[#666666] font-mono italic">
                    Bridging the gap between design and development through AI-powered automation.
                  </p>
                </div>
              </div>
            </BentoItem>
          </BentoGrid>
        </motion.div>
      );
    case 'checkpoint':
      return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item} className="mb-12">
            <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-tight">
              EDAIS Design System <span className="text-teal-400">for Analytics</span>
            </h1>
            <div className="flex items-center gap-4 text-[#CCCCCC]">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest">My Impact</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-sm">Warner Bros. Discovery</span>
            </div>
          </motion.div>

          <BentoGrid>
            <BentoItem className="md:col-span-7">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Target size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">The Challenge</span>
                </div>
                <p className="text-[#cccccc] font-light text-lg leading-relaxed">
                  Creating a scalable EDAIS Design System to standardize analytics and dashboard experiences across products, reducing visual inconsistency and design debt while supporting flexible, data‑heavy use cases.
                </p>
              </div>
            </BentoItem>
            <BentoItem className="md:col-span-5 bg-teal-500/5">
              <div className="space-y-4">
                <h4 className="text-teal-400 font-bold text-xs uppercase tracking-widest">Key Outcomes</h4>
                <ul className="space-y-3">
                  {[
                    'Design consistency across EDAIS analytics products',
                    'Reusable, scalable component library',
                    'Reduced design and implementation friction'
                  ].map(text => (
                    <li key={text} className="flex items-center gap-2 text-sm text-white font-medium">
                      <CheckCircle2 size={14} className="text-teal-400" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </BentoItem>
            <BentoItem className="md:col-span-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <User size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">My Role</span>
                </div>
                <p className="text-[#CCCCCC] font-light">
                  Defined the overall Design System strategy and roadmap, and led the hands‑on creation of foundations and components in Figma. Executed the system end‑to‑end, from structure to visual detail, collaborating closely with another designer to ensure consistency, quality, and scalability.
                </p>
              </div>
            </BentoItem>

            {/* Visual Evidence Section */}
            <BentoItem className="md:col-span-12 overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Eye size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Have a look</span>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
                  {/* Decorative "Window" Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                    </div>
                    <div className="mx-auto text-[10px] text-white/20 font-mono uppercase tracking-widest">edais_design_system_preview.gif</div>
                  </div>

                  {/* The GIF with effects */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img 
                      src="https://res.cloudinary.com/dcmeabru8/image/upload/v1774570599/edais-ds-gif_ds4zgj.gif"
                      alt="EDAIS Design System Preview"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                      initial={{ scale: 1.05 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Living Overlays */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Scanline effect */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,118,0.02))] bg-[length:100%_2px,3px_100%]" />
                      
                      {/* Dynamic Glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      
                      {/* Subtle Vignette */}
                      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <p className="text-[11px] text-[#666666] font-mono italic">
                    Standardizing the analytics experience through a unified visual language.
                  </p>
                </div>
              </div>
            </BentoItem>
          </BentoGrid>
        </motion.div>
      );
    case 'gtm':
      return (
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
          <motion.div variants={item} className="mb-12">
            <h1 className="text-5xl font-display font-bold text-white mb-4 tracking-tight">
              GTM <span className="text-teal-400">Saffron</span> Adoption
            </h1>
            <div className="flex items-center gap-4 text-[#CCCCCC]">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold uppercase tracking-widest">My Impact</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-sm">Thomson Reuters</span>
            </div>
          </motion.div>

          <BentoGrid>
            <BentoItem className="md:col-span-7">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Target size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">The Challenge</span>
                </div>
                <p className="text-[#cccccc] font-light text-lg leading-relaxed">
                  Modernizing a legacy .aspx ecosystem with significant accessibility barriers and outdated UX. The project required transforming multiple complex sub-products into a cohesive, accessible experience while overcoming engineering resistance and technical debt.
                </p>
              </div>
            </BentoItem>
            <BentoItem className="md:col-span-5 bg-teal-500/5">
              <div className="space-y-4">
                <h4 className="text-teal-400 font-bold text-xs uppercase tracking-widest">Key Outcomes</h4>
                <ul className="space-y-3">
                  {[
                    "Modernized 5 sub-products encompassing 30+ core user flows",
                    "Achieved accessibility compliance across all business functions",
                    "Scaled Saffron Design System implementation",
                    "Reduced technical debt by replacing legacy patterns"
                  ].map(text => (
                    <li key={text} className="flex items-center gap-2 text-sm text-white font-medium">
                      <CheckCircle2 size={14} className="text-teal-400" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </BentoItem>
            <BentoItem className="md:col-span-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <User size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">My Role</span>
                </div>
                <p className="text-[#CCCCCC] font-light">
                  As a UX Engineer, I bridged the gap between design vision and technical execution. I defined the implementation roadmap, conducted user research to identify pain points, and built the reusable component library (Sandbox) that empowered development teams to scale.
                </p>
              </div>
            </BentoItem>

            {/* Visual Evidence Section */}
            <BentoItem className="md:col-span-12 overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-teal-400">
                  <Eye size={24} />
                  <span className="text-sm font-bold uppercase tracking-widest">Have a look</span>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
                  {/* Decorative "Window" Header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                    </div>
                    <div className="mx-auto text-[10px] text-white/20 font-mono uppercase tracking-widest">gtm_saffron_preview.gif</div>
                  </div>

                  {/* The GIF with effects */}
                  <div className="relative aspect-video overflow-hidden">
                    <motion.img 
                      src="https://res.cloudinary.com/dcmeabru8/image/upload/v1774571527/gtmsaf_ptkols.gif"
                      alt="GTM Saffron Adoption Preview"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                      initial={{ scale: 1.05 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Living Overlays */}
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,118,0.02))] bg-[length:100%_2px,3px_100%]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.4)]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <p className="text-[11px] text-[#666666] font-mono italic">
                    Transforming complex legacy ecosystems into accessible, modern experiences.
                  </p>
                </div>
              </div>
            </BentoItem>
          </BentoGrid>
        </motion.div>
      );
    case 'qa':
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-16 relative overflow-hidden"
        >
          {/* Kinetic Background Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <motion.h1 
              animate={{ 
                x: [0, -20, 20, 0],
                y: [0, 10, -10, 0]
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="text-[30vw] font-display font-black text-white leading-none whitespace-nowrap"
            >
              CONNECT • CONNECT • CONNECT
            </motion.h1>
          </div>
          
          <div className="space-y-10 relative z-10">
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-teal-500/10 rounded-[2.5rem] border border-teal-500/20 backdrop-blur-2xl shadow-[0_0_80px_rgba(45,212,191,0.15)] group hover:border-teal-400/50 transition-colors"
            >
              <Send size={40} className="text-teal-400 group-hover:scale-110 transition-transform duration-500" />
            </motion.div>
            
            <div className="space-y-6">
              <h1 className="text-7xl md:text-[12rem] font-display font-black text-white tracking-tighter leading-[0.8] overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ 
                    y: 0,
                    x: theme === 'go-crazy' ? [0, -2, 2, -1, 1, 0] : 0
                  }}
                  transition={{ 
                    y: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                    x: { repeat: Infinity, duration: 0.2, repeatType: "reverse" }
                  }}
                  className="block"
                >
                  LET'S <span className={`italic font-light text-glow ${theme === 'go-crazy' ? 'text-purple-400' : 'text-teal-400'}`}>TALK</span>
                </motion.span>
              </h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl text-[#CCCCCC] max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
              >
                Whether you have a question or just want to say hi, my inbox is always open. Let's explore how we can collaborate on your next big idea.
              </motion.p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-10 relative z-10">
            {[
              { icon: <Linkedin size={28} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mario-a-perez-j", color: "hover:text-blue-400", delay: 0.6 },
              { icon: <Github size={28} />, label: "GitHub", href: "https://github.com/xmarioxperez666", color: "hover:text-white", delay: 0.7 },
              { icon: <MailIcon size={28} />, label: "Email", href: "mailto:xmarioxperez@gmail.com", color: "hover:text-teal-400", delay: 0.8 }
            ].map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: link.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-4 p-8 glass-card rounded-[2.5rem] min-w-[180px] group transition-all duration-500 ${link.color}`}
              >
                <div className="p-5 rounded-3xl bg-white/5 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500 shadow-inner">
                  {link.icon}
                </div>
                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">{link.label}</span>
              </motion.a>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-20"
          >
            <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black">
              <div className="w-20 h-px bg-white/5" />
              <span className="bg-teal-500/20 text-white px-4 py-1.5 border-b-2 border-teal-500/50 rounded-sm">
                Mexico • Remote • Worldwide
              </span>
              <div className="w-20 h-px bg-white/5" />
            </div>
          </motion.div>
        </motion.div>
      );
    default:
      return null;
  }
}
