let localHistory = [];

export async function sendMessage(userMessage) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                history: localHistory,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update local history with Gemini's required format
        localHistory.push({ role: "user", parts: [{ text: userMessage }] });
        localHistory.push({ role: "model", parts: [{ text: data.text }] });

        return { success: true, text: data.text };
    } catch (error) {
        console.error("API Route Error:", error);
        return {
            success: false,
            text: "Oops! I'm having trouble connecting right now. Please try again in a moment. 😅",
        };
    }
}

export function resetChat() {
    localHistory = [];
}
