import type { ExecutionContext, D1Database } from '@cloudflare/workers-types';
import { verifyJWT, extractTokenFromHeader, type JWTPayload } from '../lib/auth';

export interface Env {
  DB: D1Database;
  JWT_SECRET?: string;
}

export async function createContext({
  req,
  env,
  workerCtx,
}: {
  req: Request;
  env: Env;
  workerCtx: ExecutionContext;
}) {
  // Extract and verify JWT token from request
  const authHeader = req.headers.get('Authorization');
  const token = extractTokenFromHeader(authHeader);
  let user: JWTPayload | null = null;

  if (token) {
    user = await verifyJWT(token);
  }

  return {
    req,
    env,
    workerCtx,
    db: env.DB,
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
