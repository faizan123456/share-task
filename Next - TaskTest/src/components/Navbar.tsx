"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");

  return (
    <nav className="mt-5 min-h-full flex items-center justify-around py-5">
      <Link
        href={"/?todos=create"}
        className={`${
          todosFilter === "create"
            ? `text-blue-500 px-2 bg-slate-900 py-1 rounded-md transition-all active:border-blue-600
            focus:border-blue-600 border-2 hover:bg-slate-700 focus:outline-none border-transparent`
            : "px-2 py-1 text-gray-500 hover:border-b border-blue-400"
        }`}
      >
        CreateTask
      </Link>
      <Link
        href={"/"}
        className={`${
          todosFilter === null
            ? `text-blue-500 px-2 bg-slate-900 py-1 rounded-md transition-all active:border-blue-600
            focus:border-blue-600 border-2 hover:bg-slate-700 focus:outline-none border-transparent`
            : "px-2 py-1 text-gray-500 hover:border-b border-blue-400 animate-pulse"
        }`}
      >
        All Tasks
      </Link>
      
    </nav>
  );
};

export default Navbar;
