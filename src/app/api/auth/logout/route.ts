// /app/api/auth/logout/route.ts (example path)

import { SUPABASE_AUTH_TOKEN } from "@/config/supabaseKey";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  cookieStore.delete(SUPABASE_AUTH_TOKEN);

  if (error) {
    console.error("Supabase API Logout failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
