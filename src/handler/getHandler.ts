import { errorResponse, successResponse } from "@/utils/response";
import { SupabaseClient } from "@supabase/supabase-js";

// handler/getHandler.ts

interface GetHandlerProps {
  table: string;
  column: string;
  id?: string;
  client: SupabaseClient;

  // New optional properties for search and pagination/sorting
  search?: string; // The search term
  searchColumns?: string[]; // Columns to search against (e.g., ['author', 'publisher', 'title'])
  page?: number;
  limit?: number;
  sortBy?: string; // Column to sort by
  sortOrder?: "asc" | "desc"; // Sort order
}

// handler/getHandler.ts
// ... (imports and interface definition from above)

export async function getHandler({
  table,
  column,
  client,
  search,
  searchColumns,
  page,
  limit,
  sortBy = "created_at",
  sortOrder = "desc",
}: GetHandlerProps) {
  try {
    let query = client.from(table).select(column || "*");

    if (search && searchColumns && searchColumns.length > 0) {
      // This line creates the necessary string:
      // "title.ilike.%uwi%,author.author_name.ilike.%uwi%,publisher.publisher_name.ilike.%uwi%"
      query = query.or(`${searchColumns}.ilike.%${search}%`);

    }
    // ... (rest of your pagination and ordering logic)
    query = query.order(sortBy, { ascending: sortOrder === "asc" });

    let from = 0;
    let to = undefined;

    if (page !== undefined && limit !== undefined) {
      from = (page - 1) * limit;
      to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return errorResponse({
        success: false,
        status: 404,
        message: "No data found",
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "Success",
      data: data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Supabase/PostgREST Error:", error.message);
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }

    return errorResponse({
      success: false,
      status: 500,
      message: "An unknown error occurred during database operation.",
    });
  }
}

export async function getSingleHandler({
  table,
  column,
  id,
  client,
}: GetHandlerProps) {
  try {
    const { data, error } = await client
      .from(table)
      .select(column || "*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return errorResponse({
        success: false,
        status: 404,
        message: "Data not found",
      });
    }

    return successResponse({
      success: true,
      status: 200,
      message: "Success",
      data,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return errorResponse({
        success: false,
        status: 500,
        message: error.message,
      });
    }
  }
}
