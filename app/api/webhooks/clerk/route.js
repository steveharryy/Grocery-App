import { Webhook } from "svix";
import { headers } from "next/headers";
import { inngest } from "@/inngest/client"; // adjust path if needed

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("❌ Missing Clerk webhook secret");
    return new Response("Missing Clerk webhook secret", { status: 500 });
  }

  const payload = await req.text();
  const headerPayload = Object.fromEntries(headers());

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;
  try {
    evt = wh.verify(payload, headerPayload);
  } catch (err) {
    console.error("❌ Clerk webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  console.log("✅ Clerk event received:", evt.type);

  // Forward to Inngest to handle user sync
  await inngest.send({
    name: `clerk/${evt.type}`,
    data: evt.data,
  });

  return new Response("Webhook received", { status: 200 });
}

// Optional GET handler (prevents 405 for accidental GET requests)
export function GET() {
  return new Response("Clerk webhook endpoint ready", { status: 200 });
}
