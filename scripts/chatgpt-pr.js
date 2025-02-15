import { execSync } from "child_process";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

async function generatePRDescription() {
    console.log("🔍 Gerando descrição para Pull Request...");

    const diff = execSync("git diff origin/main").toString();
    const prompt = `Analise essas mudanças no código e sugira uma descrição detalhada para um Pull Request:\n\n${diff}`;

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
    return data.choices[0].message.content;
}

async function createPullRequest() {
    const prDescription = await generatePRDescription();
    console.log(`📌 Descrição do PR gerada: ${prDescription}`);

    execSync(`gh pr create --base main --head feature-branch --title 'Atualizações Automatizadas' --body "${prDescription}"`, { stdio: "inherit" });

    console.log("✅ Pull Request criado com sucesso!");
}

createPullRequest();
