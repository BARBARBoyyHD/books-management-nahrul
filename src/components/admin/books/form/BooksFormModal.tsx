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

import { usePostData, useGetData } from "@/hooks/use-Fetch";
import type { BooksForm } from "@/types/booksTypes";
import type { Author } from "@/types/authorTypes";
import type { Publisher } from "@/types/publisherTypes";
import { DatePicker } from "@/components/DatePicker";

export function AddBookDialog() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<BooksForm>({
    title: "",
    author: "",
    publisher: "",
    published_date: "",
    price: 0,
  });

  const [publishedDate, setPublishedDate] = useState<Date | undefined>();

  // ===============================
  // Fetch Authors & Publishers
  // ===============================
  const { data: authorsData } = useGetData<Author>({
    endpoint: "/api/v1/admin/author/get",
    queryKeyBase: "authors",
    params: { page: 1, limit: 100, search: "" },
  });

  const { data: publishersData } = useGetData<Publisher>({
    endpoint: "/api/v1/admin/publisher/get",
    queryKeyBase: "publishers",
    params: { page: 1, limit: 100, search: "" },
  });

  const authors = authorsData?.data ?? [];
  const publishers = publishersData?.data ?? [];

  // ===============================
  // usePostData -> Insert Book
  // ===============================
  const postBook = usePostData<BooksForm>("/api/v1/admin/books/post", "books");

  // ===============================
  // Handlers
  // ===============================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      published_date: publishedDate?.toISOString() ?? "",
    };

    postBook.mutate(payload, {
      onSuccess: () => {
        setForm({
          title: "",
          author: "",
          publisher: "",
          published_date: "",
          price: 0,
        });
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold text-white shadow-lg shadow-cyan-500/50 mb-2 backdrop-blur-lg bg-cyan-700/50 cursor-pointer">
          Add Book
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] max-h-[520px] overflow-y-auto backdrop-blur-lg bg-white/20 text-white ">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Book</DialogTitle>
            <DialogDescription>
              Fill the book details and click save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid gap-2">
              <Label>Book Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Author */}
            <div className="grid gap-2">
              <Label>Author</Label>
              <select
                name="author"
                value={form.author}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
              >
                <option value="text-black">Select Author</option>
                {authors.map((item) => (
                  <option key={item.id} value={item.id} className="text-black">
                    {item.author_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Publisher */}
            <div className="grid gap-2">
              <Label>Publisher</Label>
              <select
                name="publisher"
                value={form.publisher}
                onChange={handleChange}
                required
                className="border p-2 rounded-md"
              >
                <option value="">Select Publisher</option>
                {publishers.map((item) => (
                  <option key={item.id} value={item.id} className="text-black">
                    {item.publisher_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Published Date */}
            <DatePicker
              label="Published Date"
              name="published_date"
              value={publishedDate}
              onChange={setPublishedDate}
              fromYear={1980}
              required
            />

            {/* Price */}
            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={postBook.isPending}>
              {postBook.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
