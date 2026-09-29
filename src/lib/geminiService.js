// Must match MAX_HISTORY_TURNS / MAX_MESSAGE_LENGTH in api/chat.js, which rejects anything larger.
const MAX_HISTORY_ENTRIES = 8;
const MAX_PART_LENGTH = 2000;

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

        // Entries are added in user/model pairs, so an even-sized tail always starts with a user turn, as Gemini requires.
        localHistory = [
            ...localHistory,
            { role: "user", parts: [{ text: userMessage.slice(0, MAX_PART_LENGTH) }] },
            { role: "model", parts: [{ text: String(data.text ?? "").slice(0, MAX_PART_LENGTH) }] },
        ].slice(-MAX_HISTORY_ENTRIES);

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
