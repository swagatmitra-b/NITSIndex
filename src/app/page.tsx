import TheWhy from "@/components/TheWhy";
import NavBarOuter from "@/components/NavBarOuter";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
export default async function Home() {
  const session = await getServerSession();
  if (session) redirect("/home");
  return (
    <div className="">
      <NavBarOuter />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-1/2">
          <div className="my-14 text-center">
            <h1 className="text-4xl font-semibold">NITSIndex</h1>
            <p className="text-lg">A popularity index for NIT Silchar</p>
          </div>
          <TheWhy />
        </div>
      </main>
    </div>
  );
}
