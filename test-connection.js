// Importa dotenv para carregar .env
import "dotenv/config";

// Importa Prisma Client
import { PrismaClient } from "@prisma/client";

// Cria instância do Prisma
const prisma = new PrismaClient();

async function main() {
  try {
    // Testa a conexão
    await prisma.$connect();
    console.log("✅ Conexão com MongoDB funcionando!");

    // Testa o model User
    const users = await prisma.user.findMany();
    console.log("Usuários no banco:", users);
  } catch (err) {
    console.error("❌ Erro ao acessar o banco ou usar o schema:", err);
  } finally {
    await prisma.$disconnect();
  }
}

// Executa
main();
