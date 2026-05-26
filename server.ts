import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client on the server side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // AI Generation API endpoint
  app.post("/api/ai/generate", async (req: express.Request, res: express.Response) => {
    try {
      const { prompt, systemInstruction } = req.body;
      
      if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
        return res.status(200).json({ 
          text: `#### ⚠️ Demo Mode Active
It looks like the \`GEMINI_API_KEY\` is not set yet in the Secrets tab. 

Here is a preview of what the NexoraOS AI generates for this task:

*   **Core Subject Integration**: Focused educational pathways configured according to global academic standards.
*   **Time-Block Allocation**: Multi-tiered segments utilizing standard pedagogical modules.
*   **Outcome Assessments**: Automated checkpoints generated for student metrics telemetry.

*Please add your real Gemini API Key in the **Settings > Secrets** panel in AI Studio to enable true high-performance AI generation!*`
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || "You are NexoraOS AI, a helpful SaaS virtual assistant.",
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate AI response." });
    }
  });

  // Vite middleware for development vs static asset serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
