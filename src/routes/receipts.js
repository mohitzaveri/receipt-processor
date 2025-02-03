const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { saveReceipt, getReceipt } = require('../storage/receiptStorage');
const { calculatePoints } = require('../services/pointsCalculator');

router.post('/process', (req, res) => {
    try{
        const receipt = req.body;
        const id = uuidv4();
        const points = calculatePoints(receipt);
        saveReceipt(id, { receipt, points });
        res.json({ id });
    } catch (error) {
        res.status(400).json({ error: "The receipt is invalid." });
    }
});

router.get('/:id/points', (req, res) => {
    const data = getReceipt(req.params.id);
    if (!data) {
        return res.status(404).json({ error: "No receipt found for that id." });
    }
    res.json({ points: data.points });
});

module.exports = router;