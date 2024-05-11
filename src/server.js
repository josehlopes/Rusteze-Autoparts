const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


const PartRepository = require('./repository/PartRepository');
const partRepository = new PartRepository();

app.get('/parts', async (req, res) => {
    try {
        const parts = await partRepository.getAll();
        res.json(parts);
    } catch (error) {
        console.error("Erro ao obter peças:", error);
        res.status(500).json({ error: 'Erro ao obter peças' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
