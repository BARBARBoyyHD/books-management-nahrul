import React from "react";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDeleteData } from "@/hooks/use-Fetch";


interface DeleteCompProps {
  id: string;
  endpoint: string;
  queryKey: string;
}

export function DeleteComp({ id, endpoint, queryKey }: DeleteCompProps) {
  const { mutate } = useDeleteData(endpoint, queryKey);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-300 hover:text-red-300 hover:bg-red-700 bg-red-500/40"
      onClick={() => mutate(id)} // ✅ <-- actually call mutate() here
    >
      <FaTrash size={16} />
    </Button>
  );
}