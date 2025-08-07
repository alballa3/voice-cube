import { Command } from "@tauri-apps/plugin-shell";
import { startRecording, stopRecording } from "tauri-plugin-mic-recorder-api";
import { ai } from "../lib/ai";
import { Mic, MicOff } from "lucide-react";
interface RecordProps {
    isListening: boolean;
    isProcessing: boolean;
    setUserInput: (input: string) => void;
    setIsListening: (isListening: boolean) => void;
}


export const Listen = ({ isListening, isProcessing, setUserInput, setIsListening }: RecordProps) => {
    const handleClick = async () => {
        if (isListening) {
            const save = await stopRecording()

            const command = Command.create("run-python-whisper", ["transcribe.py", save]);
            const output = await command.execute();
            const text = output.stdout
            setUserInput(text)
            console.log(save, output);
            await ai(text)
            setIsListening(false);
        } else {
            await startRecording()
            setIsListening(true);
        }
    };

    return (
        <div className="relative">
            {/* Central Neural Core */}
            <button
                onClick={handleClick}
                disabled={isProcessing}
                className="relative w-20 h-20 mx-auto flex items-center justify-center group"
            >
                {/* Outer Ring */}
                <div className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${isListening
                    ? "border-cyan-400 animate-spin shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                    : "border-blue-500/30 group-hover:border-blue-400/60"
                    }`} />

                {/* Middle Ring */}
                <div className={`absolute inset-2 rounded-full border transition-all duration-700 ${isListening
                    ? "border-cyan-300 animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                    : "border-blue-400/20 group-hover:border-blue-300/40"
                    }`} />

                {/* Core */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isListening
                    ? "bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_25px_rgba(34,211,238,0.8)]"
                    : "bg-gradient-to-br from-blue-600 to-purple-700 group-hover:from-blue-500 group-hover:to-purple-600"
                    }`}>
                    {isListening ? (
                        <Mic className="w-6 h-6 text-white animate-pulse" />
                    ) : (
                        <MicOff className="w-6 h-6 text-white" />
                    )}
                </div>

                {/* Energy Particles */}
                {isListening && (
                    <div className="absolute inset-0">
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                                style={{
                                    left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 8)}%`,
                                    top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 8)}%`,
                                    animationDelay: `${i * 0.1}s`,
                                }}
                            />
                        ))}
                    </div>
                )}
            </button>
        </div>
    );
};