// Server-side event logging. Zero infra required: events are logged as
// structured JSON (visible in `next dev` / Vercel function logs). If a
// PostHog project key is configured, the event is also forwarded via the
// PostHog capture API. Both paths fail silently — tracking must never break
// a redirect.

interface ServerEvent {
  event: string;
  [key: string]: unknown;
}

export async function logServerEvent(payload: ServerEvent) {
  try {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ ts: new Date().toISOString(), ...payload }));
  } catch {
    // ignore
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

  if (!posthogKey) return;

  try {
    await fetch(`${posthogHost}/capture/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: posthogKey,
        event: payload.event,
        properties: payload,
        distinct_id: (payload.distinctId as string) || "server",
      }),
      cache: "no-store",
    });
  } catch {
    // Never let analytics failures break the redirect.
  }
}
