import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const publicRoutes = new Hono<{ Bindings: Env }>();

// Schema for RSVP submission
const rsvpSchema = z.object({
  guest_name: z.string().min(1),
  guest_email: z.string().email().optional(),
  guest_phone: z.string().optional(),
  attendance: z.enum(['yes', 'no', 'maybe']),
  message: z.string().optional(),
});

// Get public invitation by slug
publicRoutes.get('/invitation/:slug', async (c) => {
  try {
    const slug = c.req.param('slug');
    const db = c.env.DB;

    // Get invitation details (only published ones) - include all fields like private endpoint
    const invitation = await db.prepare(`
      SELECT id, slug, bride_name, groom_name, wedding_date, venue, 
             main_title, subtitle, message, theme, cover_image,
             bride_photo, groom_photo, bride_parents_father, bride_parents_mother,
             groom_parents_father, groom_parents_mother, bride_social_media_instagram,
             groom_social_media_instagram, bride_birth_order, groom_birth_order,
             bride_description, groom_description, cover_video,
             is_published, views, rsvps, created_at, updated_at
      FROM invitations 
      WHERE slug = ? AND is_published = TRUE
    `).bind(slug).first();

    if (!invitation) {
      return c.json({ error: 'Invitation not found or not published' }, 404);
    }

    // Transform the flat database structure to nested objects for the frontend
    // (same transformation as in private endpoint)
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

    return c.json({ invitation });
  } catch (error) {
    console.error('Get public invitation error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Track invitation view
publicRoutes.post('/invitation/:slug/view', async (c) => {
  try {
    const slug = c.req.param('slug');
    const db = c.env.DB;

    // Increment view count
    const result = await db.prepare(`
      UPDATE invitations 
      SET views = views + 1, updated_at = CURRENT_TIMESTAMP
      WHERE slug = ? AND is_published = TRUE
      RETURNING views
    `).bind(slug).first();

    if (!result) {
      return c.json({ error: 'Invitation not found or not published' }, 404);
    }

    return c.json({ 
      message: 'View tracked',
      views: result.views 
    });
  } catch (error) {
    console.error('Track view error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Submit RSVP
publicRoutes.post('/invitation/:slug/rsvp', zValidator('json', rsvpSchema), async (c) => {
  try {
    const slug = c.req.param('slug');
    const data = c.req.valid('json');
    const db = c.env.DB;

    // Get invitation ID and verify it exists and is published
    const invitation = await db.prepare(`
      SELECT id FROM invitations 
      WHERE slug = ? AND is_published = TRUE
    `).bind(slug).first();

    if (!invitation) {
      return c.json({ error: 'Invitation not found or not published' }, 404);
    }

    // Check if guest already RSVPed (by email if provided, otherwise by name)
    let existingRsvp = null;
    if (data.guest_email) {
      existingRsvp = await db.prepare(`
        SELECT id FROM rsvp_responses 
        WHERE invitation_id = ? AND guest_email = ?
      `).bind(invitation.id, data.guest_email).first();
    } else {
      existingRsvp = await db.prepare(`
        SELECT id FROM rsvp_responses 
        WHERE invitation_id = ? AND guest_name = ? AND guest_email IS NULL
      `).bind(invitation.id, data.guest_name).first();
    }

    if (existingRsvp) {
      return c.json({ error: 'You have already submitted an RSVP for this invitation' }, 400);
    }

    // Create RSVP response
    const rsvpResult = await db.prepare(`
      INSERT INTO rsvp_responses (
        invitation_id, guest_name, guest_email, guest_phone, 
        attendance, message, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      RETURNING id, guest_name, guest_email, attendance, message, created_at
    `).bind(
      invitation.id,
      data.guest_name,
      data.guest_email || null,
      data.guest_phone || null,
      data.attendance,
      data.message || null
    ).first();

    if (!rsvpResult) {
      return c.json({ error: 'Failed to submit RSVP' }, 500);
    }

    // Update RSVP count on invitation (only count 'yes' responses)
    if (data.attendance === 'yes') {
      await db.prepare(`
        UPDATE invitations 
        SET rsvps = rsvps + 1, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(invitation.id).run();
    }

    return c.json({ 
      message: 'RSVP submitted successfully',
      rsvp: rsvpResult 
    }, 201);
  } catch (error) {
    console.error('Submit RSVP error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get RSVP responses for an invitation (protected - could be for admin view)
publicRoutes.get('/invitation/:slug/rsvps', async (c) => {
  try {
    const slug = c.req.param('slug');
    const db = c.env.DB;

    // Get invitation ID and verify it exists and is published
    const invitation = await db.prepare(`
      SELECT id, bride_name, groom_name FROM invitations 
      WHERE slug = ? AND is_published = TRUE
    `).bind(slug).first();

    if (!invitation) {
      return c.json({ error: 'Invitation not found or not published' }, 404);
    }

    // Get all RSVP responses
    const rsvps = await db.prepare(`
      SELECT id, guest_name, guest_email, guest_phone, 
             attendance, message, created_at
      FROM rsvp_responses 
      WHERE invitation_id = ?
      ORDER BY created_at DESC
    `).bind(invitation.id).all();

    // Get attendance summary
    const summary = await db.prepare(`
      SELECT 
        attendance,
        COUNT(*) as count
      FROM rsvp_responses 
      WHERE invitation_id = ?
      GROUP BY attendance
    `).bind(invitation.id).all();

    return c.json({ 
      invitation: {
        bride_name: invitation.bride_name,
        groom_name: invitation.groom_name
      },
      rsvps: rsvps.results,
      summary: summary.results
    });
  } catch (error) {
    console.error('Get RSVPs error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export { publicRoutes }; 