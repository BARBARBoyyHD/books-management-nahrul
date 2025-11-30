import { putHandler } from "@/handler/editHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { AuthorForm } from "@/types/authorTypes";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { author_name, bio, dob } = await req.json();
    const data: AuthorForm = {
      author_name,
      bio,
      dob,
    };

    const res = await putHandler({
      table: "author",
      id,
      data: data,
      message: "Author Edited Successfully",
    });

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
