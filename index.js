const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Importar rutas
const membresiaRoutes = require("./src/routes/membresiaRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");

// Definir rutas
app.use("/api/membresias", membresiaRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => res.send("API de Blockchain funcionando 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
