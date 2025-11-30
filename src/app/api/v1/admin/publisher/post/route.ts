import { postHandler } from "@/handler/postHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { publisherFrom } from "@/types/publisherTypes";

export async function POST(req: NextRequest) {
  try {
    const { publisher_name, address, contact } = await req.json();

    const data: publisherFrom = {
      publisher_name,
      address,
      contact,
    };

    const res = await postHandler({ table: "publisher", data: data });

    return res;
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
