"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-Fetch";
import type { BookResponse } from "@/types/booksTypes";
import { useState } from "react";

export default function BooksCardComponents() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetData<BookResponse>({
    endpoint: "/api/users/books",
    queryKeyBase: "books",
    params: {
      page,
      limit: 6,
      search: "",
      sortBy: "created_at",
      sortOrder: "desc",
    },
  });

  if (isLoading) return <SpinnerLoading />;
  if (error) return <p className="text-red-500">Failed to load books.</p>;

  return (
    <section className="flex justify-center flex-col">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
        📚 Our Best Books
      </h1>
      {/* GRID */}
      <div className="flex flex-wrap justify-center gap-6">
        {data?.data?.map((book) => (
          <div
            key={book.id}
            className="w-full sm:w-[45%] lg:w-[30%] p-5 rounded-2xl 
        bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl 
        hover:scale-[1.02] transition-all cursor-pointer"
          >
            <h2 className="text-xl font-bold text-white mb-2">{book.title}</h2>

            <p className="text-white/80 text-sm">
              Author:{" "}
              <span className="font-semibold">
                {book.author?.author_name || "Unknown"}
              </span>
            </p>

            <p className="text-white/80 text-sm">
              Publisher:{" "}
              <span className="font-semibold">
                {book.publisher?.publisher_name || "Unknown"}
              </span>
            </p>

            <p className="text-cyan-300 font-bold mt-3">
              Rp {book.price.toLocaleString("id-ID")}
            </p>

            <p className="text-xs text-white/50 mt-1">
              Added on: {new Date(book.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-10">
        {/* PREVIOUS */}
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="bg-white/10 backdrop-blur-lg text-white border-white/20 hover:bg-white/20"
        >
          Previous
        </Button>

        <span className="text-white text-lg font-bold px-3">{page}</span>

        {/* NEXT */}
        <Button
          variant="outline"
          disabled={data?.data?.length < 6} // auto-disable if no more results
          onClick={() => setPage(page + 1)}
          className="bg-white/10 backdrop-blur-lg text-white border-white/20 hover:bg-white/20"
        >
          Next
        </Button>
      </div>
    </section>
  );
}
