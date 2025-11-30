"use client";

import { DeleteComp } from "@/components/deleteButtonComp";
import { SpinnerLoading } from "@/components/spinner-loading";
import { useDebounce } from "@/hooks/use-Debounce";
import { useGetData } from "@/hooks/use-Fetch";
import type { BookResponse } from "@/types/booksTypes";
import { useState } from "react";
import { EditBookDialog } from "./form/BooksFormEditModal";
import { AddBookDialog } from "./form/BooksFormModal";
import { Button } from "@/components/ui/button";

export default function BooksComponents() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // Debounce biar gak spam API
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading,  } = useGetData<BookResponse>({
    endpoint: "/api/v1/admin/books/get",
    queryKeyBase: "books",
    params: {
      search: debouncedSearch,
      page,
      limit: 6,
      sortBy: "title",
      sortOrder: "asc",
    },
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <SpinnerLoading />
      </div>
    );

  const books = data?.data ?? [];

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-full  p-8 rounded-2xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          📚 Books List
        </h1>
        <AddBookDialog />

        {/* 🔎 SEARCH INPUT */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset page saat search
            }}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring focus:ring-white/40"
          />
        </div>

        <div className="w-full overflow-x-auto border">
          <div className="inline-block min-w-full align-middle rounded-xl border border-white/20 bg-white/5 backdrop-blur overflow-hidden">
            <div className="max-h-[250px] overflow-y-auto">
              <table className="table-auto w-full text-left text-white">
                {/* HEADER */}
                <thead className="sticky top-0 bg-black/30 backdrop-blur-sm z-10">
                  <tr className="border-b border-white/30">
                    <th className="p-3 font-semibold whitespace-nowrap">
                      Title
                    </th>
                    <th className="p-3 font-semibold whitespace-nowrap">
                      Price
                    </th>
                    <th className="p-3 font-semibold whitespace-nowrap">
                      Author
                    </th>
                    <th className="p-3 font-semibold whitespace-nowrap">
                      Publisher
                    </th>
                    <th className="p-3 font-semibold whitespace-nowrap text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {books.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center p-6 text-gray-300">
                        No books found.
                      </td>
                    </tr>
                  )}

                  {books.map((book) => (
                    <tr
                      key={book.id}
                      className=" hover:bg-white/10 transition"
                    >
                      <td className="p-3">{book.title}</td>
                      <td className="p-3">${book.price}</td>
                      <td className="p-3">{book.author?.author_name ?? "-"}</td>
                      <td className="p-3">
                        {book.publisher?.publisher_name ?? "-"}
                      </td>

                      <td className="p-3">
                        <div className="flex justify-center items-center gap-4">
                          <EditBookDialog
                            id={book.id}
                            params={{ page, limit: 10, search }}
                          />

                          <DeleteComp
                            id={book.id}
                            endpoint="/api/v1/admin/books/delete"
                            queryKey="books"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-6 gap-4">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="bg-white/10 backdrop-blur-lg text-white border-white/20 hover:bg-white/20"
        >
          Previous
        </Button>

        <span className="text-white text-lg font-bold px-3">
          {page}
        </span>
                  
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
      </div>
    </div>
  );
}
