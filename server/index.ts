import express from "express";
import { handlePing } from "./routes/ping";

export function createServer() {
  const app = express();

  // Add your API routes here
  app.get("/api/ping", handlePing);

  return app;
} 