import { execSync } from "child_process";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function generateCommitMessage() {
    console.log("🔍 Analisando código para sugestões de commit...");

    let diff;
    try {
        diff = execSync("git diff --staged").toString();
        if (!diff.trim()) {
            throw new Error("Nenhuma alteração encontrada no código para gerar mensagem de commit.");
        }
    } catch (error) {
        console.error("❌ Erro ao obter diferenças do Git:", error.message);
        return "Correções e melhorias no código.";
    }

    const prompt = `Analise as seguintes alterações no código e sugira uma mensagem de commit clara e objetiva:\n\n${diff}`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
        
