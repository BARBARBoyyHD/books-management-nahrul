import AuthorsCardComponents from "@/components/users/author/AuthorComponents";

export default function Authorspage() {
  return (
    <section className="min-h-screen flex justify-center items-center w-full">
      <div className="w-full h-auto mt-[100px] mb-4 p-4">
        <AuthorsCardComponents />
      </div>
    </section>
  );
}
