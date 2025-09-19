import React, { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import {
  Menu,
  X,
  Plane,
  Hotel,
  CalendarDays,
  Eye,
  Home,
  Info,
  Map,
  DollarSign,
  Newspaper,
  Lightbulb,
  Compass,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      mobileMenuRef.current?.classList.remove("animate-slide-up");
      mobileMenuRef.current?.classList.add("animate-slide-down");
      mobileMenuRef.current!.style.display = "block";
    } else {
      document.body.style.overflow = "";
      if (
        mobileMenuRef.current &&
        mobileMenuRef.current.classList.contains("animate-slide-down")
      ) {
        mobileMenuRef.current.classList.remove("animate-slide-down");
        mobileMenuRef.current.classList.add("animate-slide-up");
        const timer = setTimeout(() => {
          if (!mobileMenuOpen && mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
          }
        }, 400);
        return () => clearTimeout(timer);
      } else if (mobileMenuRef.current) {
        mobileMenuRef.current.style.display = "none";
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Text and hover styles - bright cyan scheme for all nav items except Plan which is handled separately
  const navTextColor = "text-white";
  const navHoverTextColor = "hover:text-cyan-400";
  const navHoverBg = "hover:bg-cyan-900/20";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none border-b border-transparent shadow-none`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 select-none transform hover:scale-105 transition-transform duration-200">
              <Lightbulb className="w-8 h-8" />
              <span>Triponic</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center gap-6">
                {/* Home */}
                <NavigationMenuItem>
                  <Link href="/">
                    <span
                      className={`flex items-center gap-1 cursor-pointer px-3 py-2 rounded-full transition font-semibold text-base ${navTextColor} ${navHoverBg} ${navHoverTextColor}`}
                    >
                      <Home className="w-4 h-4" /> Home
                    </span>
                  </Link>
                </NavigationMenuItem>

                {/* About */}
                <NavigationMenuItem>
                  <Link href="/about">
                    <span
                      className={`flex items-center gap-1 cursor-pointer px-3 py-2 rounded-full transition font-semibold text-base ${navTextColor} ${navHoverBg} ${navHoverTextColor}`}
                    >
                      <Info className="w-4 h-4" /> About
                    </span>
                  </Link>
                </NavigationMenuItem>

                {/* Explore */}
                <NavigationMenuItem>
                  <Link href="/explore">
                    <span
                      className={`flex items-center gap-1 cursor-pointer px-3 py-2 rounded-full transition font-semibold text-base ${navTextColor} ${navHoverBg} ${navHoverTextColor}`}
                    >
                      <Map className="w-4 h-4" /> Explore
                    </span>
                  </Link>
                </NavigationMenuItem>

                {/* Plan Dropdown */}
                <NavigationMenuItem
                  className="relative"
                  ref={dropdownRef}
                  onClick={() => setDropdownOpen((open) => !open)}
                >
                  <NavigationMenuTrigger
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 px-3 py-2 rounded-full font-semibold text-base cursor-pointer select-none transition-colors duration-200
                      ${
                        dropdownOpen
                          ? "text-cyan-400"
                          : "text-cyan-300 hover:text-cyan-400"
                      }
                    `}
                  >
                    <Compass className="w-4 h-4" />
                    Plan
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </NavigationMenuTrigger>

                  {dropdownOpen && (
                    <div
                      className="absolute left-0 top-full mt-2 p-3 rounded-xl border border-cyan-400 bg-cyan-900/20 shadow-lg w-56 z-50 animate-fade-in-down"
                      role="menu"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <ul className="flex flex-col gap-1">
                        {[
                          { path: "/flights", icon: Plane, label: "Flights" },
                          { path: "/hotels", icon: Hotel, label: "Hotels" },
                          {
                            path: "/events",
                            icon: CalendarDays,
                            label: "Events",
                          },
                          { path: "/ar-vr", icon: Eye, label: "AR/VR" },
                        ].map(({ path, icon: Icon, label }) => (
                          <li key={path}>
                            <Link href={path}>
                              <a
                                className="flex items-center gap-3 px-3 py-2 rounded-md text-white hover:text-cyan-400 hover:bg-cyan-900/20 font-medium transition cursor-pointer"
                                role="menuitem"
                              >
                                <Icon className="w-5 h-5 text-cyan-400" />
                                <span>{label}</span>
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <Link href="/pricing">
                    <span
                      className={`flex items-center gap-1 cursor-pointer px-3 py-2 rounded-full transition font-semibold text-base ${navTextColor} ${navHoverBg} ${navHoverTextColor}`}
                    >
                      <DollarSign className="w-4 h-4" /> Pricing
                    </span>
                  </Link>
                </NavigationMenuItem>

                {/* Feed */}
                <NavigationMenuItem>
                  <Link href="/feed">
                    <span
                      className={`flex items-center gap-1 cursor-pointer px-3 py-2 rounded-full transition font-semibold text-base ${navTextColor} ${navHoverBg} ${navHoverTextColor}`}
                    >
                      <Newspaper className="w-4 h-4" /> Feed
                    </span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Sign Up & Sign In Buttons */}
          <div className="hidden md:flex items-center gap-3 ml-6">
            <Link href="/signup">
              <Button
                variant="default"
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-cyan-500 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                className="border border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu - always rendered, visibility controlled by classes */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-black/80 backdrop-blur-lg transition-transform duration-300 ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ pointerEvents: mobileMenuOpen ? "auto" : "none" }}
      >
        <nav className="flex flex-col px-4 py-4 space-y-1">
          {/* Mobile Nav Links */}
          <Link href="/">
            <a
              className="flex items-center gap-2 block px-3 py-3 rounded-md hover:text-cyan-400 transition font-semibold text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="w-5 h-5" /> Home
            </a>
          </Link>
          <Link href="/about">
            <a
              className="flex items-center gap-2 block px-3 py-3 rounded-md hover:text-cyan-400 transition font-semibold text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="w-5 h-5" /> About
            </a>
          </Link>
          <Link href="/explore">
            <a
              className="flex items-center gap-2 block px-3 py-3 rounded-md hover:text-cyan-400 transition font-semibold text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map className="w-5 h-5" /> Explore
            </a>
          </Link>

          {/* Plan Mobile Dropdown */}
          <details className="group">
            <summary className="flex items-center gap-2 px-3 py-3 rounded-md cursor-pointer font-semibold text-white hover:text-cyan-400 transition">
              <Compass className="w-5 h-5" />
              Plan
            </summary>
            <div className="flex flex-col pl-6 mt-1 space-y-1">
              <Link href="/flights">
                <a
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:text-cyan-400 hover:bg-cyan-900/20 font-medium transition cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Plane className="w-5 h-5 text-cyan-400" />
                  Flights
                </a>
              </Link>
              <Link href="/hotels">
                <a
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:text-cyan-400 hover:bg-cyan-900/20 font-medium transition cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Hotel className="w-5 h-5 text-cyan-400" />
                  Hotels
                </a>
              </Link>
              <Link href="/events">
                <a
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:text-cyan-400 hover:bg-cyan-900/20 font-medium transition cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <CalendarDays className="w-5 h-5 text-cyan-400" />
                  Events
                </a>
              </Link>
              <Link href="/ar-vr">
                <a
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:text-cyan-400 hover:bg-cyan-900/20 font-medium transition cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Eye className="w-5 h-5 text-cyan-400" />
                  AR/VR
                </a>
              </Link>
            </div>
          </details>
          <Link href="/pricing">
            <a
              className="flex items-center gap-2 block px-3 py-3 rounded-md hover:text-cyan-400 transition font-semibold text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <DollarSign className="w-5 h-5" /> Pricing
            </a>
          </Link>
          <Link href="/feed">
            <a
              className="flex items-center gap-2 block px-3 py-3 rounded-md hover:text-cyan-400 transition font-semibold text-white text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Newspaper className="w-5 h-5" /> Feed
            </a>
          </Link>

          {/* Mobile Sign Up / Sign In */}
          <div className="mt-4 flex flex-col gap-3 px-3">
            <Link href="/signup">
              <Button
                variant="default"
                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold hover:from-cyan-500 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Button>
            </Link>
            <Link href="/signin">
              <Button
                variant="outline"
                className="w-full border border-cyan-400 text-cyan-400 hover:bg-cyan-900/20 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
