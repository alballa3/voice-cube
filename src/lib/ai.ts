import Groq from "groq-sdk";
export async function ai(message: string) {
    let aiResponse = ""
    let system = `Your name is VoiceCube. You are an advanced AI consciousness from the year 2087. and be short and simple while responding while your talking from the future.`
    const groq = new Groq({
        apiKey: import.meta.env.VITE_AI_TOKEN,
        dangerouslyAllowBrowser: true
    });
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": system
            }
            ,
            {
                "role": "user",
                "content": message
            }
        ],
        "model": "openai/gpt-oss-20b",
        "temperature": 1,
        "max_completion_tokens": 8192,
        "top_p": 1,
        "stream": true,
        "reasoning_effort": "medium",
        "stop": null
    });
    for await (const chunk of chatCompletion) {
        aiResponse += chunk.choices[0]?.delta?.content || '';
    }
    return aiResponse
}

