export type Books = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  published_date: Date | string;
  price: number;
  created_at: string;
};
export type BookResponse = {
  id: string;
  title: string;
  price: number;
  created_at: string;

  author: {
    id: string;
    author_name: string;
  } | null;

  publisher: {
    id: string;
    publisher_name: string;
  } | null;
};

export type BooksForm = Omit<Books, "id" | "created_at">;
