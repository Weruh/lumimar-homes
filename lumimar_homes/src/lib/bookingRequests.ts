import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from './supabase';

export type BookingRequestPayload = {
  suiteName: string;
  roomType: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  message: string;
  initiatePayment?: boolean;
  website?: string;
};

export type BookingRequestResponse = {
  ok: boolean;
  id?: string;
  payment?: {
    authorizationUrl: string;
    reference: string;
    amountKes: number;
    currency: string;
  };
};

export type ClientMessagePayload = {
  bookingRequestId?: string;
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  message: string;
};

export type PaymentVerificationResponse = {
  ok: boolean;
  status: string;
  bookingRequestId?: string;
};

async function readFunctionError(error: FunctionsHttpError) {
  try {
    const response = error.context as Response;
    const body = (await response.clone().json()) as { error?: string; details?: string; hint?: string };
    return [body.error, body.details, body.hint].filter(Boolean).join(' ') || error.message;
  } catch {
    return error.message;
  }
}

export async function submitBookingRequest(payload: BookingRequestPayload): Promise<BookingRequestResponse> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await supabase.functions.invoke('submit-booking-request', {
    body: payload,
  });

  if (error) {
    if (error instanceof FunctionsHttpError) {
      throw new Error(await readFunctionError(error));
    }

    throw new Error(error.message);
  }

  return data as BookingRequestResponse;
}

export async function sendClientMessage(payload: ClientMessagePayload) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await supabase.functions.invoke('send-client-message', {
    body: payload,
  });

  if (error) {
    if (error instanceof FunctionsHttpError) {
      throw new Error(await readFunctionError(error));
    }

    throw new Error(error.message);
  }

  return data;
}

export async function verifyPaystackPayment(reference: string): Promise<PaymentVerificationResponse> {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }

  const { data, error } = await supabase.functions.invoke('verify-paystack-payment', {
    body: { reference },
  });

  if (error) {
    if (error instanceof FunctionsHttpError) {
      throw new Error(await readFunctionError(error));
    }

    throw new Error(error.message);
  }

  return data as PaymentVerificationResponse;
}
