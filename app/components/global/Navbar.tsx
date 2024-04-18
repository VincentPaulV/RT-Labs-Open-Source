import Image from "next/image";
import Link from "next/link";
import Logo from "../../icons/logo.png";
import logo2 from "../../icons/home_new-removebg-preview.png"

export default function Navbar() {
  return (
    <header className="py-6 md:px-16 px-6 border-b border-zinc-800 z-30 md:mb-28 mb-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image src={Logo} width={25} height={25} alt="logo" />
        </Link>
        <nav>
          <ul className="flex items-center gap-x-8">
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
