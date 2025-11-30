import { postHandler } from "@/handler/postHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { AuthorForm } from "@/types/authorTypes";

export async function POST(req: NextRequest) {
  try {
    const { author_name, bio, dob } = await req.json();

    const data: AuthorForm = {
      author_name,
      bio,
      dob,
    };

    const res = await postHandler({ table: "author", data: data });

    return res;
  } catch (error: unknown) {
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
