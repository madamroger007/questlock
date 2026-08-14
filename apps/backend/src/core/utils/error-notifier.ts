import { env } from '@/config/index.js'; // Sesuaikan path config env Anda

export const sendErrorToDiscord = async (err: any, requestUrl: string) => {
    const webhookUrl = env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) return;

    const message = `
🚨 **CRITICAL ERROR ALERT [QUESTLOCK]** 🚨
**Waktu:** \`${new Date().toISOString()}\`
**Endpoint:** \`${requestUrl}\`

**Error Message:** \`\`\`text
${err.message}
\`\`\`

**Stack Trace:**
\`\`\`javascript
${err.stack ? err.stack.substring(0, 1000) : 'No stack trace available.'} 
\`\`\`
    `;

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: message,
                username: "QuestLock Crash Reporter",
            }),
        });
    } catch (fetchError) {
        console.error('Failed to send alert to Discord:', fetchError);
    }
};