"use client";

import { SpinnerLoading } from "@/components/spinner-loading";
import { Button } from "@/components/ui/button";
import { useGetData } from "@/hooks/use-Fetch";
import type { Publisher } from "@/types/publisherTypes";
import { useState } from "react";

export default function PublishersCardComponents() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetData<Publisher>({
    endpoint: "/api/users/publishers",
    queryKeyBase: "publishers",
    params: {
      page,
      limit: 6,
      search: "",
      sortBy: "created_at",
      sortOrder: "desc",
    },
  });

  if (isLoading) return <SpinnerLoading />;
  if (error) return <p className="text-red-500">Failed to load publishers.</p>;

  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
        🏆 Our Best Publishers
      </h1>

      {/* GRID */}
      <div className="flex flex-wrap justify-center gap-6">
        {data?.data?.map((publisher) => (
          <div
            key={publisher.id}
            className="w-full sm:w-[45%] lg:w-[30%] p-5 rounded-2xl 
            bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl 
            hover:scale-[1.02] transition-all cursor-pointer"
          >
            <h2 className="text-xl font-bold text-white mb-2">
              {publisher.publisher_name}
            </h2>

            <p className="text-white/80 text-sm">
              Address:{" "}
              <span className="font-semibold">{publisher.address || "-"}</span>
            </p>

            <p className="text-xs text-white/50 mt-3">
              Joined on: {new Date(publisher.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-10">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
          className="bg-white/10 backdrop-blur-lg text-white border-white/20 hover:bg-white/20"
        >
          Previous
        </Button>

        <span className="text-white text-lg font-bold px-3">{page}</span>

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
  );
}
