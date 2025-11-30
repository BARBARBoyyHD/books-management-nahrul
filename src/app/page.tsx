import Navbar from "@/components/NavBar";
import HomeComponents from "@/components/users/HomeComponents";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Navbar />
      <HomeComponents />
    </main>
  );
}
