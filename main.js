// app.js
document.addEventListener('DOMContentLoaded', populateCurrencies);
document.getElementById('convert-btn').addEventListener('click', convertCurrency);
document.getElementById('from-currency').addEventListener('change', updateTodayRate);
document.getElementById('to-currency').addEventListener('change', updateTodayRate);

const apiURL = "https://api.exchangerate-api.com/v4/latest/";

async function populateCurrencies() {
    try {
        const response = await fetch(apiURL + "USD");
        const data = await response.json();
        const currencies = Object.keys(data.rates);
        const fromCurrency = document.getElementById('from-currency');
        const toCurrency = document.getElementById('to-currency');

        currencies.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
        updateTodayRate();
    } catch (error) {
        alert("Error fetching currency list. Please reload the page.");
    }
}

async function convertCurrency() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById('result').textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(apiURL + fromCurrency);
        const data = await response.json();
        const exchangeRate = data.rates[toCurrency];
        const convertedAmount = (exchangeRate * amount).toFixed(2);

        document.getElementById('result').textContent = 
            `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        document.getElementById('result').textContent = "Conversion failed. Try again later.";
    }
}

async function updateTodayRate() {
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    try {
        const response = await fetch(apiURL + fromCurrency);
        const data = await response.json();
        const exchangeRate = data.rates[toCurrency];

        document.getElementById('today-rate').textContent = 
            `Today's rate: 1 ${fromCurrency} = ${exchangeRate.toFixed(4)} ${toCurrency}`;
    } catch (error) {
        document.getElementById('today-rate').textContent = "Error fetching today's rate.";
    }
}
