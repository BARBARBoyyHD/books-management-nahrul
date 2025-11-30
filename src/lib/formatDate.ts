export const formatDate = (date: string | Date | null | undefined) => {
  if (!date) return "—";

  const d = date instanceof Date ? date : new Date(date);

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};