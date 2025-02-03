function calculatePoints(receipt) {
    let points = 0;
    
    // Rule 1: Points for Name - 1 Point each for Character
    points = points + (receipt.retailer.match(/[a-zA-Z0-9]/g) || []).length;

    // Rule 2: Round dollar amount - 50 points
    if (receipt.total.endsWith('.00')) {
        points = points + 50;
    }

    // Rule 3: Multiple of 0.25 - 25points
    if (parseFloat(receipt.total) % 0.25 === 0) {
        points = points + 25;
    }

    // Rule 4: Every two items - 5 ponits
    points = points + Math.floor(receipt.items.length / 2) * 5;

    // Rule 5: Description length multiple of 3 
    receipt.items.forEach(item => {
        if (item.shortDescription.trim().length % 3 === 0) {
            points = points + Math.ceil(parseFloat(item.price) * 0.2);
        }
    });

    // Rule 6: Odd day - 6 points
    const purchaseDay = new Date(receipt.purchaseDate).getDate();
    if (purchaseDay % 2 === 1) {
        points = points + 6;
    }

    // Rule 7: Time between 2:00pm and 4:00pm - 10 Points
    const [hours, minutes] = receipt.purchaseTime.split(':').map(Number);
    if (hours >= 14 && hours < 16) {
        points = points + 10;
    }

    return points;
}

module.exports = { calculatePoints };