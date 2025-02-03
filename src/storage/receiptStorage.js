const receipts = new Map();

function saveReceipt(id, data) {
    receipts.set(id, data);
}

function getReceipt(id) {
    return receipts.get(id);
}

module.exports = { saveReceipt, getReceipt };