"use client";
import { useRouter } from "next/navigation";

export default function HomeComponents() {
    const router = useRouter();
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center text-center rounded-2xl px-6 py-20">
      
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
        Welcome To Our Library
      </h1>

      <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
        Discover, explore, and dive into a world of knowledge with your favorite books.
      </p>

      <button onClick={()=> router.push("/books")} className="mt-8 px-6 py-3 text-lg font-semibold bg-cyan-600/50 hover:bg-purple-600/80 text-white backdrop-blur-md rounded-xl shadow-2xl shadow-purple-500 transition-all">
        Browse Books
      </button>

    </section>
  );
}
