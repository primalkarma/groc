import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import DashboardItems from "../components/dashboard/DashboardItems";
import DashboardItemsMobile from "../components/dashboard/DashboardItemsMobile";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar (Hidden on small screens) */}
      <div className="hidden border-r bg-sidebar md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center bg-popover border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 font-semibold"
            >
              <Image src="/logo.svg" width={30} height={30} alt="logo" />
              <h3 className="text-4xl text-popover-foreground tracking-tighter font-light">GROCIFY</h3>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 font-medium lg:px-2">
              <DashboardItems />
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full">
        {/* Header (Navigation on small screens) */}
        <header className="flex h-14 items-center gap-4 border-b bg-popover px-4 lg:h-[60px] lg:px-6 ">
          <Link
            href="/"
            className="md:hidden flex items-center justify-center gap-2 font-semibold mr-12"
          >
            <Image src="/logo.svg" width={30} height={30} alt="logo" />
            <h3 className="text-xl tracking-tighter font-light">GROC</h3>
          </Link>
          {/* Navigation for small screens */}
          <div className="md:hidden mx-auto flex-grow overflow-x-auto scrollbar-hide">
            <nav className="flex items-center space-x-4 bg-popover text-grey-800">
              <DashboardItemsMobile />
            </nav>
          </div>
          {/* Placeholder for other header content (visible on all screens) */}
          <div className="ml-auto flex items-center gap-x-5">hello</div>
        </header>
        {/* Main content area */}
        <main className="flex-1 p-4 lg:p-6 bg-[#317039]">{children}</main>
      </div>
    </section>
  );
};

export default DashboardLayout;
