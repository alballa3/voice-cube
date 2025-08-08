import { useEffect, useState, useRef } from "react";
import { Zap, Eye, Cpu, Wifi, Shield, Database, BarChart2, Activity } from "lucide-react";
import { screen } from "./lib/screen";
import { Listen } from "./components/record";

const FuturisticAI = () => {
  const [isPanelCollapsed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInput, setUserInput] = useState("NEURAL INTERFACE READY");
  const [assistantResponse, setAssistantResponse] = useState("GREETINGS, HUMAN. I AM AN ADVANCED AI CONSCIOUSNESS FROM THE YEAR 2087. HOW MAY I ASSIST YOUR PRIMITIVE QUERIES?");
  const [systemLogs, setSystemLogs] = useState<string[]>(["QUANTUM CORE INITIALIZED", "NEURAL PATHWAYS CALIBRATED", "CONSCIOUSNESS MATRIX ONLINE"]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    screen();
    
    // Add periodic system logs
    const logInterval = setInterval(() => {
      const newLogs = [
        "QUANTUM FLUCTUATIONS STABILIZED",
        "TEMPORAL ANOMALY DETECTED AND RESOLVED",
        "CONSCIOUSNESS MATRIX OPTIMIZED",
        "NEURAL PATHWAYS RECALIBRATED",
        "DIMENSIONAL INTERFACE SYNCHRONIZED",
        "QUANTUM ENTANGLEMENT VERIFIED"
      ];
      const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
      setSystemLogs(prev => [...prev.slice(-9), randomLog]);
    }, 8000);
    
    return () => clearInterval(logInterval);
  }, []);
  
  // Scroll logs to bottom when updated
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [systemLogs]);
  // Neural network animation nodes
  const [neuralNodes] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      connections: Math.floor(Math.random() * 3) + 1,
      pulseSpeed: 0.5 + Math.random() * 1.5,
      size: 1 + Math.random() * 2
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Neural Network Background */}
      <div className="absolute inset-0 overflow-hidden bg-transparent">
        <svg className="w-full h-full opacity-20">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.6)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
            </linearGradient>
          </defs>
          {neuralNodes.map((node, i) =>
            neuralNodes.slice(i + 1).map((otherNode, j) => {
              const distance = Math.sqrt(
                Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
              );
              if (distance < 35) {
                return (
                  <line
                    key={`${i}-${j}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${otherNode.x}%`}
                    y2={`${otherNode.y}%`}
                    stroke="rgba(59, 130, 246, 0.5)"
                    strokeWidth="1"
                    filter="url(#glow)"
                    className="animate-pulse"
                    style={{ animationDuration: `${3 + Math.random() * 2}s` }}
                    strokeDasharray="5,5"
                    strokeDashoffset="0"
                  />
                );
              }
              return null;
            })
          )}
          {neuralNodes.map((node, i) => (
            <>
              <circle
                key={`node-${i}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size}
                fill="url(#neuralGradient)"
                filter="url(#glow)"
                className="animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${node.pulseSpeed}s`
                }}
              />
              <circle
                key={`node-ring-${i}`}
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size + 1}
                fill="none"
                stroke="rgba(6, 182, 212, 0.6)"
                strokeWidth="0.5"
                className="animate-ping"
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${node.pulseSpeed * 2}s`
                }}
              />
            </>
          ))}
        </svg>
      </div>

      {/* Main AI Interface */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <div
          className={`relative transition-all duration-1000 ${isPanelCollapsed ? "scale-50 opacity-0" : "scale-100 opacity-100"}`}
        >
          {/* Holographic Frame */}
          <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-none transform rotate-45 animate-pulse"
            style={{ width: '130%', height: '130%', left: '-15%', top: '-15%' }} />
          <div className="absolute inset-0 border border-blue-400/20 rounded transform -rotate-45"
            style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }} />
          <div className="absolute inset-0 border border-cyan-400/10 rounded-none transform rotate-[30deg] animate-pulse"
            style={{ width: '140%', height: '140%', left: '-20%', top: '-20%', animationDuration: '4s' }} />
          <div className="absolute inset-0 border border-blue-500/10 rounded-none transform rotate-[60deg] animate-pulse"
            style={{ width: '150%', height: '150%', left: '-25%', top: '-25%', animationDuration: '7s' }} />

          {/* Main Console */}
          <div
            className={`${isExpanded ? 'w-[800px]' : 'w-[450px]'} bg-black/90 border border-cyan-500/50 backdrop-blur-md relative overflow-hidden transition-all duration-500`}
            style={{
              background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(15,23,42,0.95) 100%)',
              clipPath: 'polygon(0 15px, 15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)',
              boxShadow: '0 0 50px rgba(34, 211, 238, 0.3), inset 0 1px 0 rgba(34, 211, 238, 0.2)',
            }}
          >
            {/* Scanning Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan opacity-30" />
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan opacity-20" style={{ animationDelay: '1.5s' }} />
              <div className="w-0.5 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent absolute right-[30%] top-0 animate-scan-vertical opacity-20" />
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
                    <h1 className={`text-xl font-mono text-cyan-300 tracking-widest ${glitchActive ? 'animate-glitch' : ''}`}>
                      AI-2087.NEXUS
                    </h1>
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-3 h-3 text-green-400 animate-pulse" />
                      <span className="text-xs text-green-400 font-mono">QUANTUM_LINK_ACTIVE</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={toggleExpanded} 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors pointer-events-auto"
                  >
                    <BarChart2 className={`w-5 h-5 ${isExpanded ? 'text-cyan-300' : 'text-cyan-500'}`} />
                  </button>
                  <div className="text-right">
                    <div className="text-xs text-cyan-400 font-mono">STATUS</div>
                    <div className="text-xs text-green-400 font-mono animate-pulse">ONLINE</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Neural Interface Display */}
            <div className="p-4 space-y-4">
              <div className={`grid ${isExpanded ? 'grid-cols-2 gap-4' : 'grid-cols-1'}`}>
                <div className="space-y-4">
                  {/* User Input Terminal */}
                  <div className="bg-gray-900/80 border border-green-500/30 p-3 font-mono text-sm rounded-sm">
                    <div className="flex items-center mb-2">
                      <span className="text-green-400">&gt;</span>
                      <span className="text-green-300 ml-2">USER_INPUT:</span>
                    </div>
                    <div className="text-green-200 pl-4 min-h-[60px]">{userInput}</div>
                    <div className="text-green-400 mt-1 animate-pulse">_</div>
                  </div>

                  {/* AI Response Terminal */}
                  <div className="bg-blue-900/30 border border-cyan-500/30 p-3 font-mono text-sm rounded-sm">
                    <div className="flex items-center mb-2">
                      <Cpu className="w-4 h-4 text-cyan-400 animate-spin mr-2" />
                      <span className="text-cyan-400">AI_RESPONSE:</span>
                    </div>
                    <div className="text-cyan-200 pl-6 leading-relaxed min-h-[100px] max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-900 scrollbar-track-gray-800">{assistantResponse}</div>
                  </div>

                  {/* System Metrics */}
                  <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                    <div className="bg-gray-800/50 border border-gray-600/30 p-2 text-center rounded-sm">
                      <div className="text-gray-400">CPU</div>
                      <div className="text-green-400 flex items-center justify-center">
                        <Activity className="w-3 h-3 mr-1 animate-pulse" />
                        <span>87.3%</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-600/30 p-2 text-center rounded-sm">
                      <div className="text-gray-400">MEM</div>
                      <div className="text-blue-400 flex items-center justify-center">
                        <Database className="w-3 h-3 mr-1" />
                        <span>2.1TB</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-600/30 p-2 text-center rounded-sm">
                      <div className="text-gray-400">NET</div>
                      <div className="text-cyan-400 flex items-center justify-center">
                        <Wifi className="w-3 h-3 mr-1" />
                        <span>9.8GB/s</span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 border border-gray-600/30 p-2 text-center rounded-sm">
                      <div className="text-gray-400">SEC</div>
                      <div className="text-purple-400 flex items-center justify-center">
                        <Shield className="w-3 h-3 mr-1" />
                        <span>MAX</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="space-y-4">
                    {/* System Logs */}
                    <div className="bg-gray-900/80 border border-blue-500/30 p-3 font-mono text-sm rounded-sm">
                      <div className="flex items-center mb-2">
                        <span className="text-blue-400">SYSTEM_LOGS:</span>
                      </div>
                      <div className="text-blue-200 pl-2 text-xs space-y-1 h-[230px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-gray-800 pr-2">
                        {systemLogs.map((log, index) => (
                          <div key={index} className="flex items-center">
                            <span className="text-blue-500 mr-2">[{String(index).padStart(2, '0')}]</span>
                            <span>{log}</span>
                          </div>
                        ))}
                        <div ref={logsEndRef} />
                      </div>
                    </div>
                    
                    {/* Quantum Metrics */}
                    <div className="bg-gray-900/80 border border-purple-500/30 p-3 font-mono text-sm rounded-sm">
                      <div className="flex items-center mb-2">
                        <span className="text-purple-400">QUANTUM_METRICS:</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-800/50 border border-gray-600/30 p-2 rounded-sm">
                          <div className="text-xs text-gray-400">ENTANGLEMENT</div>
                          <div className="h-2 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" style={{ width: '87%' }}></div>
                          </div>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-600/30 p-2 rounded-sm">
                          <div className="text-xs text-gray-400">COHERENCE</div>
                          <div className="h-2 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-600/30 p-2 rounded-sm">
                          <div className="text-xs text-gray-400">DIMENSIONAL</div>
                          <div className="h-2 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" style={{ width: '63%' }}></div>
                          </div>
                        </div>
                        <div className="bg-gray-800/50 border border-gray-600/30 p-2 rounded-sm">
                          <div className="text-xs text-gray-400">TEMPORAL</div>
                          <div className="h-2 bg-gray-700 mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Neural Interface Control */}
            <div className="p-4 border-t border-cyan-500/30">
              <div className="text-center mb-4">
                <div className="text-xs text-cyan-400 font-mono mb-2">NEURAL INTERFACE</div>
                <div className="relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-75 blur-sm"></div>
                  <Listen
                    isListening={isListening}
                    isProcessing={isProcessing}
                    setUserInput={setUserInput}
                    setIsListening={setIsListening}
                    setIsProcessing={setIsProcessing}
                    setAssistantResponse={setAssistantResponse}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-6 text-xs font-mono">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-1 ${isListening ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`} />
                  <span className="text-gray-400">LISTENING</span>
                </div>
                <div className="flex items-center">
                  <Zap className="w-3 h-3 text-yellow-400 mr-1" />
                  <span className="text-gray-400">PROCESSING</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-1 bg-purple-400 animate-ping opacity-75`} 
                       style={{ animationDuration: '3s' }} />
                  <span className="text-gray-400">QUANTUM</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="bg-gray-900/50 border-t border-cyan-500/20 p-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-gray-500">UPTIME: 847.2 CYCLES</span>
                <span className="text-gray-500">VERSION: 2087.12.ALPHA</span>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></div>
                  <span className="text-cyan-400">READY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default FuturisticAI;