import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <div className="grid grid-cols-[1fr] grid-rows-[auto_1fr] md:grid-cols-[260px_1fr] lg:grid-cols-[300px_1fr] md:grid-rows-[auto_1fr] min-h-screen">
      <Header className="col-span-2" />
      <Sidebar />
      <main className="grow"></main>
    </div>
  );
}
