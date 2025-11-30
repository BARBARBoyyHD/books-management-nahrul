"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { useDebounce } from "@/hooks/use-Debounce";
import { useGetData } from "@/hooks/use-Fetch";
import type { Publisher } from "@/types/publisherTypes";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AddPublisherDialog } from "./form/PublishersFormModal";
import { EditPublisherDialog } from "./form/PublishersFormtEditModal";
import { Button } from "@/components/ui/button";
import { DeleteComp } from "@/components/deleteButtonComp";

export default function PublisherComponents() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useGetData<Publisher>({
    endpoint: "/api/v1/admin/publisher/get",
    queryKeyBase: "publishers",
    params: {
      search: debouncedSearch,
      page,
      limit: 10,
      sortBy: "publisher_name",
      sortOrder: "asc",
    },
  });

  if (isLoading)
    return (
      <div>
        <SpinnerLoading />
      </div>
    );

  const publishers = data?.data ?? [];

  return (
    <div className="flex justify-center items-start p-4">
      <div className="w-full p-8 rounded-2xl backdrop-blur-xl bg-white/10 shadow-xl border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6 text-center tracking-wide">
          🏛️ Publishers List
        </h1>
        <AddPublisherDialog />
        {/* SEARCH */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search publisher..."
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
        <div className="rounded-xl w-full overflow-hidden border border-white/20 bg-white/5 backdrop-blur">
          <div className="max-h-[250px] overflow-y-auto">
            <table className="w-full text-left text-white">
              <thead className="sticky top-0 bg-black/30 backdrop-blur-sm">
                <tr className="">
                  <th className="p-3 font-semibold">Publisher</th>
                  <th className="p-3 font-semibold">Address</th>
                  <th className="p-3 font-semibold">Contact</th>

                  <th className="p-3 font-semibold text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {publishers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center p-6 text-gray-300">
                      No publishers found.
                    </td>
                  </tr>
                )}

                {publishers.map((pub) => (
                  <tr
                    key={pub.id}
                    className="border-b border-white/10 hover:bg-white/10 transition"
                  >
                    <td className="p-3">{pub.publisher_name}</td>
                    <td className="p-3">{pub.address}</td>
                    <td className="p-3">{pub.contact}</td>


                    <td className="p-3">
                      <div className="flex items-center justify-center gap-3">
                        <EditPublisherDialog
                          id={pub.id}
                          params={{
                            page,
                            limit: 10,
                            search,
                          }}
                        />

                        <DeleteComp
                          id={pub.id}
                          endpoint="/api/v1/admin/publisher/delete"
                          queryKey="publishers"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
