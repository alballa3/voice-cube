import { Command } from "@tauri-apps/plugin-shell";
import { startRecording, stopRecording } from "tauri-plugin-mic-recorder-api";
import { ai } from "../lib/ai";
import { Mic, MicOff, Brain, AlertCircle, Zap } from "lucide-react";
import React, { useState } from "react";

interface RecordProps {
    isListening: boolean;
    isProcessing: boolean;
    setUserInput: (input: string) => void;
    setIsListening: (isListening: boolean) => void;
    setIsProcessing: (isProcessing: boolean) => void;
    setAssistantResponse?: (response: string) => void;
}

export const Listen = ({
    isListening,
    isProcessing,
    setUserInput,
    setIsListening,
    setIsProcessing,
    setAssistantResponse
}: RecordProps) => {
    const [error, setError] = useState<string | null>(null);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);

    // Recording timer effect
    React.useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isListening) {
            interval = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);
        } else {
            setRecordingDuration(0);
        }
        return () => clearInterval(interval);
    }, [isListening]);

    const handleClick = async () => {
        try {
            setError(null);

            if (!isListening && !isProcessing) {
                // Start recording phase
                console.log("🎙️ Initiating neural link...");
                setUserInput("◊ NEURAL LINK ESTABLISHED ◊");
                setIsListening(true);

                await startRecording();
                console.log("✅ Recording started successfully");

            } else if (isListening) {
                // Stop recording and process
                console.log("🛑 Stopping recording...");
                setIsListening(false);
                setIsProcessing(true);
                setIsTranscribing(true);
                setUserInput("◊ QUANTUM PROCESSING... ◊");

                try {
                    // Stop recording and get file path
                    const audioFilePath = await stopRecording();
                    console.log(`📁 Audio saved to: ${audioFilePath}`);

                    // Transcribe audio
                    setUserInput("◊ NEURAL PATTERN ANALYSIS... ◊");
                    const transcribeCommand = Command.create("run-python-whisper", [
                        "transcribe.py",
                        audioFilePath
                    ]);

                    const transcriptionOutput = await transcribeCommand.execute();

                    if (transcriptionOutput.code !== 0) {
                        throw new Error(`Transcription failed: ${transcriptionOutput.stderr}`);
                    }

                    const transcribedText = transcriptionOutput.stdout.trim();
                    console.log(`🎯 Transcription: "${transcribedText}"`);

                    if (!transcribedText || transcribedText.length < 2) {
                        throw new Error("No speech detected or transcription too short");
                    }

                    setUserInput(`◊ NEURAL PATHWAY: ${transcribedText} ◊`);
                    setIsTranscribing(false);

                    // Process with AI
                    setUserInput(`◊ CONSCIOUSNESS SYNC: ${transcribedText} ◊`);
                    console.log("🤖 Sending to AI...");

                    const aiResponse = await ai(transcribedText);

                    console.log(`🧠 AI Response received: ${aiResponse}...`);

                    if (setAssistantResponse && aiResponse) {
                        setAssistantResponse(`◊ ${aiResponse} ◊`);
                    }

                } catch (processError) {
                    console.error("❌ Processing error:", processError);
                    const errorMessage = processError instanceof Error ? processError.message : "Unknown processing error";
                    setError(errorMessage);
                    setUserInput(`◊ ERROR: ${errorMessage} ◊`);
                } finally {
                    setIsTranscribing(false);
                    setIsProcessing(false);
                }
            }

        } catch (recordingError) {
            console.error("❌ Recording error:", recordingError);
            const errorMessage = recordingError instanceof Error ? recordingError.message : "Recording failed";
            setError(errorMessage);
            setUserInput(`◊ NEURAL LINK ERROR: ${errorMessage} ◊`);
            setIsListening(false);
            setIsProcessing(false);
            setIsTranscribing(false);
        }
    };

    // Get current state for visual feedback
    const getCurrentState = () => {
        if (error) return 'error';
        if (isTranscribing) return 'transcribing';
        if (isProcessing) return 'processing';
        if (isListening) return 'listening';
        return 'ready';
    };

    const getStateConfig = () => {
        const state = getCurrentState();
        switch (state) {
            case 'error':
                return {
                    color: 'red',
                    icon: AlertCircle,
                    gradient: 'from-red-500 to-orange-600',
                    borderColor: 'border-red-400',
                    shadowColor: 'rgba(239, 68, 68, 0.6)',
                    pulseColor: 'bg-red-400'
                };
            case 'transcribing':
                return {
                    color: 'yellow',
                    icon: Brain,
                    gradient: 'from-yellow-400 to-orange-500',
                    borderColor: 'border-yellow-400',
                    shadowColor: 'rgba(251, 191, 36, 0.6)',
                    pulseColor: 'bg-yellow-400'
                };
            case 'processing':
                return {
                    color: 'purple',
                    icon: Zap,
                    gradient: 'from-purple-500 to-pink-600',
                    borderColor: 'border-purple-400',
                    shadowColor: 'rgba(147, 51, 234, 0.6)',
                    pulseColor: 'bg-purple-400'
                };
            case 'listening':
                return {
                    color: 'cyan',
                    icon: Mic,
                    gradient: 'from-cyan-400 to-blue-500',
                    borderColor: 'border-cyan-400',
                    shadowColor: 'rgba(34, 211, 238, 0.6)',
                    pulseColor: 'bg-cyan-400'
                };
            default:
                return {
                    color: 'blue',
                    icon: MicOff,
                    gradient: 'from-blue-600 to-purple-700',
                    borderColor: 'border-blue-500/30',
                    shadowColor: 'rgba(59, 130, 246, 0.3)',
                    pulseColor: 'bg-blue-400'
                };
        }
    };

    const stateConfig = getStateConfig();
    const IconComponent = stateConfig.icon;
    const isActive = isListening || isProcessing || isTranscribing;

    return (
        <div className="relative">
            {/* Recording Duration Display */}
            {isListening && recordingDuration > 0 && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-cyan-400 animate-pulse">
                    ◊ {Math.floor(recordingDuration / 60)}:{(recordingDuration % 60).toString().padStart(2, '0')} ◊
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs font-mono text-red-400 text-center max-w-48">
                    ⚠️ {error}
                </div>
            )}

            {/* Central Neural Core */}
            <button
                onClick={handleClick}
                disabled={isProcessing && !isListening}
                className="relative w-20 h-20 mx-auto flex items-center justify-center group transition-all duration-300 hover:scale-105 active:scale-95"
                aria-label={`Voice recording ${getCurrentState()}`}
            >
                {/* Quantum Field Rings */}
                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${isActive
                    ? `${stateConfig.borderColor} animate-spin shadow-[0_0_30px_${stateConfig.shadowColor}]`
                    : "border-blue-500/30 group-hover:border-blue-400/60"
                    }`} />

                <div className={`absolute inset-2 rounded-full border transition-all duration-700 ${isActive
                    ? `${stateConfig.borderColor.replace('400', '300')} animate-pulse shadow-[0_0_20px_${stateConfig.shadowColor}]`
                    : "border-blue-400/20 group-hover:border-blue-300/40"
                    }`} />

                {/* Neural Core */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 bg-gradient-to-br ${isActive
                    ? `${stateConfig.gradient} shadow-[0_0_25px_${stateConfig.shadowColor}]`
                    : "from-blue-600 to-purple-700 group-hover:from-blue-500 group-hover:to-purple-600"
                    }`}>
                    <IconComponent className={`w-6 h-6 text-white ${isActive ? 'animate-pulse' : ''}`} />
                </div>

                {/* Energy Particles */}
                {isActive && (
                    <div className="absolute inset-0">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className={`absolute w-1 h-1 ${stateConfig.pulseColor} rounded-full animate-ping`}
                                style={{
                                    left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 12)}%`,
                                    top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 12)}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    filter: 'drop-shadow(0 0 4px currentColor)',
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Quantum Resonance Waves */}
                {isActive && (
                    <div className="absolute inset-0 pointer-events-none">
                        <div className={`absolute inset-0 border-2 ${stateConfig.borderColor} rounded-full animate-ping opacity-60`} />
                        <div className={`absolute inset-0 border ${stateConfig.borderColor.replace('400', '300')} rounded-full animate-ping opacity-40`}
                            style={{ animationDelay: '0.5s' }} />
                        <div className={`absolute inset-0 border ${stateConfig.borderColor.replace('400', '200')} rounded-full animate-ping opacity-20`}
                            style={{ animationDelay: '1s' }} />
                    </div>
                )}

                {/* Processing Spinner */}
                {(isProcessing || isTranscribing) && !isListening && (
                    <div className="absolute inset-4 border-2 border-transparent border-t-white rounded-full animate-spin" />
                )}
            </button>

            {/* Status Indicator */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-mono text-center">
                <div className={`${error ? 'text-red-400' :
                    isTranscribing ? 'text-yellow-400' :
                        isProcessing ? 'text-purple-400' :
                            isListening ? 'text-cyan-400' : 'text-gray-400'
                    } animate-pulse`}>
                    {error ? '⚠️ ERROR' :
                        isTranscribing ? '🧠 ANALYZING' :
                            isProcessing ? '⚡ PROCESSING' :
                                isListening ? '🎙️ LISTENING' : '◊ READY ◊'}
                </div>
            </div>
        </div>
    );
};