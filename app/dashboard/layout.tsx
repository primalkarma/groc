import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import DashboardItems from "../components/dashboard/DashboardItems";
import { DollarSign, Globe, Home } from "lucide-react";

export const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Sites",
    href: "/dashboard/sites",
    icon: Globe,
  },
  {
    name: "Pricing",
    href: "/dashboard/pricing",
    icon: DollarSign,
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 font-semibold"
            >
              <Image src="/logo.svg" width={30} height={30} alt="logo" />
              <h3 className="text-4xl tracking-tighter font-light">GROC</h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-2">
              <DashboardItems />
            </nav>
          </div>
        </div>
        {/* {children} */}
      </div>
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="ml-auto flex items-center gap-x-5">hello</div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </section>
  );
};

export default DashboardLayout;
