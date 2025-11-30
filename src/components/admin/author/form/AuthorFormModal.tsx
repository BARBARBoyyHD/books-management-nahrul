"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { usePostData } from "@/hooks/use-Fetch";
import type { AuthorForm } from "@/types/authorTypes";
import { DatePicker } from "@/components/DatePicker";

export function AddAuthorDialog() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<AuthorForm>({
    author_name: "",
    bio: "",
    dob: "",
  });

  const [dobDate, setDobDate] = useState<Date | null>(null);

  const postAuthor = usePostData("/api/v1/admin/author/post", "authors");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: AuthorForm = {
      ...form,
      dob: dobDate ? dobDate.toISOString() : "",
    };

    postAuthor.mutate(payload, {
      onSuccess: () => {
        setOpen(false);
        setForm({ author_name: "", bio: "", dob: "" });
        setDobDate(null);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold text-white shadow-lg shadow-cyan-500/50 mb-2 backdrop-blur-lg bg-cyan-700/50 cursor-pointer">
          Add Author
        </Button>
      </DialogTrigger>

      <DialogContent className="text-white backdrop-blur-lg bg-white/20">
        <DialogHeader>
          <DialogTitle>Add New Author</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>Author Name</Label>
            <Input
              value={form.author_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, author_name: e.target.value }))
              }
              required
            />
          </div>

          <div className="gap-2 flex flex-col">
            <Label>Bio</Label>
            <Input
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, bio: e.target.value }))
              }
            />
          </div>

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
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
