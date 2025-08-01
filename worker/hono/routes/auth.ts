import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { hashPassword, comparePassword, signJWT, verifyJWT, extractTokenFromHeader } from '../../lib/auth';

const authRoutes = new Hono<{ Bindings: Env }>();

// Register route
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

authRoutes.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, name } = c.req.valid('json');
  
  try {
    const db = c.env.DB;
    
    // Check if user already exists
    const existingUser = await db.prepare(
      'SELECT id FROM users WHERE email = ?'
    ).bind(email).first();
    
    if (existingUser) {
      return c.json({ error: 'User already exists' }, 400);
    }
    
    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const result = await db.prepare(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?) RETURNING id, email, name, created_at'
    ).bind(email, hashedPassword, name).first();
    
    if (!result) {
      return c.json({ error: 'Failed to create user' }, 500);
    }
    
    // Generate JWT token
    const token = await signJWT({
      userId: result.id as number,
      email: result.email as string,
      name: result.name as string,
    });
    
    return c.json({
      user: {
        id: result.id,
        email: result.email,
        name: result.name,
        created_at: result.created_at,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Login route
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  
  try {
    const db = c.env.DB;
    
    // Find user by email
    const user = await db.prepare(
      'SELECT id, email, name, password, created_at FROM users WHERE email = ?'
    ).bind(email).first();
    
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    // Verify password
    const isValidPassword = await comparePassword(password, user.password as string);
    if (!isValidPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    // Generate JWT token
    const token = await signJWT({
      userId: user.id as number,
      email: user.email as string,
      name: user.name as string,
    });
    
    return c.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get current user route (protected)
authRoutes.get('/me', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const token = extractTokenFromHeader(authHeader);
    const payload = await verifyJWT(token);
    
    if (!payload) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const db = c.env.DB;
    const user = await db.prepare(
      'SELECT id, email, name, created_at FROM users WHERE id = ?'
    ).bind(payload.userId).first();
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    return c.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Logout route (client-side token removal, but we can track server-side if needed)
authRoutes.post('/logout', async (c) => {
  return c.json({ message: 'Logged out successfully' });
});

export { authRoutes }; 