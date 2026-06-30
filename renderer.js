document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-btn');
    const updateBtn = document.getElementById('update-btn');
    const updateIcon = document.getElementById('update-icon');
    const updateText = document.getElementById('update-text');
    
    const bcvUsdEl = document.getElementById('bcv-usd');
    const binanceUsdtEl = document.getElementById('binance-usdt');
    const bcvEurEl = document.getElementById('bcv-eur');
    const errorMsgEl = document.getElementById('error-message');

    // Close window
    closeBtn.addEventListener('click', () => {
        window.api.closeApp();
    });

    // Formatter for currency
    const formatCurrency = (value) => {
        if (!value) return 'Bs --.--';
        return `Bs ${value.toFixed(2)}`;
    };

    // Fetch Rates function
    const fetchRates = async () => {
        try {
            // Set loading state
            updateIcon.classList.add('rotating');
            updateText.innerText = 'Actualizando...';
            errorMsgEl.innerText = '';
            
            bcvUsdEl.innerText = 'Cargando...';
            binanceUsdtEl.innerText = 'Cargando...';
            bcvEurEl.innerText = 'Cargando...';

            const rates = await window.api.getRates();

            if (rates.error) {
                errorMsgEl.innerText = rates.error;
            }

            bcvUsdEl.innerText = formatCurrency(rates.bcvUsd);
            binanceUsdtEl.innerText = formatCurrency(rates.binanceUsdt);
            bcvEurEl.innerText = formatCurrency(rates.bcvEur);

        } catch (error) {
            errorMsgEl.innerText = 'Error de conexión';
        } finally {
            // Remove loading state
            updateIcon.classList.remove('rotating');
            updateText.innerText = 'Actualizar precios';
        }
    };

    // Update button click
    updateBtn.addEventListener('click', fetchRates);

    // Initial fetch
    fetchRates();
});
