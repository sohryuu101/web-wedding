import { createMiddleware } from 'hono/factory';
import { verifyJWT, extractTokenFromHeader, type JWTPayload } from './auth';

export type AuthContext = {
  Variables: {
    user: JWTPayload;
  };
};

export const authMiddleware = createMiddleware<{ Bindings: Env } & AuthContext>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  const token = extractTokenFromHeader(authHeader);
  const payload = await verifyJWT(token);

  if (!payload) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Add user to context
  c.set('user', payload);
  await next();
}); 