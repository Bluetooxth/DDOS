import React from "react";
import Link from "next/link";
import { FiShield } from "react-icons/fi";

const Navbar = () => {


  return (
    <nav className="flex justify-center items-center w-full z-20 navbar">
      <div className="flex flex-col justify-start items-start lg:container w-full px-5 py-3">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link href="/" className="text-3xl font-semibold flex gap-2 items-center">
            <FiShield /> Optimux
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;