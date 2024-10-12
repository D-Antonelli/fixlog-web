"use client"

import { authenticate } from '@/app/lib/actions';
import { ExclamationCircleIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [role, setRole] = useState('renter'); 
    const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      {/* User role selection */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          I am logging in as:
        </label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="renter">Renter</option>
          <option value="property-manager" disabled>Property Manager (Coming Soon)</option>
        </select>
      </div>

      {/* Email field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="user@fixlog.com"
          required
        />
      </div>

      {/* Password field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
          required
          minLength={6}
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        aria-disabled={isPending}
        className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-400 focus:ring-4 focus:ring-green-300 transition"
      >
        Log In
      </button>
         <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
    </form>
  );
}