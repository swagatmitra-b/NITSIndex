import SidePanel from "@/components/SidePanel";
import SessionProvider from "@/lib/SessionProvider";
import ContextProvider from "@/lib/ContextProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBarInner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session) redirect("/");
  return (
    <SessionProvider session={session}>
      <ContextProvider>
        <section className="flex flex-col">
          <NavBar />
          <div className="flex">
            <SidePanel />
            {children}
          </div>
        </section>
      </ContextProvider>
    </SessionProvider>
  );
}
