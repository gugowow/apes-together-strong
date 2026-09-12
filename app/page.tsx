import Link from "next/link";
import { discordInvite } from "@/lib/site";

export default function Home() {
  return (
    <main id="main-content" className="bg-[#070809] text-white">
      {/* HERO */}
      <section className="relative min-h-[760px] overflow-hidden">
        {/* Imagem */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-apes.png')" }}
        />

        {/* Escurecimento para leitura */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070809] via-transparent to-black/30" />

        {/* Conteúdo */}
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-6 pt-20">
          <div className="max-w-2xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.35em] text-orange-400">
              World of Warcraft • Brasil
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-8xl">
              Apes
              <br />
              Togetha
              <br />
              Strong
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-300">
              Estamos construindo nosso core para progressão Heroic, Mythic+ e,
              acima de tudo, para jogar juntos.
            </p>

            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
              WoW é a nossa casa. Mas os macacos também aparecem no Diablo,
              Path of Exile, Dota, Risk of Rain, Project Zomboid e onde mais
              surgir uma ideia ruim.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="bg-orange-500 px-7 py-4 text-sm font-black uppercase tracking-wider text-black transition hover:bg-orange-400"
              >
                Junte-se aos Apes
              </Link>

              {discordInvite && <a
                href={discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 bg-black/30 px-7 py-4 text-sm font-black uppercase tracking-wider backdrop-blur-sm transition hover:border-orange-400 hover:text-orange-400"
              >
                Discord ↗
              </a>}
            </div>
          </div>
        </div>
      </section>

      {/* OBJETIVOS */}
      <section className="border-t border-white/10 bg-[#070809] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
              O que estamos fazendo
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase">
              Construindo o Core
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            <div className="bg-[#0c0d0e] p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                Foco atual
              </span>
              <h3 className="mt-4 text-2xl font-black">Heroic Raid</h3>
              <p className="mt-3 leading-7 text-zinc-400">
                Estamos formando um core consistente para progredir juntos no
                conteúdo Heroic.
              </p>
            </div>

            <div className="bg-[#0c0d0e] p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                Mythic+
              </span>
              <h3 className="mt-4 text-2xl font-black">Keys & Progressão</h3>
              <p className="mt-3 leading-7 text-zinc-400">
                Keys, gear, diversão e evolução dos personagens dentro e fora
                dos dias de raid.
              </p>
            </div>

            <div className="bg-[#0c0d0e] p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                Objetivo futuro
              </span>
              <h3 className="mt-4 text-2xl font-black">Mythic Raid</h3>
              <p className="mt-3 leading-7 text-zinc-400">
                Quando o core estiver pronto, queremos descobrir até onde esses
                macacos conseguem chegar.
              </p>
            </div>
          </div>
        </div>
      </section>
          {/* HORÁRIOS DE RAID */}
      <section className="border-t border-white/10 bg-[#090a0b] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
                Raid Schedule
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
                Horários de Raid
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-zinc-400">
                O horário em que os macacos tentam coordenar mais de dois
                neurônios ao mesmo tempo.
              </p>

              <p className="mt-4 text-sm text-zinc-500">
                Foco atual: Heroic • Core em formação
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["SEG", "22:00", "00:00"],
                ["TER", "22:00", "00:00"],
                ["QUA", "22:00", "00:00"],
              ].map(([day, start, end]) => (
                <div
                  key={day}
                  className="border border-white/10 bg-[#0d0f10] p-6 text-center"
                >
                  <p className="text-sm font-black uppercase tracking-[0.3em] text-orange-400">
                    {day}
                  </p>

                  <p className="mt-5 text-3xl font-black">{start}</p>

                  <p className="my-2 text-xs uppercase tracking-widest text-zinc-600">
                    até
                  </p>

                  <p className="text-xl font-bold text-zinc-300">{end}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-right text-xs uppercase tracking-[0.25em] text-zinc-600">
            Horário de Brasília
          </div>
        </div>
      </section>
    </main>
  );
}
