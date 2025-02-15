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
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.5
            })
        });

        const data = await response.json();

        if (!data || !data.choices || data.choices.length === 0) {
            throw new Error("Erro: Resposta inválida da OpenAI.");
        }

        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ Erro ao se comunicar com a OpenAI:", error.message);
        return "Commit automático com melhorias.";
    }
}

async function commitChanges() {
    try {
        let commitMessage = await generateCommitMessage();
        console.log(`📌 Mensagem de commit gerada: ${commitMessage}`);

        // Substituir aspas duplas e simples para evitar conflitos no Git
        commitMessage = commitMessage.replace(/["']/g, "");

        execSync("git add .", { stdio: "inherit" });
        execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
        execSync("git push origin main", { stdio: "inherit" });

        console.log("✅ Commit enviado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao gerar commit:", error.message);
    }
}

commitChanges();
