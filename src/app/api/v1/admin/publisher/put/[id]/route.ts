import { putHandler } from "@/handler/editHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { publisherFrom } from "@/types/publisherTypes";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { publisher_name, address, contact } = await req.json();
    const data: publisherFrom = {
      publisher_name,
      address,
      contact,
    };

    const res = await putHandler({
      table: "publisher",
      id,
      data: data,
      message: "Publisher Edited Successfully",
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
