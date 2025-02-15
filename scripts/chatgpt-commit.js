import { execSync } from "child_process";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function generateCommitMessage() {
    console.log("🔍 Analisando código para sugestões de commit...");

    const diff = execSync("git diff --staged").toString();
    const prompt = `Analise o seguinte código alterado e sugira uma mensagem de commit clara e objetiva:\n\n${diff}`;

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
        throw new Error("Erro: Resposta inválida da OpenAI. Verifique sua API Key e tente novamente.");
    }

    return data.choices[0].message.content.trim();
}

async function commitChanges() {
    try {
        const commitMessage = await generateCommitMessage();
        console.log(`📌 Mensagem de commit gerada: ${commitMessage}`);

        execSync("git add .");
        execSync(`git commit -m "${commitMessage}"`);
        execSync("git push origin main");

        console.log("✅ Commit enviado com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao gerar commit:", error.message);
    }
}

commitChanges();
