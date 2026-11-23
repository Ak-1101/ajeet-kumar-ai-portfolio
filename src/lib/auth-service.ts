import { cookies } from 'next/headers';
import { createClient } from './supabase/client';

const ADMIN_COOKIE_NAME = 'ak_admin_session';

export interface AdminUser {
  email: string;
  role: string;
  isAuthenticated: boolean;
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(sessionToken, 'base64').toString('utf-8'));
    if (payload && payload.email && payload.exp && payload.exp > Date.now()) {
      return {
        email: payload.email,
        role: 'admin',
        isAuthenticated: true,
      };
    }
  } catch (err) {
    return null;
  }

  return null;
}

export async function setAdminSession(email: string) {
  const cookieStore = cookies();
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const token = Buffer.from(JSON.stringify({ email, exp, role: 'admin' })).toString('base64');

  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function clearAdminSession() {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function verifyAdminCredentials(email: string, pass: string): Promise<boolean> {
  const defaultAdminEmail = (process.env.ADMIN_EMAIL || 'ajeetkumar.ak1101@gmail.com').toLowerCase().trim();
  const defaultAdminPass = process.env.ADMIN_INITIAL_PASSWORD || 'AjeetAdmin2026!';

  // 1. Check direct environment credentials
  if (email.toLowerCase().trim() === defaultAdminEmail && pass === defaultAdminPass) {
    return true;
  }

  // 2. Try Supabase Auth if client available
  const supabase = createClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      if (!error && data?.user) {
        return true;
      }
    } catch {
      // Continue to fail
    }
  }

  return false;
}
