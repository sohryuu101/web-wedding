import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoutes } from "./routes/auth";
import { invitationRoutes } from "./routes/invitations";
import { publicRoutes } from "./routes/public";
import { uploadRoutes } from "./routes/upload";
import { imageRoutes } from "./routes/images";
import { testR2Routes } from "./routes/test-r2";

export const app = new Hono<{ Bindings: Env }>();

// Add CORS middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.get("/api/", (c) => {
  return c.json({
    name: "Wedding Invitation API",
    version: "1.0.0",
    endpoints: [
      "POST /api/auth/register - Register new user",
      "POST /api/auth/login - Login user",
      "GET /api/auth/me - Get current user",
      "GET /api/invitations - Get user invitations",
      "POST /api/invitations - Create invitation",
      "GET /api/invitations/:id - Get invitation",
      "PUT /api/invitations/:id - Update invitation",
      "DELETE /api/invitations/:id - Delete invitation",
      "POST /api/invitations/:id/publish - Toggle publish status",
      "GET /api/invitation/:slug - Get public invitation",
      "POST /api/invitation/:slug/view - Track view",
      "POST /api/invitation/:slug/rsvp - Submit RSVP",
      "GET /api/invitation/:slug/rsvps - Get RSVP responses"
    ]
  });
});

// Mount auth routes
app.route("/api/auth", authRoutes);

// Mount invitation routes (protected)
app.route("/api/invitations", invitationRoutes);

// Mount upload routes (protected)
app.route("/api/upload", uploadRoutes);

// Mount image proxy routes
app.route("/api/images", imageRoutes);

// Mount test routes
app.route("/api/test", testR2Routes);

// Mount public routes
app.route("/api", publicRoutes);
