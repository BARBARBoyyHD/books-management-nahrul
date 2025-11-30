"use client";

import { useState } from "react";
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

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { usePostData } from "@/hooks/use-Fetch";
import type { publisherFrom } from "@/types/publisherTypes";

export function AddPublisherDialog() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<publisherFrom>({
    publisher_name: "",
    address: "",
    contact: "",
  });

  // Post Publisher
  const postPublisher = usePostData<publisherFrom>(
    "/api/v1/admin/publisher/post",
    "publishers"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    postPublisher.mutate(form, {
      onSuccess: () => {
        setForm({
          publisher_name: "",
          address: "",
          contact: "",
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold text-white shadow-lg shadow-cyan-500/50 mb-2 backdrop-blur-lg bg-cyan-700/50 cursor-pointer">
          Add Publisher
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] backdrop-blur-lg bg-white/20 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Publisher</DialogTitle>
            <DialogDescription>
              Fill the publisher details and click save.
            </DialogDescription>
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

            <Button type="submit" disabled={postPublisher.isPending}>
              {postPublisher.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
