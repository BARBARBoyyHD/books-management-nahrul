"use server";
import { createClient } from "@/utils/supabase/server";

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true }
}