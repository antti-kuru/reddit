import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
// importing database client
import postgres from "postgres";

import * as communityController from "./controllers/communityController.js"


const app = new Hono();
// creating an instance of the database client
const sql = postgres();

app.use("/*", cors());
app.use("/*", logger());

// POST community
app.post("/api/communities", communityController.create)

// GET communities
app.get("/api/communities", communityController.readAll)

// GET community
app.get("/api/communities/:communityId", communityController.readOne)

// DELETE community
app.delete("/api/communities/:communityId", communityController.deleteOne)


export default app;