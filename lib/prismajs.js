// lib/prisma.js
const { PrismaClient } = require("@prisma/client");

// Creamos un singleton para evitar múltiples conexiones en dev
const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"], // opcional: logs de Prisma
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
