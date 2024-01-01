import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routesEmpresa from "./routes/empresasRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

app.use(cors());

// Middleware para contar los requests
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  console.log(
    `Request: ${req.method} ${req.originalUrl} req nro: ${requestCount}`
  );
  next();
});

// Routing

app.use("/api/empresas", routesEmpresa);

const PORT = process.env.PORT || 4000;

// Usa httpServer en lugar de app para iniciar el servidor
app.listen(4000, "0.0.0.0", () => {
  console.log("Server is running on port 4000");
});
