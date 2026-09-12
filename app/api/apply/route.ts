import { classes, roles } from "@/lib/site";

export const runtime = "nodejs";
const error = (message: string, status: number) => Response.json({ error: message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return error("Origem não permitida.", 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return error("Formato inválido.", 415);
  if (Number(request.headers.get("content-length")) > 16000) return error("Formulário muito grande.", 413);
  let data: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("Formulário vazio.", 400);
    const decoder = new TextDecoder();
    let body = "";
    let bytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 16000) { await reader.cancel(); return error("Formulário muito grande.", 413); }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    const parsed = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return error("Formulário inválido.", 400);
    data = parsed;
  } catch { return error("Formulário inválido.", 400); }
  if (data.website) return error("Não foi possível validar o formulário.", 400);
  const limits: Record<string, [number, number]> = { discord: [2, 80], character: [1, 60], realm: [1, 80], classe: [1, 30], role: [1, 10], profile: [1, 300], logs: [0, 300], availability: [1, 200], about: [10, 1000] };
  const clean: Record<string, string> = {};
  for (const [key, [min, max]] of Object.entries(limits)) {
    if (typeof data[key] !== "string") return error("Confira os campos do formulário.", 400);
    const value = (data[key] as string).trim();
    if (value.length < min || value.length > max) return error("Confira o tamanho dos campos do formulário.", 400);
    clean[key] = value;
  }
  if (!(classes as readonly string[]).includes(clean.classe) || !(roles as readonly string[]).includes(clean.role) || data.consent !== "on") return error("Confira a classe, a função e o consentimento.", 400);
  if (clean.profile) {
    try { if (new URL(clean.profile).protocol !== "https:") return error("Use um link de perfil que comece com https://.", 400); }
    catch { return error("O link do perfil é inválido.", 400); }
  }
  const secret = process.env.DISCORD_APPLY_WEBHOOK_URL;
  if (!secret) return error("Os Applies ainda não estão disponíveis. Fale com a liderança pelo Discord.", 503);
  let webhook: URL;
  try {
    webhook = new URL(secret);
    if (webhook.protocol !== "https:" || webhook.hostname !== "discord.com" || !/^\/api(?:\/v\d+)?\/webhooks\/\d+\/[\w-]+$/.test(webhook.pathname)) throw new Error();
    webhook.searchParams.set("wait", "true");
  } catch { return error("Os Applies estão temporariamente indisponíveis.", 503); }
  const names: Record<string, string> = { discord: "Discord", character: "Personagem", realm: "Servidor", classe: "Classe", role: "Função", profile: "Armory/Raider.IO", logs: "Warcraft Logs", availability: "Disponibilidade", about: "Sobre o jogador" };
  try {
    const response = await fetch(webhook, {
      method: "POST", headers: { "Content-Type": "application/json" }, signal: AbortSignal.timeout(10000),
      body: JSON.stringify({ allowed_mentions: { parse: [] }, embeds: [{ title: "Novo Apply — APES TOGETHA STRONG", color: 0xf97316, fields: Object.entries(clean).map(([key, value]) => ({ name: names[key], value: value || "Não informado", inline: ["classe", "role", "realm"].includes(key) })), timestamp: new Date().toISOString() }] }),
    });
    if (!response.ok) return error(response.status === 429 ? "Muitos envios agora. Aguarde um pouco e tente novamente." : "O Discord não confirmou o envio. Tente novamente mais tarde.", response.status === 429 ? 429 : 502);
    return Response.json({ ok: true });
  } catch { return error("Não foi possível confirmar o envio. Confira com a liderança antes de tentar novamente.", 502); }
}
