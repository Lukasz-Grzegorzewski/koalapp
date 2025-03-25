"use client";

import { SignedIn } from "@clerk/clerk-react";
import {
  ClerkLoaded,
  SignInButton,
  UserButton,
  // SignedIn,
  // SignedOut,
  // SignInButton,
  // SignUpButton,
  // UserButton,
  useUser,
} from "@clerk/nextjs";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";

import Form from "next/form";
import Link from "next/link";

export default function Header() {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      // Free from CLERK only for development
      const response = await user?.createPasskey();
      console.log(`response => `, response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex flex-wrap justify-between items-center w-full">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          Koalapp
        </Link>

        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for products"
            className="bg-gray-100 px-4 py-2 rounded focus:outline-none focus:ring-2 focus-visible:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
          />
        </Form>

        <div
          className="
            flex flex-1 items-center
            space-x-4 mt-4
            sm:mt-0 md:flex-none
          "
        >
          <Link
            href="/basket"
            className="
            relative
            flex flex-1 justify-center items-center
            bg-blue-500 text-white font-bold py-2 px-4 rounded
            hover:bg-blue-700
            sm:justify-start sm:flex-none
          "
          >
            <TrolleyIcon className="w-6 h-6" /> Basket
          </Link>
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="
                relative
                flex flex-1 justify-center items-center
                bg-blue-500 text-white font-bold py-2 px-4 rounded
                hover:bg-blue-700
                sm:justify-start sm:flex-none
                space-x-2
              "
              >
                <PackageIcon className="w-6 h-6" /> Orders
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400"> Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="
                py-2 px-4 rounded bg-white animate-pulse text-blue-500 font-bold 
                border border-blue-300 
                hover:bg-blue-700 hover:text-white
              "
              >
                Create a passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
