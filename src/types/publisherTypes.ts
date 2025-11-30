export type Publisher = {
  id: string;
  publisher_name: string;
  address: string;
  contact: string;
  created_at: string;
};

export type publisherFrom = Omit<Publisher, "id" | "created_at">;
