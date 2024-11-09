"use client"
import Image from "next/image";
import Link from "next/link";
import Logo from "../../../icons/logo.png";
import { MenuIcon } from "../../../icons/MenuIcon";
import { CloseIcon } from "../../../icons/CloseIcon";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="py-6 md:px-16 px-6 border-b border-zinc-800 md:mb-0 mb-20 fixed top-0 w-full bg-inherit/30 backdrop-blur-xl backdrop-filter">
      <div className={`${isOpen ? "flex-col w-full" : "items-center justify-between"} md:max-w-9xl w-full flex`}>
        <div className={`${isOpen ? "" : "flex flex-row items-end md:w-fit w-full"} flex`}>
          <Link className={`${isOpen ? "w-fit" : "items-center"} flex flex-row gap-2`} href="/">
            <h1 className="">RT Labs</h1>
            <Image src={Logo} width={25} height={25} alt="logo" />
          </Link>
          <button
            className={` ml-auto flex flex-col items-end md:hidden`} 
            onClick={toggleNavbar}
            aria-controls="navbar-default"
            aria-expanded={isOpen ? "true" : "false"}
          >
            {
              isOpen ? (
                <CloseIcon className="w-6 h-6 mr-2" />
              ) : (
                <MenuIcon className="w-6 h-6 mr-2" />
              )
            }
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
        <nav className={`${isOpen ? "flex flex-col min-h-screen" : "hidden"} md:flex md:justify-center md:flex-col`}>
          <ul className={`${isOpen ? "flex flex-col gap-4 items-end justify-between mt-20" : "hidden"} md:flex md:items-center md:gap-x-8`}>
            <li>
              <Link
                href="/projects"
                className="hover:text-purple-400 duration-300"
              >
                Experiments
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-purple-400 duration-300"
              >
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
