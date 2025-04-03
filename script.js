// Function to calculate and display results
function calculateProfit() {
    // Get input values
    const itemPrice = parseFloat(document.getElementById('itemPrice').value) || 0;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const costOfGoods = parseFloat(document.getElementById('costOfGoods').value) || 0;
    const shippingCost = parseFloat(document.getElementById('shippingCost').value) || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;

    // Only calculate if we have valid inputs
    if (itemPrice > 0 && quantity > 0 && costOfGoods >= 0 && shippingCost >= 0 && taxRate >= 0) {

        // Calculate values
        const totalRevenue = itemPrice * quantity;
        const totalCostOfGoods = costOfGoods * quantity;
        const etsyTransactionFee = totalRevenue * 0.05; // 5% transaction fee
        const etsyListingFee = 0.20 * quantity; // $0.20 per item listing fee
        const paymentFee = (totalRevenue * 0.03) + 0.25; // 3% + $0.25
        const totalShipping = shippingCost * quantity;
        const totalTax = totalRevenue * (taxRate / 100);
        
        const totalFees = etsyTransactionFee + etsyListingFee + paymentFee + totalTax;
        const totalCosts = totalCostOfGoods + totalShipping + totalFees;
        const profitMargin = ((totalRevenue - totalCosts) / totalRevenue) * 100;
        const netProfit = totalRevenue - totalCosts;
        const profitPerItem = netProfit / quantity;

        // Display results
        document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
        document.getElementById('totalCost').textContent = `$${totalCostOfGoods.toFixed(2)}`;
        document.getElementById('etsyTransactionFee').textContent = `$${etsyTransactionFee.toFixed(2)}`;
        document.getElementById('etsyListingFee').textContent = `$${etsyListingFee.toFixed(2)}`;
        document.getElementById('profitMargin').textContent = `${profitMargin.toFixed(2)}%`;
        document.getElementById('paymentFee').textContent = `$${paymentFee.toFixed(2)}`;
        document.getElementById('totalShipping').textContent = `$${totalShipping.toFixed(2)}`;
        document.getElementById('totalTax').textContent = `$${totalTax.toFixed(2)}`;
        document.getElementById('netProfit').textContent = `$${netProfit.toFixed(2)}`;
        document.getElementById('profitPerItem').textContent = `$${profitPerItem.toFixed(2)}`;

        // Show results section
        document.getElementById('results').classList.remove('hidden');
    }
}

// Add event listeners for real-time calculation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculateProfit);
    input.addEventListener('change', function() {
        if (this.value < 0) {
            this.value = 0;
        }
        calculateProfit();
    });
});

// Reset button functionality
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('profitForm').reset();
    document.getElementById('results').classList.add('hidden');
});
