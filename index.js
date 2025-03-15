const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/database");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Importar archivo de rutas general
const apiRoutes = require("./src/routes/api");

// Definir rutas principales
app.use("/api", apiRoutes);

app.get("/", (req, res) => res.send("API de Blockchain funcionando 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
