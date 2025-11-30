"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { FiEdit2 } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useGetSingleData, useUpdateData } from "@/hooks/use-Fetch";
import type { Publisher, publisherFrom } from "@/types/publisherTypes";
import { PaginationParams } from "@/types/queryTypes";

export function EditPublisherDialog({
  id,
  params,
}: {
  id: string;
  params: PaginationParams;
}) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<publisherFrom>({
    publisher_name: "",
    address: "",
    contact: "",
  });

  // Fetch Publisher
  const { data: publisherDetails } = useGetSingleData<Publisher>(
    id,
    "/api/v1/admin/publisher/get",
    "publisherDetails",
    { enabled: open }
  );

  // Set form ketika data berhasil di-fetch
  useEffect(() => {
    if (publisherDetails) {
      const p = publisherDetails;

      setForm({
        publisher_name: p.publisher_name,
        address: p.address,
        contact: p.contact,
      });
    }
  }, [publisherDetails]);

  // Update Publisher
  const { mutate: updatePublisher, isPending } = useUpdateData<publisherFrom>(
    "/api/v1/admin/publisher/put",
    "publishers",
    params
  );

  // Handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePublisher(
      {
        id,
        updates: form,
      },
      { onSuccess: () => setOpen(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition">
          <FiEdit2 className="text-blue-300" size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] backdrop-blur-lg bg-white/20 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Publisher</DialogTitle>
            <DialogDescription>Update the publisher details.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Publisher Name */}
            <div className="grid gap-2">
              <Label>Publisher Name</Label>
              <Input
                name="publisher_name"
                value={form.publisher_name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label>Address</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* Contact */}
            <div className="grid gap-2">
              <Label>Contact</Label>
              <Input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
