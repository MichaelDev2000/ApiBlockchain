const Blockchain = require('../service/blockchain.js');

const Block = require('../service/block.js');

let blockchain = new Blockchain();

async function createBlock(req, res) {
    try {
        const { data } = req.body;
        const block = new Block({ data });
        await blockchain.addBlock(block);
        res.status(201).json({ message: `El bloque ha sido guardado correctamente`, blockHash:block.hash, blockData:block.body.data });
    } catch (error) {
        res.status(500).json({ message: "Error al guardar el bloque", error: error.message });
    }
}

function saludar(req, res) {
    res.status(200).json({ message: "Hola Desde la API de Michael" });
}

module.exports = { createBlock, saludar };