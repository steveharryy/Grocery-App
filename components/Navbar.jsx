"use client";

import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, PackageIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const cartCount = useSelector(state => state.cart.total);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-3 transition-all">

          {/* Logo */}
          <Link href="/" className="relative text-3xl font-bold text-slate-800">
            <span className="text-yellow-500">go</span>cart<span className="text-yellow-500 text-4xl leading-0">.</span>
            <p className="absolute text-[10px] font-bold -top-1 -right-8 px-2 p-0.5 rounded-sm flex items-center gap-1 text-white bg-yellow-500">
              plus
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-slate-700 font-medium">
            <Link href="/" className="hover:text-yellow-600 transition">Home</Link>
            <Link href="/shop" className="hover:text-yellow-600 transition">Shop</Link>
            <Link href="/" className="hover:text-yellow-600 transition">About</Link>
            <Link href="/" className="hover:text-yellow-600 transition">Contact</Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg hover:border-yellow-400 transition">
              <Search size={18} className="text-slate-500" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-400"
                type="text"
                placeholder="Search for products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-2 text-slate-700 hover:text-yellow-600 transition font-semibold">
              <ShoppingCart size={20} />
              Cart
              <span className="absolute -top-2 left-4 text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded-full">{cartCount}</span>
            </Link>

            {/* User buttons */}
            {!user ? (
              <button onClick={openSignIn} className="px-6 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-lg font-semibold">
                Login
              </button>
            ) : (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    labelIcon={<PackageIcon size={16} />}
                    label="My Orders"
                    onClick={() => router.push('/orders')}
                  />
                </UserButton.MenuItems>
              </UserButton>
            )}
          </div>

          {/* Mobile User Buttons */}
          <div className="sm:hidden flex gap-2">
            {!user ? (
              <button onClick={openSignIn} className="px-6 py-1.5 bg-green-600 hover:bg-green-700 text-sm transition text-white rounded-lg font-semibold">
                Login
              </button>
            ) : (
              <>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      labelIcon={<ShoppingCart size={16} />}
                      label="Cart"
                      onClick={() => router.push('/cart')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      labelIcon={<PackageIcon size={16} />}
                      label="My Orders"
                      onClick={() => router.push('/orders')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </>
            )}
          </div>

        </div>
      </div>
      <hr className="border-gray-300" />
    </nav>
  )
}

export default Navbar;
