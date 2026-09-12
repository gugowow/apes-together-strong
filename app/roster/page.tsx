"use client";

import { useState } from "react";
import Image from "next/image";

const players = [
  { nick: "Simplicity", classe: "Priest", role: "Healer", image: "/roster/simplicityv2.png" },
  { nick: "Palaton", classe: "Paladino", role: "Tank", image: "/roster/palaton.png" },
  { nick: "Knagen", classe: "Death Knight", role: "Tank", image: "/roster/knagenv2.png" },
  { nick: "littlethundr", classe: "Shaman", role: "Healer", image: "/roster/littlethundr.png" },
  { nick: "Marktothko", classe: "Paladino", role: "DPS", image: "/roster/marktothko.png" },
  { nick: "Punidor", classe: "Shaman", role: "DPS", image: "/roster/punidor.png" },
  { nick: "Arhün", classe: "Warrior", role: "DPS", classColor: "#C69B6D", image: "/roster/arhun.png",},
];

const filters = ["Todos", "Tank", "Healer", "DPS"];

export default function RosterPage() {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredPlayers =
    activeFilter === "Todos"
      ? players
      : players.filter((player) => player.role === activeFilter);

  return (
    <main id="main-content" className="min-h-screen bg-[#070809] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
            Conheça a tropa
          </p>

          <h1 className="mt-4 text-5xl font-black uppercase sm:text-7xl">
            The Apes
          </h1>

          <p className="mt-4 max-w-xl text-zinc-400">
            Jogadores diferentes. Um único neurônio compartilhado.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={activeFilter === item}
              onClick={() => setActiveFilter(item)}
              className={`border px-5 py-3 text-xs font-bold uppercase tracking-widest transition ${
                activeFilter === item
                  ? "border-orange-500 bg-orange-500 text-black"
                  : "border-white/10 bg-[#0d0f10] text-zinc-400 hover:border-orange-400 hover:text-orange-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlayers.map((player) => (
            <article
              key={player.nick}
              className="overflow-hidden bg-[#0c0d0e] transition-transform duration-300 motion-safe:hover:-translate-y-1"
            >
              <Image
                src={player.image}
                alt={`${player.nick} — ${player.classe} — ${player.role}`}
                width={1086}
                height={1448}
                sizes="(min-width: 1280px) 411px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="block h-auto w-full"
              />
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

