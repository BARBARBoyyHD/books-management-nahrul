export type Author = {
  id: string;
  author_name: string;
  bio: string;
  dob: Date | string; // Date of birth
  created_at: string;
};

export type AuthorForm = Omit<Author, "id" | "created_at">;
