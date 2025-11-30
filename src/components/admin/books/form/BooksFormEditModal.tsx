"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useGetData, useGetSingleData, useUpdateData } from "@/hooks/use-Fetch";

import { DatePicker } from "@/components/DatePicker";
import type { Author } from "@/types/authorTypes";
import type { Books, BooksForm } from "@/types/booksTypes";
import type { Publisher } from "@/types/publisherTypes";
import { PaginationParams } from "@/types/queryTypes";

export function EditBookDialog({
  id,
  params,
}: {
  id: string;
  params: PaginationParams;
}) {
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
  // Fetch Book Details
  // ===============================
  const { data: bookDetails } = useGetSingleData<Books>(
    id,
    "/api/v1/admin/books/get",
    "bookDetails",
    { enabled: open }
  );
const detailBooksOpen = useCallback((b: Books) => ({
  title: b.title,
  author: b.author,
  publisher: b.publisher,
  published_date: b.published_date,
  price: b.price,
}), []);


useEffect(() => {
  if (!bookDetails) return;

  setForm(detailBooksOpen(bookDetails));
  setPublishedDate(
    bookDetails.published_date
      ? new Date(bookDetails.published_date)
      : undefined
  );
}, [bookDetails]);

  // ===============================
  // Fetch Authors & Publishers
  // ===============================

  const { data: authorsData } = useGetData<Author>({
    endpoint: "/api/v1/admin/author/get",
    queryKeyBase: "authors",
    params: { page: 1, limit: 100 },
  });

  const { data: publishersData } = useGetData<Publisher>({
    endpoint: "/api/v1/admin/publisher/get",
    queryKeyBase: "publishers",
    params: { page: 1, limit: 100 },
  });

  const authors = authorsData?.data ?? [];
  const publishers = publishersData?.data ?? [];

  // ===============================
  // Update Book
  // ===============================
  const { mutate: updateBook, isPending } = useUpdateData<BooksForm>(
    `/api/v1/admin/books/put`,
    "books",
    params
  );

  // ===============================
  // Handlers
  // ===============================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateBook(
      {
        id,
        updates: {
          ...form,
          published_date: publishedDate?.toISOString() ?? "",
        },
      },
      {
        onSuccess: () => setOpen(false),
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

      <DialogContent className="sm:max-w-[450px] max-h-[520px] overflow-y-auto backdrop-blur-lg bg-white/20 text-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>Update the book details.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 text-white">
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
                className="border p-2 rounded-md "
              >
                <option value="">Select Author</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id} className="text-black">
                    {a.author_name}
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
                {publishers.map((p) => (
                  <option key={p.id} value={p.id} className="text-black">
                    {p.publisher_name}
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

            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
