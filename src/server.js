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

app.get('/parts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await partRepository.getPartById(id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Erro ao obter peça por ID:', error);
        res.status(500).json({ error: 'Erro interno ao buscar peça' });
    }
});

app.put('/parts/:id', async (req, res) => {
    try {
        const product = await partRepository.update(req.body);
        res.status(200).json({ error: 'Produto atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao obter peça por ID:', error);
        res.status(500).json({ error: 'Erro interno ao buscar peça' });
    }
});

app.put('/parts', async (req, res) => {
    try {
        await partRepository.update(req.body);
        res.status(200).json({ error: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter peças' });
    }
});

app.delete('/parts', async (req, res) => {
    try {
        await partRepository.delete(req.body);
        res.status(200).json({ error: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter peças' });
    }
});

app.post('/parts', async (req, res) => {
    try {
        await partRepository.add(req.body);
        res.status(200).json({ error: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter peças' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
