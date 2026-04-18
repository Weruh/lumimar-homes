import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from './supabase';

const GENERIC_SUBMIT_ERROR = 'We could not submit your request right now. Please try again or contact us directly.';

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
      const response = error.context as Response;

      try {
        const body = await response.clone().json() as { error?: string; details?: string; hint?: string };

        if (response.status >= 500) {
          throw new Error(GENERIC_SUBMIT_ERROR);
        }

        throw new Error(body.error || GENERIC_SUBMIT_ERROR);
      } catch {
        try {
          if (response.status >= 500) {
            throw new Error(GENERIC_SUBMIT_ERROR);
          }

          const text = await response.clone().text();

          throw new Error(text || GENERIC_SUBMIT_ERROR);
        } catch {
          throw new Error(GENERIC_SUBMIT_ERROR);
        }
      }
    }

    throw new Error(GENERIC_SUBMIT_ERROR);
  }
}
