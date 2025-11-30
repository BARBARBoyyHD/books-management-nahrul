import { getSingleHandler } from "@/handler/getHandler";
import { errorResponse } from "@/utils/response";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, {params}:{params:Promise<{id:string}>}) {
  try {
    const{id} = await params

    const supabase = await createClient();
    return await getSingleHandler({
      table: "author",
      id,
      column: "id, author_name, bio, dob, created_at",
      client: supabase,
    });

  } catch (error) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
    return errorResponse({
      success: false,
      status: 500,
      message: "Internal Server Error",
    });
  }
}
