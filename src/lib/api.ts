// API Client for Wedding Invitation Backend

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export interface Invitation {
  id: number;
  slug: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  venue?: string;
  main_title: string;
  subtitle: string;
  message: string;
  theme: string;
  cover_image?: string;
  // Couple profile fields
  bride_photo?: string;
  groom_photo?: string;
  bride_parents?: {
    father: string;
    mother: string;
  };
  groom_parents?: {
    father: string;
    mother: string;
  };
  bride_social_media?: {
    instagram?: string;
  };
  groom_social_media?: {
    instagram?: string;
  };
  bride_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth';
  groom_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth';
  bride_description?: string;
  groom_description?: string;
  cover_video?: string;
  is_published: boolean;
  views: number;
  rsvps: number;
  created_at: string;
  updated_at: string;
}

export interface CreateInvitationData {
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  venue?: string;
  main_title?: string;
  subtitle?: string;
  message?: string;
  theme?: string;
  custom_slug?: string;
  // Couple profile fields
  bride_photo?: string;
  groom_photo?: string;
  bride_parents?: {
    father: string;
    mother: string;
  };
  groom_parents?: {
    father: string;
    mother: string;
  };
  bride_social_media?: {
    instagram?: string;
  };
  groom_social_media?: {
    instagram?: string;
  };
  bride_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth';
  groom_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth';
  bride_description?: string;
  groom_description?: string;
  cover_video?: string;
}

export interface UpdateInvitationData {
  bride_name?: string;
  groom_name?: string;
  wedding_date?: string;
  venue?: string;
  main_title?: string;
  subtitle?: string;
  message?: string;
  theme?: string;
  cover_image?: string;
  is_published?: boolean;
  // Couple profile fields
  bride_photo?: string;
  groom_photo?: string;
  bride_parents?: {
    father: string;
    mother: string;
  };
  groom_parents?: {
    father: string;
    mother: string;
  };
  bride_social_media?: {
    instagram?: string;
  };
  groom_social_media?: {
    instagram?: string;
  };
  bride_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth';
  groom_birth_order?: 'first' | 'second' | 'third' | 'fourth' | 'fifth';
  bride_description?: string;
  groom_description?: string;
  cover_video?: string;
}

export interface RSVPData {
  guest_name: string;
  guest_email?: string;
  guest_phone?: string;
  attendance: 'yes' | 'no' | 'maybe';
  message?: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(email: string, password: string, name: string) {
    const response = await this.request<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.token;
    localStorage.setItem('auth_token', response.token);
    return response;
  }

  async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  // Invitation endpoints (single invitation per user)
  async getInvitation() {
    return this.request<{ invitation: Invitation | null; hasInvitation: boolean }>('/invitations');
  }

  async createInvitation(data: CreateInvitationData) {
    return this.request<{ invitation: Invitation }>('/invitations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInvitation(data: UpdateInvitationData) {
    return this.request<{ invitation: Invitation }>('/invitations', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInvitation() {
    return this.request<{ message: string }>('/invitations', {
      method: 'DELETE',
    });
  }

  async togglePublishInvitation() {
    return this.request<{ message: string; is_published: boolean }>('/invitations/publish', {
      method: 'POST',
    });
  }

  // Public endpoints
  async getPublicInvitation(slug: string) {
    return this.request<{ invitation: Invitation }>(`/invitation/${slug}`);
  }

  async trackView(slug: string) {
    return this.request<{ message: string; views: number }>(`/invitation/${slug}/view`, {
      method: 'POST',
    });
  }

  async submitRSVP(slug: string, data: RSVPData) {
    return this.request<{ message: string; rsvp: any }>(`/invitation/${slug}/rsvp`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRSVPs(slug: string) {
    return this.request<{ 
      invitation: { bride_name: string; groom_name: string };
      rsvps: any[];
      summary: any[];
    }>(`/invitation/${slug}/rsvps`);
  }

  // Auth state management
  isAuthenticated(): boolean {
    return !!this.token;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }
}

export const apiClient = new ApiClient(); 