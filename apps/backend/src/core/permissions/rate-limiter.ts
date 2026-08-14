import { createMiddleware } from 'hono/factory';
const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

export const rateLimiter = (limit: number, windowMinutes: number) => {
    return createMiddleware(async (c, next) => {
        const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || c.req.header('cf-connecting-ip') || 'unknown ip';
        const currentTime = Date.now();
        const windosMs = windowMinutes * 60 * 1000;

        const rateLimitData = rateLimitCache.get(ip);
        // Check if the IP has made requests before
        if (rateLimitData) {
            // If the reset time has passed, reset the count and update the reset time
            if (currentTime > rateLimitData.resetTime) {
                // Reset the count and update the reset time
                rateLimitCache.set(ip, { count: 1, resetTime: currentTime + windosMs });
            }
            // If the count exceeds the limit, return a 429 response
            else if (rateLimitData.count >= limit) {
                // Calculate the remaining time until the limit resets
                const lessTime = Math.ceil((rateLimitData.resetTime - currentTime) / 60000);
                return c.json({ message: 'Too many requests. Please try again later. after ' + lessTime + ' minutes.' }, 429);
            } else {
                // Increment the count for this IP
                rateLimitData.count++;
            }
        } else {
            // First request from this IP, initialize the count and reset time
            rateLimitCache.set(ip, { count: 1, resetTime: currentTime + windosMs });
        }
        // Proceed to the next middleware or route handler
        await next();

        // Reset the count if the request was successful (status code 200)
        if (c.res.status === 200) {
            rateLimitCache.delete(ip);
        }
    });
}
