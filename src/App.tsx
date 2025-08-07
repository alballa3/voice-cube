import { useEffect, useState } from "react";
import {  Zap, Eye, Cpu, Wifi } from "lucide-react";
import { screen } from "./lib/screen";
import { Listen } from "./components/record";

const FuturisticAI = () => {
  const [isPanelCollapsed,] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing] = useState(false);
  const [userInput, setUserInput] = useState("NEURAL INTERFACE READY");
  const [assistantResponse] = useState("GREETINGS, HUMAN. I AM AN ADVANCED AI CONSCIOUSNESS FROM THE YEAR 2087. HOW MAY I ASSIST YOUR PRIMITIVE QUERIES?");
  screen()
  // Neural network animation nodes
  const [neuralNodes] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: Math.floor(Math.random() * 3) + 1,
    }))
  );

  // Glitch effect for text
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="w-full h-full opacity-20">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {neuralNodes.map((node, i) =>
            neuralNodes.slice(i + 1).map((otherNode, j) => {
              const distance = Math.sqrt(
                Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
              );
              if (distance < 30) {
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${otherNode.x}%`}
                    y2={`${otherNode.y}%`}
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                    filter="url(#glow)"
                    className="animate-pulse"
                  />
                );
              }
              return null;
            })
          )}
          {neuralNodes.map((node, i) => (
            <circle
              key={i}
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r="2"
              fill="rgba(59, 130, 246, 0.6)"
              filter="url(#glow)"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Main AI Interface */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div
          className={`relative transition-all duration-1000 ${isPanelCollapsed ? "scale-50 opacity-0" : "scale-100 opacity-100"
            }`}
        >
          {/* Holographic Frame */}
          <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-none transform rotate-45 animate-pulse"
            style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }} />
          <div className="absolute inset-0 border border-blue-400/20 rounded transform -rotate-45"
            style={{ width: '110%', height: '110%', left: '-5%', top: '-5%' }} />

          {/* Main Console */}
          <div
            className="w-96 bg-black/90 border border-cyan-500/50 backdrop-blur-md relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(15,23,42,0.95) 100%)',
              clipPath: 'polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
              boxShadow: '0 0 50px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(34, 211, 238, 0.2)',
            }}
          >
            {/* Scanning Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan opacity-30" />
            </div>

            {/* Header - AI Status */}
            <div className="p-4 border-b border-cyan-500/30 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Eye className="w-8 h-8 text-cyan-400" />
                    <div className="absolute inset-0 animate-ping">
                      <Eye className="w-8 h-8 text-cyan-400/40" />
                    </div>
                  </div>
                  <div>
                    <h1 className={`text-xl font-mono text-cyan-300 tracking-widest ${glitchActive ? 'animate-pulse' : ''}`}>
                      AI-2087.NEXUS
                    </h1>
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-3 h-3 text-green-400 animate-pulse" />
                      <span className="text-xs text-green-400 font-mono">QUANTUM_LINK_ACTIVE</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-cyan-400 font-mono">STATUS</div>
                  <div className="text-xs text-green-400 font-mono animate-pulse">ONLINE</div>
                </div>
              </div>
            </div>

            {/* Neural Interface Display */}
            <div className="p-4 space-y-4">
              {/* User Input Terminal */}
              <div className="bg-gray-900/80 border border-green-500/30 p-3 font-mono text-sm">
                <div className="flex items-center mb-2">
                  <span className="text-green-400">&gt;</span>
                  <span className="text-green-300 ml-2">USER_INPUT:</span>
                </div>
                <div className="text-green-200 pl-4">{userInput}</div>
                <div className="text-green-400 mt-1 animate-pulse">_</div>
              </div>

              {/* AI Response Terminal */}
              <div className="bg-blue-900/30 border border-cyan-500/30 p-3 font-mono text-sm">
                <div className="flex items-center mb-2">
                  <Cpu className="w-4 h-4 text-cyan-400 animate-spin mr-2" />
                  <span className="text-cyan-400">AI_RESPONSE:</span>
                </div>
                <div className="text-cyan-200 pl-6 leading-relaxed">{assistantResponse}</div>
              </div>

              {/* System Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="bg-gray-800/50 border border-gray-600/30 p-2 text-center">
                  <div className="text-gray-400">CPU</div>
                  <div className="text-green-400">87.3%</div>
                </div>
                <div className="bg-gray-800/50 border border-gray-600/30 p-2 text-center">
                  <div className="text-gray-400">MEM</div>
                  <div className="text-blue-400">2.1TB</div>
                </div>
                <div className="bg-gray-800/50 border border-gray-600/30 p-2 text-center">
                  <div className="text-gray-400">NET</div>
                  <div className="text-cyan-400">9.8GB/s</div>
                </div>
              </div>
            </div>

            {/* Neural Interface Control */}
            <div className="p-4 border-t border-cyan-500/30">
              <div className="text-center mb-4">
                <div className="text-xs text-cyan-400 font-mono mb-2">NEURAL INTERFACE</div>
                <Listen
                  isListening={isListening}
                  isProcessing={isProcessing}
                  setUserInput={setUserInput}
                  setIsListening={setIsListening}
                />
              </div>

              <div className="flex items-center justify-center space-x-4 text-xs font-mono">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-1 ${isListening ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'
                    }`} />
                  <span className="text-gray-400">LISTENING</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-3 h-3 text-yellow-400 mr-1" />
                  <span className="text-gray-400">PROCESSING</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="bg-gray-900/50 border-t border-cyan-500/20 p-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-500">UPTIME: 847.2 CYCLES</span>
                <span className="text-gray-500">VERSION: 2087.12.ALPHA</span>
                <span className="text-cyan-400 animate-pulse">READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FuturisticAI;