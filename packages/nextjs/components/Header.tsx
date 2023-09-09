import { CSSProperties, ClassAttributes, Fragment, HTMLAttributes, JSX, ReactNode, SVGProps } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../components/Container";
import { AbstractButton } from "./AccountAbstraction";
import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";

function CloseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MobileNavItem({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Popover.Button as={Link} href={href} className="block py-2">
        {children}
      </Popover.Button>
    </li>
  );
}

function MobileNavigation(props: HTMLAttributes<HTMLElement>) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur ">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 " />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm " />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 "
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500 " />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 ">Navigation</h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 ">
                <MobileNavItem href="/app">Dashboard</MobileNavItem>
                <MobileNavItem href="/subs">Subscriptions</MobileNavItem>
                <MobileNavItem href="/comp">Company</MobileNavItem>
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  );
}

function NavItem({ href, children }: { href: string; children: ReactNode }) {
  const isActive = useRouter().pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition rounded-md",
          isActive ? "bg-slate-700 text-white" : "hover:bg-slate-100 hover:text-slate-900",
        )}
      >
        {children}
        {/* {isActive && (
                    <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-700/0 via-blue-700/40 to-blue-700/0" />
                )} */}
      </Link>
    </li>
  );
}

function DesktopNavigation(
  props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>,
) {
  return (
    <nav {...props}>
      <ul className="flex rounded-lg bg-white/90 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur gap-2 p-2">
        <NavItem href="/app">Dashboard</NavItem>
        <NavItem href="/subs">Subscriptions</NavItem>
        <NavItem href="/comp">Company</NavItem>
      </ul>
    </nav>
  );
}

export function Header() {
  return (
    <>
      <header className="pointer-events-none relative z-50 flex flex-col mt-8">
        <div>
          <Container
            className=" w-full"
            style={{ position: "var(--header-inner-position)" } as unknown as CSSProperties}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1"></div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1 pointer-events-auto">
                {/* <ConnectKitButton /> */}
                <AbstractButton />
              </div>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
