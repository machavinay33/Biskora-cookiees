import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { contactInquiries, InsertContactInquiry, ContactInquiry, adminUsers, products, InsertAdminUser, AdminUser, InsertProduct, Product } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle<Record<string, never>>> | null = null;
let _pool: Pool | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _pool = new Pool({ connectionString: process.env.DATABASE_URL });
      _db = drizzle(_pool);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function createContactInquiry(inquiry: InsertContactInquiry): Promise<ContactInquiry | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create contact inquiry: database not available");
    return null;
  }

  try {
    const result = await db.insert(contactInquiries).values(inquiry).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create contact inquiry:", error);
    throw error;
  }
}

export async function getAllContactInquiries(): Promise<ContactInquiry[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get contact inquiries: database not available");
    return [];
  }

  try {
    return await db.select().from(contactInquiries);
  } catch (error) {
    console.error("[Database] Failed to get contact inquiries:", error);
    throw error;
  }
}

export async function getContactInquiryById(id: number): Promise<ContactInquiry | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get contact inquiry: database not available");
    return undefined;
  }
  try {
    const result = await db.select().from(contactInquiries).where(eq(contactInquiries.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get contact inquiry by ID:", error);
    throw error;
  }
}

export async function updateContactInquiryStatus(id: number, status: ContactInquiry["status"]): Promise<ContactInquiry | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update contact inquiry status: database not available");
    return null;
  }
  try {
    const result = await db.update(contactInquiries).set({ status, updatedAt: new Date() }).where(eq(contactInquiries.id, id)).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update contact inquiry status:", error);
    throw error;
  }
}

export async function createAdminUser(user: InsertAdminUser): Promise<AdminUser | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create admin user: database not available");
    return null;
  }
  try {
    const result = await db.insert(adminUsers).values(user).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create admin user:", error);
    throw error;
  }
}

export async function getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get admin user: database not available");
    return undefined;
  }
  try {
    const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get admin user by email:", error);
    throw error;
  }
}

export async function createProduct(product: InsertProduct): Promise<Product | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create product: database not available");
    return null;
  }
  try {
    const result = await db.insert(products).values(product).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to create product:", error);
    throw error;
  }
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get product: database not available");
    return undefined;
  }
  try {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get product by ID:", error);
    throw error;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get all products: database not available");
    return [];
  }
  try {
    return await db.select().from(products);
  } catch (error) {
    console.error("[Database] Failed to get all products:", error);
    throw error;
  }
}

export async function updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | null> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update product: database not available");
    return null;
  }
  try {
    const result = await db.update(products).set({ ...product, updatedAt: new Date() }).where(eq(products.id, id)).returning();
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to update product:", error);
    throw error;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete product: database not available");
    return false;
  }
  try {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  } catch (error) {
    console.error("[Database] Failed to delete product:", error);
    throw error;
  }
}
