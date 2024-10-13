import Image from 'next/image';
import LoginForm from '@/components/login-form';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-gradient-to-b from-blue-100 to-yellow-50">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-4 p-6 bg-white shadow-lg rounded-lg mt-10"> {/* Added margin to top */}
        
        <div className="flex flex-col items-center p-4">
          <Image
            src="/logo-hero.png"
            alt="FixLog Logo"
            width={100}
            height={100}
            className="w-24 h-24 md:w-36 md:h-36"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Welcome to FixLog</h1>
          <p className="text-gray-600 text-center mt-2">
            Manage your property maintenance effortlessly. Please log in to continue.
          </p>
        </div>

        {/* Login form component */}
        <LoginForm />

        <div className="text-xs text-gray-400 mt-4">
          Having issues signing in? Feel free to report on <Link href="https://github.com/D-Antonelli/pinata-hackathon/issues">GitHub page</Link>
        </div>
      </div>
    </main>
  );
}