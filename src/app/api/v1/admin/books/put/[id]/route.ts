import { putHandler } from "@/handler/editHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { BooksForm } from "@/types/booksTypes";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, author, publisher, published_date, price } = await req.json();
      
    const data: BooksForm = {
      title,
      author,
      publisher,
      published_date,
      price
    };

    const res = await putHandler({
      table: "books",
      id,
      data: data,
      message: "Book Edited Successfully",
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
