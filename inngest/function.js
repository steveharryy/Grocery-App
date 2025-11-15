import { inngest } from "./client";
import prisma from "@/lib/prisma";

// 🧩 Handle user creation
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-create" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event;

    try {
      const user = await prisma.user.create({
        data: {
          id: data.id,
          email: data.email_addresses?.[0]?.email_address || null,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || null,
          image: data.image_url || null,
        },
      });
      console.log("✅ User created in Neon:", user.id);
    } catch (error) {
      console.error("❌ Failed to create user in Neon:", error);
    }
  }
);

// 🧩 Handle user update
export const syncUserUpdation = inngest.createFunction(
  { id: "sync-user-update" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;

    try {
      const user = await prisma.user.update({
        where: { id: data.id },
        data: {
          email: data.email_addresses?.[0]?.email_address || null,
          name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || null,
          image: data.image_url || null,
        },
      });
      console.log("✅ User updated in Neon:", user.id);
    } catch (error) {
      console.error("❌ Failed to update user in Neon:", error);
    }
  }
);

// 🧩 Handle user deletion
export const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-delete" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;

    try {
      await prisma.user.delete({
        where: { id: data.id },
      });
      console.log("🗑️ User deleted in Neon:", data.id);
    } catch (error) {
      console.error("❌ Failed to delete user in Neon:", error);
    }
  }
);
