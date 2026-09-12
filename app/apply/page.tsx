import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import { discordInvite } from "@/lib/site";

export const metadata: Metadata = { title: "Apply", description: "Faça parte da APES TOGETHA STRONG. Core em formação para Heroic Raid e Mythic+." };
export const dynamic = "force-dynamic";

export default function ApplyPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#070809] px-6 pb-24 pt-32 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">Recrutamento aberto</p>
        <h1 className="mt-4 text-4xl font-black uppercase sm:text-6xl">Junte-se aos Apes</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">Estamos formando nosso core. Conte quem você é, o que joga e o que procura em uma guilda.</p>
        <p className="mt-3 leading-7 text-zinc-400">Nosso foco é Heroic Raid e Mythic+. Queremos construir um grupo consistente, evoluir e nos divertir juntos.</p>
        {discordInvite && <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-orange-400 underline underline-offset-4">Conheça nosso Discord ↗</a>}
        <ApplyForm enabled={Boolean(process.env.DISCORD_APPLY_WEBHOOK_URL)} />
      </div>
    </main>
  );
}
