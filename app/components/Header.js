import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="BuyWheels" width={60} height={60} />
            <Link href="/" className="text-2xl font-bold text-[#13264C]">
              BuyWheels
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}