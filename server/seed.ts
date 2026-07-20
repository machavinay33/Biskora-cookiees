import { getDb } from "./db";
import { adminUsers } from "../drizzle/schema";
import bcrypt from "bcryptjs";

async function seedAdminUser() {
  const db = await getDb();
  if (!db) {
    console.error("Database not available for seeding.");
    return;
  }

  const email = "admin@biskora.com";
  const password = "biskora2024";
  const name = "Admin User";

  try {
    const existingAdmin = await db.select().from(adminUsers).where(adminUsers.email, email).limit(1);

    if (existingAdmin.length === 0) {
      const passwordHash = await bcrypt.hash(password, 10);
      await db.insert(adminUsers).values({
        email,
        passwordHash,
        name,
        role: "admin",
      });
      console.log("Default admin user seeded successfully.");
    } else {
      console.log("Default admin user already exists.");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
}

seedAdminUser();
