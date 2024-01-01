import dotenv from "dotenv";
import fetch from "node-fetch";
global.fetch = fetch;
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

let conversationHistory = []; // Esta variable debería ser reemplazada por un almacenamiento persistente

const chat = async (req, res) => {
  const apiKey = process.env.API; // Usa una variable de entorno para el API key
  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({ model: "gemini-pro" });

  const { prompt, historial } = req.body; // Recibe el prompt y el historial desde el frontend

  try {
    // Inicializa la conversación con el historial proporcionado
    let chatSession = model.startChat({ history: historial });

    // Envía el mensaje y recibe la respuesta
    const result = await chatSession.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // Actualiza el historial de la conversación
    historial.push({ role: "user", parts: prompt });
    historial.push({ role: "model", parts: text });

    console.log(text);
    res.json({ msg: text, historial }); // Devuelve la respuesta y el historial actualizado
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el procesamiento de la solicitud");
  }
};

export { chat };
