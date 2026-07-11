import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client (server-only). Melewati RLS.
 * Jangan pernah diimpor di komponen client.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
