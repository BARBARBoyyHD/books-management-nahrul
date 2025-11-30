import { postHandler } from "@/handler/postHandler";
import { errorResponse } from "@/utils/response";
import { NextRequest } from "next/server";
import type { BooksForm } from "@/types/booksTypes";

export async function POST(req: NextRequest) {
    try {
        const { title, author, publisher, published_date,price } = await req.json();

        const data: BooksForm = {
            title,
            author,
            publisher,
            published_date,
            price,
        };

        const res = await postHandler({ table: "books", data: data });

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