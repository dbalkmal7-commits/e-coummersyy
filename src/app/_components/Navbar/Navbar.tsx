"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  function handelLogout() {
    signOut({ redirect: true, callbackUrl: "/login" });
  }

  const session = useSession();
  const path = usePathname();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!session.data) {
      setCartCount(0);
      return;
    }

    const fetchCartCount = async () => {
      try {
        const res = await fetch("/api/cart-count", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        setCartCount(data.count ?? 0);
      } catch {
        // ignore
      }
    };

    fetchCartCount();
  }, [session.data]);

  return (
    <nav className="bg-blue-500 text-white">
      <div className="container py-4 w-full md:w-[90%] mx-auto flex items-center">
        <ul className="flex items-center gap-4 w-full justify-between whitespace-nowrap overflow-x-auto">
          <li>
            <Link href="/" className='font-bold text-2xl text-black flex items-center gap-1'>
              <i className="fa-solid text-lime-500 fa-cart-arrow-down"></i>
              <span className="hidden sm:inline">FreshCart</span>
            </Link>
          </li>
          <li>
            <Link
              className={`${path == "/" ? "active" : ""} flex items-center gap-1`}
              href="/"
            >
              <span className="hidden sm:inline">Home </span>
              <i className="fas fa-home"></i>
            </Link>
          </li>
          <li>
            <Link
              className={`${path == "/carts" ? "active" : ""} flex items-center gap-1`}
              href="/carts"
            >
              <span className="hidden sm:inline">carts </span>
              <span className="relative inline-flex">
                <i className="fas fa-shopping-cart"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 sm:static sm:ml-1 inline-flex min-w-[18px] h-[18px] rounded-full bg-red-500 text-[11px] leading-none text-white items-center justify-center">
                    {Math.min(cartCount, 99)}
                  </span>
                )}
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={`${path == "/orders" ? "active" : ""} flex items-center gap-1`}
              href="/orders"
            >
              <span className="hidden sm:inline">orders </span>
              <i className="fas fa-receipt"></i>
            </Link>
          </li>
          <li>
            <Link
              className={`${path == "/products" ? "active" : ""} flex items-center gap-1`}
              href="/products"
            >
              <span className="hidden sm:inline">products </span>
              <i className="fas fa-box"></i>
            </Link>
          </li>
          <li>
            <Link
              className={`${path == "/categories" ? "active" : ""} flex items-center gap-1`}
              href="/categories"
            >
              <span className="hidden sm:inline">categories </span>
              <i className="fas fa-list"></i>
            </Link>
          </li>
          <li>
            <Link
              className={`${path == "/brands" ? "active" : ""} flex items-center gap-1`}
              href="/brands"
            >
              <span className="hidden sm:inline">brands </span>
              <i className="fas fa-tags"></i>
            </Link>
          </li>
          <li className='flex items-center gap-3'>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-facebook'></i>
            <i className='fa-brands fa-tiktok'></i>
            <i className='fa-brands fa-twitter'></i>
            <i className='fa-brands fa-linkedin'></i>
            <i className='fa-brands fa-youtube'></i>
          </li>

          {session.data ? (
            <li>
              <Button className="exit flex items-center gap-1" onClick={handelLogout}>
                sigout
                <i className="fa-solid fa-person-through-window fa-shake color: rgba(177, 151, 252, 1)"></i>
              </Button>
            </li>
          ) : (
            <>
              <li>
                <Link className={path == "/register" ? "active" : ""} href="/register">
                  Register
                </Link>
              </li>
              <li>
                <Link className={path == "/login" ? "active" : ""} href="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}