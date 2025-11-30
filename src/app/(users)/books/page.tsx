import BooksCardComponents from "@/components/users/books/BooksCardComponents";

export default function BooksPage() {
  return (
    <section className="min-h-screen flex justify-center items-center w-full">
      <div className="w-full h-auto mb-4 mt-[100px] p-4">
        <BooksCardComponents />
      </div>
    </section>
  );
}
