import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import {
  syncUserCreation,
  syncUserUpdation,
  syncUserDeletion,
} from "@/inngest/function";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserUpdation, syncUserDeletion],
});
