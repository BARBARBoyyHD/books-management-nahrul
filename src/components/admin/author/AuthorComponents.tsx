"use client";

import { DeleteComp } from "@/components/deleteButtonComp";
import { SpinnerLoading } from "@/components/spinner-loading";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-Debounce";
import { useGetData } from "@/hooks/use-Fetch";
import type { Author } from "@/types/authorTypes";
import { useState } from "react";
import { EditAuthorDialog } from "./form/AuthorFormEditModal";
import { AddAuthorDialog } from "./form/AuthorFormModal";

export default function AuthorComponents() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useGetData<Author>({
    endpoint: "/api/v1/admin/author/get",
    queryKeyBase: "authors",
    params: {
      search: debouncedSearch,
      page,
      limit: 6,
      sortBy: "author_name",
      sortOrder: "asc",
    },
  });

  if (isLoading)
    return (
      <div>
        <SpinnerLoading />
      </div>
    );

  const authors = data?.data ?? [];

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-full p-8 rounded-2xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center tracking-wide">
          ✍️ Authors List
        </h1>
        <AddAuthorDialog />
        {/* 🔎 SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search author..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full p-3 rounded-xl bg-white/20 text-white placeholder-white/60
              border border-white/30 focus:outline-none focus:ring focus:ring-white/40"
          />
        </div>

        {/* TABLE */}
        <div className="w-full overflow-x-auto overflow-y-auto max-h-80">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="border-b border-white/30">
                <th className="p-3 font-medium">Name</th>
                <th className="p-3 font-medium">Bio</th>
                <th className="p-3 font-medium">Date of Birth</th>
                <th className="p-3 font-medium text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {authors.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-6 text-gray-300">
                    No authors found.
                  </td>
                </tr>
              )}

              {authors.map((author) => (
                <tr
                  key={author.id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3">{author.author_name}</td>

                  <td className="p-3 max-w-xs truncate">{author.bio}</td>

                  <td className="p-3">
                    {new Date(author.dob).toLocaleDateString()}
                  </td>

                  <td className="p-3 text-center flex gap-4 justify-center">
                    <EditAuthorDialog
                      id={author.id}
                      params={{
                        page,
                        limit: 10,
                        search,
                      }}
                    />
                    <DeleteComp
                      id={author.id}
                      endpoint="/api/v1/admin/author/delete"
                      queryKey="authors"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

          <span className="text-white text-lg font-bold px-3">{page}</span>

          {/* NEXT */}
          <Button
            variant="outline"
            disabled={(data?.data?.length ?? 0) < 6}
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
