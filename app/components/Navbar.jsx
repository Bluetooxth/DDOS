import React from "react";
import Link from "next/link";
import { GiChewedSkull } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {


  return (
    <nav className="flex justify-center items-center w-full z-20 mt-5">
      <div className="flex flex-col justify-start items-start lg:container w-full">
        <div className="flex justify-between items-center w-full px-5 py-3 rounded-full navbar">
          {/* Logo */}
          <Link href="/" className="text-3xl font-semibold flex gap-2 text-slate-300 items-center">
            <GiChewedSkull className="text-yellow-500" /> Optimuxx
          </Link>
          {/* Menu */}
          <Link href="https://github.com/Bluetooxth/DDOS" className="">
            <FaGithub className="text-2xl text-slate-200" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;