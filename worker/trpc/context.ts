import type { ExecutionContext } from '@cloudflare/workers-types';

export interface Env {
  // Add your environment variables here
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
  return {
    req,
    env,
    workerCtx,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
