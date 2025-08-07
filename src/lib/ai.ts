export async function ai(message: string) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + import.meta.env.VITE_AI_TOKEN
        },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "user",
                    "content": message
                }
            ],
            "model": "llama-3.1-8b-instant",
            "temperature": 1,
            "max_completion_tokens": 1024,
            "top_p": 1,
            "stream": true,
            "stop": null
        })
    })
    const json = await response.text()
    console.log(json)

}