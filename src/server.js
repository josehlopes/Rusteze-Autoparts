const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());


const PartRepository = require('./repository/PartRepository');
const SaleRepository = require('./repository/SaleRepository')
const SaleItemRepository = require('./repository/SaleItemRepository');

const partRepository = new PartRepository();
const saleRepository = new SaleRepository();
const saleItemRepository = new SaleItemRepository();

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





app.get('/saleItem', async (req, res) => {
    try {
        const saleItem = await saleItemRepository.getAll();
        res.json(saleItem);
    } catch (error) {
        console.error("Erro ao obter vendas", error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
});

app.get('/saleItem/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const saleItem = await saleItemRepository.getSaleItemById(id);
        if (!saleItem) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(saleItem);
    } catch (error) {
        console.error('Erro ao obter venda por ID:', error);
        res.status(500).json({ error: 'Erro interno ao buscar a venda' });
    }
});

app.post('/saleItem', async (req, res) => {
    try {
        await saleItemRepository.add(req.body);
        res.status(200).json({ message: 'Item adicionado a venda!' });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possivel adicionar o item' });
    }
});


app.get('/sales', async (req, res) => {
    try {
        const sales = await saleRepository.getAll();
        res.json(sales);
    } catch (error) {
        console.error("Erro ao obter vendas:", error);
        res.status(500).json({ error: 'Erro ao obter vendas' });
    }
});

app.get('/sales/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await saleRepository.getSaleById(id);
        if (!sale) {
            return res.status(404).json({ error: 'Venda não encontrada' });
        }
        res.status(200).json(sale);
    } catch (error) {
        console.error('Erro ao obter venda por ID:', error);
        res.status(500).json({ error: 'Erro interno ao buscar a venda' });
    }
});

app.post('/sales', async (req, res) => {
    try {
        const newSale = await saleRepository.add(req.body);
        res.status(200).json({ sale: newSale });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao adicionar venda' });
    }
});



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
