import Sidebar from "@/components/shared/Sidebar";
import Header from "@/components/shared/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="w-full grow flex">
        <Sidebar />
        <main className="grow"></main>
      </div>
    </>
  );
}
