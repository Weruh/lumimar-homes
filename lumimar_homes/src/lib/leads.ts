import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type OwnerLeadPayload = {
  name: string;
  email: string;
  phone: string;
  location: string;
  currentEarnings: string;
  service: string;
  message: string;
  website?: string;
};

export async function submitOwnerLead(payload: OwnerLeadPayload) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { error } = await supabase.functions.invoke('submit-owner-lead', {
    body: payload,
  });

  if (error) {
    if (error instanceof FunctionsHttpError) {
      try {
        const response = error.context as Response;
        const body = await response.clone().json() as { error?: string; details?: string; hint?: string };
        const message = [body.error, body.details, body.hint].filter(Boolean).join(' ');

        throw new Error(message || error.message);
      } catch {
        try {
          const response = error.context as Response;
          const text = await response.clone().text();

          throw new Error(text || error.message);
        } catch {
          throw new Error(error.message);
        }
      }
    }

    throw new Error(error.message);
  }
}
