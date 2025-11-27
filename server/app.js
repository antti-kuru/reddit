import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";

import * as communityController from "./controllers/communityController.js"
import * as postController from "./controllers/postController.js"
import * as commentController from "./controllers/commentController.js"
import * as authController from "./controllers/authController.js"

import * as middlewares from "./middlewares.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());


// Register user
app.post("/api/auth/register", authController.register);

// Login
app.post("/api/auth/login", authController.login);


// POST community
app.post("/api/communities", middlewares.authenticate, communityController.create)

// GET communities
app.get("/api/communities", communityController.readAll)

// GET community
app.get("/api/communities/:communityId", communityController.readOne)

// DELETE community
app.delete("/api/communities/:communityId", middlewares.authenticate, communityController.deleteOne)

// POST post
app.post("/api/communities/:communityId/posts", postController.create)

// GET posts
app.get("/api/communities/:communityId/posts", postController.readAll)

// GET post
app.get("/api/communities/:communityId/posts/:postId", postController.readOne)

// DELETE post
app.delete("/api/communities/:communityId/posts/:postId", postController.deleteOne)

// POST comment
app.post("/api/communities/:communityId/posts/:postId/comments", commentController.create)

// GET comments
app.get("/api/communities/:communityId/posts/:postId/comments", commentController.readAll)

// DELETE comment
app.delete("/api/communities/:communityId/posts/:postId/comments/:commentId", commentController.deleteOne)


export default app;