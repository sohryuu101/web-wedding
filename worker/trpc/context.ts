import type { ExecutionContext } from '@cloudflare/workers-types';
import { verifyJWT, extractTokenFromHeader, type JWTPayload } from '../lib/auth';

// Use the global Env interface from worker-configuration.d.ts
declare global {
  interface Env {
    WEDDING_IMAGES: any;
    DB: any;
  }
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
