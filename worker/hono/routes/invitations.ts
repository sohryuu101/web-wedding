import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { authMiddleware, type AuthContext } from '../../lib/middleware';
import { generateSlug } from '../../lib/auth';

const invitationRoutes = new Hono<{ Bindings: Env } & AuthContext>();

// Schema for creating/updating invitations
const createInvitationSchema = z.object({
  bride_name: z.string().min(1),
  groom_name: z.string().min(1),
  wedding_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format"
  }),
  venue: z.string().optional(),
  main_title: z.string().optional(),
  subtitle: z.string().optional(),
  message: z.string().optional(),
  theme: z.string().optional(),
  custom_slug: z.string().optional(),
});

const updateInvitationSchema = z.object({
  bride_name: z.string().min(1).optional(),
  groom_name: z.string().min(1).optional(),
  wedding_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format"
  }).optional(),
  venue: z.string().optional(),
  main_title: z.string().optional(),
  subtitle: z.string().optional(),
  message: z.string().optional(),
  theme: z.string().optional(),
  cover_image: z.string().optional(),
  is_published: z.boolean().optional(),
});

// Get user's invitation (only one per user)
invitationRoutes.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const db = c.env.DB;

    const invitation = await db.prepare(`
      SELECT id, slug, bride_name, groom_name, wedding_date, venue, 
             main_title, subtitle, message, theme, cover_image, 
             is_published, views, rsvps, created_at, updated_at
      FROM invitations 
      WHERE user_id = ?
    `).bind(user.userId).first();

    return c.json({ 
      invitation: invitation || null,
      hasInvitation: !!invitation 
    });
  } catch (error) {
    console.error('Get invitation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Create new invitation (only if user doesn't have one)
invitationRoutes.post('/', authMiddleware, zValidator('json', createInvitationSchema), async (c) => {
  try {
    const user = c.get('user');
    const data = c.req.valid('json');
    const db = c.env.DB;

    // Check if user already has an invitation
    const existingInvitation = await db.prepare(
      'SELECT id FROM invitations WHERE user_id = ?'
    ).bind(user.userId).first();

    if (existingInvitation) {
      return c.json({ error: 'You already have an invitation. You can only create one invitation per account.' }, 400);
    }

    // Generate or use custom slug
    let slug = data.custom_slug || generateSlug(data.bride_name, data.groom_name);
    
    // Ensure slug uniqueness
    let slugExists = await db.prepare('SELECT id FROM invitations WHERE slug = ?').bind(slug).first();
    let counter = 1;
    const originalSlug = slug;
    
    while (slugExists) {
      slug = `${originalSlug}-${counter}`;
      slugExists = await db.prepare('SELECT id FROM invitations WHERE slug = ?').bind(slug).first();
      counter++;
    }

    // Create invitation
    const result = await db.prepare(`
      INSERT INTO invitations (
        user_id, slug, bride_name, groom_name, wedding_date, venue,
        main_title, subtitle, message, theme, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, slug, bride_name, groom_name, wedding_date, venue,
               main_title, subtitle, message, theme, is_published, views, rsvps,
               created_at, updated_at
    `).bind(
      user.userId,
      slug,
      data.bride_name,
      data.groom_name,
      data.wedding_date,
      data.venue || null,
      data.main_title || 'Save The Date',
      data.subtitle || 'We\'re Getting Married!',
      data.message || 'Join us for our special day...',
      data.theme || 'Rose Garden'
    ).first();

    if (!result) {
      return c.json({ error: 'Failed to create invitation' }, 500);
    }

    return c.json({ invitation: result }, 201);
  } catch (error) {
    console.error('Create invitation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Update user's invitation
invitationRoutes.put('/', authMiddleware, zValidator('json', updateInvitationSchema), async (c) => {
  try {
    const user = c.get('user');
    const data = c.req.valid('json');
    const db = c.env.DB;

    // Build update query dynamically based on provided fields
    const updates: string[] = [];
    const values: any[] = [];
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      return c.json({ error: 'No fields to update' }, 400);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(user.userId);

    const result = await db.prepare(`
      UPDATE invitations 
      SET ${updates.join(', ')}
      WHERE user_id = ?
      RETURNING id, slug, bride_name, groom_name, wedding_date, venue,
               main_title, subtitle, message, theme, cover_image, 
               is_published, views, rsvps, created_at, updated_at
    `).bind(...values).first();

    if (!result) {
      return c.json({ error: 'Invitation not found' }, 404);
    }

    return c.json({ invitation: result });
  } catch (error) {
    console.error('Update invitation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Delete user's invitation
invitationRoutes.delete('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const db = c.env.DB;

    // Get invitation ID first
    const invitation = await db.prepare(
      'SELECT id FROM invitations WHERE user_id = ?'
    ).bind(user.userId).first();

    if (!invitation) {
      return c.json({ error: 'Invitation not found' }, 404);
    }

    // Delete related RSVP responses first
    await db.prepare('DELETE FROM rsvp_responses WHERE invitation_id = ?').bind(invitation.id).run();
    
    // Delete invitation
    await db.prepare('DELETE FROM invitations WHERE user_id = ?').bind(user.userId).run();

    return c.json({ message: 'Invitation deleted successfully' });
  } catch (error) {
    console.error('Delete invitation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Publish/unpublish user's invitation
invitationRoutes.post('/publish', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const db = c.env.DB;

    // Toggle published status
    const result = await db.prepare(`
      UPDATE invitations 
      SET is_published = NOT is_published, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
      RETURNING is_published
    `).bind(user.userId).first();

    if (!result) {
      return c.json({ error: 'Invitation not found' }, 404);
    }

    return c.json({ 
      message: result.is_published ? 'Invitation published' : 'Invitation unpublished',
      is_published: result.is_published 
    });
  } catch (error) {
    console.error('Publish invitation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { invitationRoutes }; 