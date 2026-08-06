import { Hono } from "hono";

export const testRoutes = new Hono();

// Test Endpoint
testRoutes.get("/", (c) => {
  return c.json({ success: true, message: "Test endpoint is working!" }, 200);
});