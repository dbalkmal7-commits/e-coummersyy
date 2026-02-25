"use client"
import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import React from 'react'

export default function Navbar() {

  function handelLogout() {
    signOut({ redirect : true , callbackUrl : "/login"})
  }

  const session = useSession();
  const path = usePathname();

  return<>
  <nav className="bg-blue-500 text-white">
     <div className="container py-4 w-full md:w-[80%] mx-auto flex items-center justify-between">
      <div className='left'>
        <ul className='flex gap-x-4 items-center'>
          <li><Link href="/" className='font-bold text-2xl text-black'><i className="fa-solid text-lime-500 fa-cart-arrow-down"></i>FreshCart</Link></li>
          <li><Link className={path == "/" ? "active" : ""} href="/">Home<i className="fas fa-home"></i></Link></li>
          <li><Link className={path == "/carts" ? "active" : ""} href="/carts">carts <i className="fas fa-shopping-cart"></i></Link></li>
          <li><Link className={path == "/orders" ? "active" : ""} href="/orders">orders <i className="fas fa-receipt"></i></Link></li>
          <li><Link className={path == "/products" ? "active" : ""} href="/products">products <i className="fas fa-box"></i></Link></li>
          <li><Link className={path == "/categories" ? "active" : ""} href="/categories">categories <i className="fas fa-list"></i></Link></li>
          <li><Link className={path == "/brands" ? "active" : ""} href="/brands">brands <i className="fas fa-tags"></i></Link></li>
        </ul>
      </div>
      <div className='right'>
        <ul className='flex gap-x-3'>
          <li><i className='fa-brands fa-instagram'></i></li>
          <li><i className='fa-brands fa-facebook'></i></li>
          <li><i className='fa-brands fa-tiktok'></i></li>
          <li><i className='fa-brands fa-twitter'></i></li>
          <li><i className='fa-brands fa-linkedin'></i></li>
          <li><i className='fa-brands fa-youtube'></i></li>

          {session.data ? <li><Button className='exit' onClick={handelLogout}>sigout <i className="fa-solid fa-person-through-window fa-shake color: rgba(177, 151, 252, 1)"></i></Button></li>  :<>

          
          <li><Link className={path == "/register" ? "active" : ""} href="/register">Register</Link></li>


          <li><Link className={path == "/login" ? "active" : ""} href="/login">Login</Link></li>
          </>
          }
        </ul>
      </div>
      </div>
  </nav>
  </>
}