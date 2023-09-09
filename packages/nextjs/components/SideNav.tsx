import { CSSProperties } from "react";
import Link from "next/link";

export const SideNav = () => {
  return (
    <nav className=" mt-10 block">
      <ul role="list">
        <li className=" mt-6 relative"></li>
        <h2 className=" font-semibold text-zinc-900"> Routes </h2>
        <div className=" relative mt-3 pl-2">
          {/* LINE */}
          <div
            className="absolute inset-y-0 left-2 w-px bg-zinc-900/10"
            style={{ transform: "none", transformOrigin: "50% 50% 0px" }}
          ></div>

          {/* POINTER */}
          <div
            className="absolute left-2 h-6 w-px bg-emerald-500"
            data-projection-id="27"
            // style={{ top: "4px", opacity: 1, transform: "none", SVGTransform-origin: "50% 50% 0px"}}
          ></div>

          <ul role="list" className="border-l border-transparent">
            <li className="relative">
              <Link
                className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-900"
                href="/dashboard"
                aria-current="page"
              >
                <span className="truncate">Dashboard</span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-900"
                href="/pool"
                aria-current="page"
              >
                <span className="truncate">Stake Pool</span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-900"
                href="/portfolio"
                aria-current="page"
              >
                <span className="truncate">My Portfolio</span>
              </Link>
            </li>
            <li className="relative">
              <Link
                className="flex justify-between gap-2 py-1 pr-3 text-sm transition pl-4 text-zinc-900"
                href="/portfolio"
                aria-current="page"
              >
                <span className="truncate">My Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  );
};
