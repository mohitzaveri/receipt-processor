const express = require('express');
const receiptsRouter = require('./routes/receipts');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/receipts', receiptsRouter);

app.get('/', (req, res) => {
    res.json({ status: 'Receipt API Running' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;