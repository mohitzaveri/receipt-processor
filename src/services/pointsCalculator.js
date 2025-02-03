function calculatePoints(receipt) {
    let points = 0;
    
    // Rule 1
    const namePoints = (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;
    points = points + namePoints;

    // Rule 2:
    if (receipt.total.endsWith('.00')) {
        points = points + 50;
    }

    // Rule 3: 
    const totalAmount = parseFloat(receipt.total);
    const remainder = totalAmount % 0.25;
    if (remainder === 0) {
        points = points + 25;
    }

    // Rule 4:
    const itemPairPoints = Math.floor(receipt.items.length / 2) * 5;
    points = points + itemPairPoints;

    // Rule 5:
    receipt.items.forEach(item => {
    const trimmedLength = item.shortDescription.trim().length;
    if (trimmedLength % 3 === 0) {
        const itemPoints = Math.ceil(parseFloat(item.price) * 0.2);
        points = points + itemPoints;
    }
    });

    // Rule 6:
    const [year, month, day] = receipt.purchaseDate.split('-').map(Number);
    if (day % 2 === 1) {
       points = points + 6;
    }

    // Rule 7:
    const [hours, minutes] = receipt.purchaseTime.split(':').map(Number);
    if (hours >= 14 && hours < 16) {
        points = points + 10;
    }

    return points;
}

module.exports = { calculatePoints };