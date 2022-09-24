import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="absolute top-0 left-0 z-10 flex w-full items-center bg-transparent p-4 md:flex-row md:flex-nowrap md:justify-start">
        <div className="mx-autp flex w-full flex-wrap items-center justify-between px-4 md:flex-nowrap md:px-10">
          <a
            className="hidden text-sm font-semibold uppercase text-white lg:inline-block"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
        </div>
      </nav>
    </>
  );
}
