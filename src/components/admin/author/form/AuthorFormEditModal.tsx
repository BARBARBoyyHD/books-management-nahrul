"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
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
import type { Author, AuthorForm } from "@/types/authorTypes";
import { DatePicker } from "@/components/DatePicker";
import { PaginationParams } from "@/types/queryTypes";

export function EditAuthorDialog({
  id,
  params,
}: {
  id: string;
  params: PaginationParams;
}) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<AuthorForm>({
    author_name: "",
    bio: "",
    dob: "",
  });

  const [dobDate, setDobDate] = useState<Date | undefined>(undefined);

  // ===============================
  // Fetch Author Details
  // ===============================
  const { data: authorDetails } = useGetSingleData<Author>(
    id,
    "/api/v1/admin/author/get",
    "authorDetails",
    { enabled: open }
  );

  useEffect(() => {
    if (!authorDetails || !open) return;

    queueMicrotask(() => {
      const a = authorDetails;

      setForm({
        author_name: a.author_name,
        bio: a.bio,
        dob: a.dob,
      });

      setDobDate(a.dob ? new Date(a.dob) : undefined);
    });
  }, [authorDetails, open]);

  // ===============================
  // Update Handler
  // ===============================
  const { mutate: updateAuthor, isPending } = useUpdateData<AuthorForm>(
    "/api/v1/admin/author/put",
    "authors",
    params
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateAuthor(
      {
        id,
        updates: {
          ...form,
          dob: dobDate ? dobDate.toISOString() : "",
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition">
          <FiEdit2 className="text-blue-300" size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] backdrop-blur-md bg-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Edit Author</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Author Name */}
          <div>
            <Label>Author Name</Label>
            <Input
              value={form.author_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, author_name: e.target.value }))
              }
              required
            />
          </div>

          {/* Bio */}
          <div>
            <Label>Bio</Label>
            <Input
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </div>

          {/* Date of Birth */}
          <div>
            <DatePicker
              label="Date of Birth"
              name="dob"
              value={dobDate}
              onChange={setDobDate}
              fromYear={1980}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
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
