"use client";

import { useState, type FormEvent } from "react";
import { classes, roles } from "@/lib/site";

const fieldStyle =
  "w-full border border-white/15 bg-[#0c0d0e] px-4 py-3 text-base text-white outline-none transition focus:border-orange-400";

const labelStyle = "mb-2 block text-sm font-bold text-zinc-200";

type Shape = "circle" | "square" | "triangle";

const shapes: { id: Shape; symbol: string; name: string }[] = [
  { id: "circle", symbol: "●", name: "círculo" },
  { id: "square", symbol: "■", name: "quadrado" },
  { id: "triangle", symbol: "▲", name: "triângulo" },
];

export default function ApplyForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  // Teste cognitivo extremamente avançado.
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
  const [apeApproved, setApeApproved] = useState(false);
  const [apeMessage, setApeMessage] = useState(
    "Selecione o círculo e coloque no buraco do círculo."
  );

  function selectShape(shape: Shape) {
    if (apeApproved) return;

    setSelectedShape(shape);
    setApeMessage(
      shape === "circle"
        ? "Boa. Agora clique no buraco onde esse negócio obviamente entra."
        : "Interessante escolha. Agora tente encaixar isso em algum lugar."
    );
  }

  function placeShape(hole: Shape) {
    if (!selectedShape || apeApproved) return;

    if (selectedShape === "circle" && hole === "circle") {
      setApeApproved(true);
      setSelectedShape(null);
      setApeMessage("✓ Capacidade cognitiva suficiente para Heroic detectada.");
      return;
    }

    setSelectedShape(null);
    setApeMessage("Isso explica nossos logs. Tente novamente.");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") return;

    if (!apeApproved) {
      setStatus("error");
      setMessage("Complete o Teste Cognitivo dos Apes antes de enviar.");
      return;
    }

    const form = event.currentTarget;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Não foi possível enviar agora. Tente novamente."
        );
      }

      setStatus("success");
      setMessage(
        "Apply enviado! A liderança entrará em contato pelo Discord informado."
      );

      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar. Confira sua conexão e tente novamente."
      );
    }
  }

  return (
    <form onSubmit={submit} className="mt-10 space-y-6">
      {!enabled && (
        <p
          role="status"
          className="border border-orange-400/30 bg-orange-400/5 p-4 text-sm leading-6 text-orange-200"
        >
          O formulário estará disponível em breve. Por enquanto, fale com a
          liderança pelo Discord.
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="discord" className={labelStyle}>
            Seu usuário no Discord *
          </label>
          <input
            id="discord"
            name="discord"
            required
            maxLength={80}
            autoComplete="off"
            placeholder="seu_usuario"
            className={fieldStyle}
          />
        </div>

        <div>
          <label htmlFor="character" className={labelStyle}>
            Nome do personagem *
          </label>
          <input
            id="character"
            name="character"
            required
            maxLength={60}
            placeholder="Nome do seu personagem"
            className={fieldStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="realm" className={labelStyle}>
          Servidor (realm) *
        </label>
        <input
          id="realm"
          name="realm"
          required
          maxLength={80}
          placeholder="Ex.: Azralon"
          className={fieldStyle}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="classe" className={labelStyle}>
            Classe *
          </label>
          <select
            id="classe"
            name="classe"
            required
            defaultValue=""
            className={fieldStyle}
          >
            <option value="" disabled>
              Selecione sua classe
            </option>
            {classes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="role" className={labelStyle}>
            Função *
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue=""
            className={fieldStyle}
          >
            <option value="" disabled>
              Selecione sua função
            </option>
            {roles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="profile" className={labelStyle}>
          Armory ou Raider.IO *
        </label>
        <input
          id="profile"
          name="profile"
          type="url"
          required
          maxLength={300}
          placeholder="https://..."
          className={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="logs" className={labelStyle}>
          Warcraft Logs{" "}
          <span className="font-normal text-zinc-400">(opcional)</span>
        </label>
        <input
          id="logs"
          name="logs"
          type="url"
          maxLength={300}
          placeholder="https://..."
          aria-describedby="logs-help"
          className={fieldStyle}
        />
        <p id="logs-help" className="mt-2 text-sm text-zinc-400">
          Caso tenha algum log recente, cole aqui o link.
        </p>
      </div>

      <div>
        <label htmlFor="availability" className={labelStyle}>
          Disponibilidade para raid *
        </label>
        <input
          id="availability"
          name="availability"
          required
          maxLength={200}
          placeholder="Quais dias você consegue jogar?"
          aria-describedby="raid-times"
          className={fieldStyle}
        />
        <p id="raid-times" className="mt-2 text-sm text-zinc-400">
          Segunda, terça e quarta, das 22h à meia-noite — horário de Brasília.
        </p>
      </div>

      <div>
        <label htmlFor="about" className={labelStyle}>
          Conte um pouco sobre você *
        </label>
        <textarea
          id="about"
          name="about"
          required
          minLength={10}
          maxLength={1000}
          rows={5}
          placeholder="Sua experiência, o que busca na guilda e o que gosta de jogar."
          className={`${fieldStyle} resize-y`}
        />
      </div>

      {/* TESTE COGNITIVO DOS APES */}
      <section className="border border-orange-500/25 bg-[#0a0b0c] p-6">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-orange-400">
            Sistema anti-bot de última geração
          </p>

          <h2 className="mt-2 text-xl font-black uppercase text-white">
            Teste Cognitivo dos Apes
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Prove que você possui capacidade intelectual suficiente para
            integrar o core.
          </p>
        </div>

        <p className="mb-5 text-sm font-bold text-zinc-200">
          {apeMessage}
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* PEÇAS */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Peças
            </p>

            <div className="flex min-h-28 items-center justify-center gap-3 border border-white/10 bg-black/30 p-4">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  disabled={apeApproved}
                  onClick={() => selectShape(shape.id)}
                  aria-label={`Selecionar ${shape.name}`}
                  className={`flex h-16 w-16 items-center justify-center text-5xl transition ${
                    selectedShape === shape.id
                      ? "scale-110 text-orange-400"
                      : "text-zinc-300 hover:scale-105 hover:text-orange-300"
                  }`}
                >
                  {shape.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* BURACOS */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">
              Tecnologia de encaixe
            </p>

            <div className="flex min-h-28 items-center justify-center gap-3 border border-white/10 bg-[#111315] p-4">
              {shapes.map((shape) => (
                <button
                  key={shape.id}
                  type="button"
                  disabled={apeApproved}
                  onClick={() => placeShape(shape.id)}
                  aria-label={`Buraco de ${shape.name}`}
                  className="flex h-16 w-16 items-center justify-center border border-dashed border-zinc-600 text-5xl text-zinc-700 transition hover:border-orange-400 hover:text-zinc-500"
                >
                  {shape.symbol}
                </button>
              ))}
            </div>
          </div>
        </div>

        {apeApproved && (
          <div className="mt-5 border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm font-bold text-emerald-300">
            🦍 MACACO VERIFICADO — intelecto compatível com Heroic.
          </div>
        )}
      </section>

      {/* HONEYPOT */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 accent-orange-500"
        />
        <span>
          Concordo em compartilhar estas informações com a liderança para
          avaliar meu Apply e entrar em contato pelo Discord. *
        </span>
      </label>

      <button
        type="submit"
        disabled={!enabled || status === "sending" || !apeApproved}
        className="w-full bg-orange-500 px-6 py-4 font-black uppercase tracking-wider text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "sending"
          ? "Enviando…"
          : !apeApproved
            ? "Macaco ainda não verificado"
            : "Enviar Apply"}
      </button>

      <p
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={`text-sm leading-6 ${
          status === "error" ? "text-red-300" : "text-emerald-300"
        }`}
      >
        {message}
      </p>
    </form>
  );
}