import express from "express";
import { prisma } from "./prismaClient.js";
import cors from "cors"; // 1. Importado corretamente

const app = express();

// 2. ATIVAR O CORS (Isso resolve o erro que você postou)
app.use(cors());

// Configurações de limite
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// --- ROTAS ---

// Rota para BUSCAR todos os usuários
// Rota para BUSCAR todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// 🔹 Buscar usuário por ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});


// Rota para CRIAR novos usuários
app.post('/usuarios', async (req, res) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name || req.body.nome,
                age: parseInt(req.body.age)
            }
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("❌ ERRO NO PRISMA:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// Rota para ATUALIZAR usuário
app.put("/usuarios/:id", async (req, res) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.params.id },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age
            }
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar" });
    }
});

// Rota para DELETAR usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id }
        });
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        res.status(404).json({ error: "Erro ao deletar" });
    }
});

// Rota para salvar a declaração (PATCH)
app.patch('/usuarios/:id/declaracao', async (req, res) => {
    try {
        const { id } = req.params;
        const { mensagem, dataInicio } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                mensagem: mensagem,
                dataInicio: dataInicio
            }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("❌ Erro ao salvar declaração:", error);
        res.status(500).json({ error: "Erro ao salvar os dados da declaração" });
    }
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
const PORT = process.env.PORT || 3000; // O Render vai escolher a porta certa agora
const server = app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Configuração de timeout movida para fora das rotas
server.timeout = 300000;

//versao 2.