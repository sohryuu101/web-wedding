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
  // Couple profile fields
  bride_photo: z.string().optional(),
  groom_photo: z.string().optional(),
  bride_parents: z.object({
    father: z.string(),
    mother: z.string()
  }).optional(),
  groom_parents: z.object({
    father: z.string(),
    mother: z.string()
  }).optional(),
  bride_social_media: z.object({
    instagram: z.string().optional()
  }).optional(),
  groom_social_media: z.object({
    instagram: z.string().optional()
  }).optional(),
  bride_birth_order: z.enum(['first', 'second', 'third', 'fourth', 'fifth']).optional(),
  groom_birth_order: z.enum(['first', 'second', 'third', 'fourth', 'fifth']).optional(),
  bride_description: z.string().optional(),
  groom_description: z.string().optional(),
  cover_video: z.string().optional(),
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
  // Couple profile fields
  bride_photo: z.string().optional(),
  groom_photo: z.string().optional(),
  bride_parents: z.object({
    father: z.string(),
    mother: z.string()
  }).optional(),
  groom_parents: z.object({
    father: z.string(),
    mother: z.string()
  }).optional(),
  bride_social_media: z.object({
    instagram: z.string().optional()
  }).optional(),
  groom_social_media: z.object({
    instagram: z.string().optional()
  }).optional(),
  bride_birth_order: z.enum(['first', 'second', 'third', 'fourth', 'fifth']).optional(),
  groom_birth_order: z.enum(['first', 'second', 'third', 'fourth', 'fifth']).optional(),
  bride_description: z.string().optional(),
  groom_description: z.string().optional(),
  cover_video: z.string().optional(),
});

// Get user's invitation (only one per user)
invitationRoutes.get('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const db = c.env.DB;

    const invitation = await db.prepare(`
      SELECT id, slug, bride_name, groom_name, wedding_date, venue, 
             main_title, subtitle, message, theme, cover_image,
             bride_photo, groom_photo, bride_parents_father, bride_parents_mother,
             groom_parents_father, groom_parents_mother, bride_social_media_instagram,
             groom_social_media_instagram, bride_birth_order, groom_birth_order,
             bride_description, groom_description, cover_video,
             is_published, views, rsvps, created_at, updated_at
      FROM invitations 
      WHERE user_id = ?
    `).bind(user.userId).first();

    // Transform the flat database structure to nested objects for the frontend
    if (invitation) {
      invitation.bride_parents = {
        father: invitation.bride_parents_father || '',
        mother: invitation.bride_parents_mother || ''
      };
      invitation.groom_parents = {
        father: invitation.groom_parents_father || '',
        mother: invitation.groom_parents_mother || ''
      };
      invitation.bride_social_media = {
        instagram: invitation.bride_social_media_instagram || ''
      };
      invitation.groom_social_media = {
        instagram: invitation.groom_social_media_instagram || ''
      };
      
      // Remove the flat fields
      delete invitation.bride_parents_father;
      delete invitation.bride_parents_mother;
      delete invitation.groom_parents_father;
      delete invitation.groom_parents_mother;
      delete invitation.bride_social_media_instagram;
      delete invitation.groom_social_media_instagram;
    }

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
        cover_image, main_title, subtitle, message, theme, is_published, views, rsvps,
        bride_photo, groom_photo, bride_parents_father, bride_parents_mother,
        groom_parents_father, groom_parents_mother, bride_social_media_instagram,
        groom_social_media_instagram, bride_birth_order, groom_birth_order,
        bride_description, groom_description, cover_video,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, slug, bride_name, groom_name, wedding_date, venue,
               main_title, subtitle, message, theme, 
               bride_photo, groom_photo, bride_parents_father, bride_parents_mother,
               groom_parents_father, groom_parents_mother, bride_social_media_instagram,
               groom_social_media_instagram, bride_birth_order, groom_birth_order,
               bride_description, groom_description, cover_video,
               is_published, views, rsvps, created_at, updated_at
    `).bind(
      user.userId,
      slug,
      data.bride_name,
      data.groom_name,
      data.wedding_date,
      data.venue || null,
      null, // cover_image
      data.main_title || 'Save The Date',
      data.subtitle || 'We\'re Getting Married!',
      data.message || 'Join us for our special day...',
      data.theme || 'Rose Garden',
      false, // is_published
      0, // views
      0, // rsvps
      data.bride_photo || null,
      data.groom_photo || null,
      data.bride_parents?.father || null,
      data.bride_parents?.mother || null,
      data.groom_parents?.father || null,
      data.groom_parents?.mother || null,
      data.bride_social_media?.instagram || null,
      data.groom_social_media?.instagram || null,
      data.bride_birth_order || 'first',
      data.groom_birth_order || 'first',
      data.bride_description || null,
      data.groom_description || null,
      data.cover_video || null
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
    
    // Handle basic fields
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && !['bride_parents', 'groom_parents', 'bride_social_media', 'groom_social_media'].includes(key)) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    // Handle nested fields
    if (data.bride_parents) {
      if (data.bride_parents.father !== undefined) {
        updates.push('bride_parents_father = ?');
        values.push(data.bride_parents.father);
      }
      if (data.bride_parents.mother !== undefined) {
        updates.push('bride_parents_mother = ?');
        values.push(data.bride_parents.mother);
      }
    }

    if (data.groom_parents) {
      if (data.groom_parents.father !== undefined) {
        updates.push('groom_parents_father = ?');
        values.push(data.groom_parents.father);
      }
      if (data.groom_parents.mother !== undefined) {
        updates.push('groom_parents_mother = ?');
        values.push(data.groom_parents.mother);
      }
    }

    if (data.bride_social_media) {
      if (data.bride_social_media.instagram !== undefined) {
        updates.push('bride_social_media_instagram = ?');
        values.push(data.bride_social_media.instagram);
      }
    }

    if (data.groom_social_media) {
      if (data.groom_social_media.instagram !== undefined) {
        updates.push('groom_social_media_instagram = ?');
        values.push(data.groom_social_media.instagram);
      }
    }

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
               bride_photo, groom_photo, bride_parents_father, bride_parents_mother,
               groom_parents_father, groom_parents_mother, bride_social_media_instagram,
               groom_social_media_instagram, bride_birth_order, groom_birth_order,
               bride_description, groom_description, cover_video,
               is_published, views, rsvps, created_at, updated_at
    `).bind(...values).first();

    if (!result) {
      return c.json({ error: 'Invitation not found' }, 404);
    }

    // Transform the flat database structure to nested objects for the frontend
    result.bride_parents = {
      father: result.bride_parents_father || '',
      mother: result.bride_parents_mother || ''
    };
    result.groom_parents = {
      father: result.groom_parents_father || '',
      mother: result.groom_parents_mother || ''
    };
    result.bride_social_media = {
      instagram: result.bride_social_media_instagram || ''
    };
    result.groom_social_media = {
      instagram: result.groom_social_media_instagram || ''
    };
    
    // Remove the flat fields
    delete result.bride_parents_father;
    delete result.bride_parents_mother;
    delete result.groom_parents_father;
    delete result.groom_parents_mother;
    delete result.bride_social_media_instagram;
    delete result.groom_social_media_instagram;

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