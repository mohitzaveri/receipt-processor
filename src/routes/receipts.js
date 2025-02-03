const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { saveReceipt, getReceipt } = require('../storage/receiptStorage');

router.post('/process', (req, res) => {
    const id = uuidv4();
    saveReceipt(id, req.body);
    res.json({ id });
});

router.get('/:id/points', (req, res) => {
    const receipt = getReceipt(req.params.id);
    if (!receipt) {
        return res.status(404).json({ error: "No receipt found for that id." });
    }
    res.json({ points: 0 });
});

module.exports = router;