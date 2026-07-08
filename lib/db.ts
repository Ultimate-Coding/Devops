// lib/db.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// النسخة 7 أزالت محرك Rust الافتراضي، لذا يجب تمرير Driver Adapter صراحةً.
// ملف prisma.config.ts يخدم أوامر الـ CLI فقط (migrate/generate) ولا يزوّد
// عميل التشغيل بالاتصال، لذلك نبني المحوّل هنا من DATABASE_URL.
const createPrismaClient = () =>
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
