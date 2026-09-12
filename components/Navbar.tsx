"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { discordInvite } from "@/lib/site";

const links = [["/", "Início"], ["/roster", "Roster"], ["/apply", "Apply"]];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navigation = links.map(([href, label]) => (
    <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined}
      className={`block py-3 transition hover:text-orange-400 ${pathname === href ? "text-orange-400" : "text-zinc-300"}`}>
      {label}
    </Link>
  ));
  const discord = discordInvite ? <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="inline-block border border-orange-500/60 px-4 py-3 text-orange-400 transition hover:bg-orange-500 hover:text-black">Discord ↗</a> : null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <nav aria-label="Navegação principal" className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
           href="/"
          onClick={() => setOpen(false)}
          className="flex items-center"
        >
          <img
            src="/logo-apes.png"
            alt="Apes Togetha Strong"
            className="h-14 w-auto"
          />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wider md:flex">{navigation}{discord}</div>
        <button type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)} className="shrink-0 border border-white/20 px-3 py-2 text-sm font-bold text-white md:hidden">{open ? "Fechar ✕" : "Menu ☰"}</button>
      </nav>
      {open && <nav id="mobile-navigation" aria-label="Navegação no celular" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }} className="space-y-2 border-t border-white/10 px-6 pb-6 pt-3 text-sm font-bold uppercase tracking-wider md:hidden">{navigation}{discord}</nav>}
    </header>
  );
}
