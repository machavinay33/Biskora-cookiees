import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./context";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import { seedAdminUser } from "./seed";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "../../dist/public")));

// tRPC middleware
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Seed admin user on startup (for development/initial deployment)
seedAdminUser();

// All other requests return the SPA's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
