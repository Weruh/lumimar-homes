import { createContext, useContext, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import type { AppRole, Profile } from '../lib/database.types';
import { isSupabaseConfigured, lumimar, supabase } from '../lib/supabase';

type SignInArgs = {
  email: string;
  password: string;
};

type AuthContextValue = {
  isConfigured: boolean;
  loading: boolean;
  error: string | null;
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  role: AppRole | null;
  signIn: (args: SignInArgs) => Promise<string | null>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function fetchProfile(userId: string | null) {
  if (!lumimar || !userId) {
    return { data: null, error: null };
  }

  return lumimar.from('profiles').select('*').eq('id', userId).maybeSingle();
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const loadProfile = async (userId: string | null) => {
    const { data, error: profileError } = await fetchProfile(userId);
    setProfile(data ?? null);
    setError(profileError?.message ?? null);
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setError('Supabase env vars are missing. Configure the client to enable auth and backend access.');
      return;
    }

    let isMounted = true;

    const bootstrap = async () => {
      const {
        data: { session: nextSession },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (sessionError) {
        setError(sessionError.message);
      }

      setSession(nextSession);
      await loadProfile(nextSession?.user?.id ?? null);

      if (isMounted) {
        setLoading(false);
      }
    };

    void bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(true);

      void loadProfile(nextSession?.user?.id ?? null).finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }: SignInArgs) => {
    if (!supabase) {
      return 'Supabase is not configured.';
    }

    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return signInError.message;
    }

    return null;
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setProfile(null);
    setSession(null);
  };

  const refreshProfile = async () => {
    setLoading(true);
    await loadProfile(session?.user?.id ?? null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isConfigured: isSupabaseConfigured,
        loading,
        error,
        session,
        user: session?.user ?? null,
        profile,
        role: profile?.role ?? null,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
