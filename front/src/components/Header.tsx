import { Search, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-surface/80 backdrop-blur-xl flex items-center justify-between px-8 h-16 border-b border-outline-variant/10">
      <div className="flex items-center gap-8">
        {/* <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-primary-container tracking-tight">
          AnalyticalAtelier
        </span>
        <nav className="hidden md:flex items-center gap-6">
          <a
            className="text-primary font-semibold border-b-2 border-primary transition-all duration-200 py-1"
            href="#"
          >
            Performance Analytics
          </a>
          <a
            className="text-secondary hover:text-on-surface transition-all duration-200 py-1"
            href="#"
          >
            Student Records
          </a>
          <a
            className="text-secondary hover:text-on-surface transition-all duration-200 py-1"
            href="#"
          >
            Curriculum
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden lg:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
            size={16}
          />
          <input
            className="bg-surface-container-highest border-none rounded-md pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:ring-offset-2 w-64 outline-none"
            placeholder="Search cohorts..."
            type="text"
          />
        </div>

        <button className="p-2 transition-all duration-200 hover:bg-surface-container-high rounded-full text-secondary">
          <Bell size={20} />
        </button>

        <button className="p-2 transition-all duration-200 hover:bg-surface-container-high rounded-full text-secondary">
          <Settings size={20} />
        </button>

        <div className="h-8 w-8 rounded-full overflow-hidden border border-outline-variant/20">
          <img
            alt="Administrator Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-Zg75exR-9goajoVxhUgco0j6dXrx768ymr5lHylHUv70p8rfAqeB6RqFbh_64Ru-7WLLX44eakLI2Q9QCfl-h4DVA-uPQ3E5CC8m1Lp0csDv5D0Y0aF332klaeaRt02LrpsvskPr6uoTN_9xus0nNtdcpPNX9l_82i789QeOIw8XyHBkyWsb2qXzpR11gumDddmusa1OOZukumdCpz0Q4KsuCjmZyuyBPLAFIlxBm2q1o4SFGW3hko6UhZu52-GSodnI9pbctLI"
            referrerPolicy="no-referrer"
          />
        </div>
     */}
      </div>
    </header>
  );
}
