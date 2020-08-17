const selectedCurrencyOne = document.getElementById('currency-one');
const selectedCurrencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');
const rateDiv = document.getElementById('rate');
const lastUpdateDiv = document.getElementById('last-update');
const swapBtn = document.getElementById('swap');

//Event listeners
selectedCurrencyOne.addEventListener('change', calculateResults);
selectedCurrencyTwo.addEventListener('change', calculateResults);
amountOne.addEventListener('input', calculateResults);
// amountTwo.addEventListener('ínput', calculateResults);
swapBtn.addEventListener('click', () => {
	const temporaryValue = selectedCurrencyOne.value;
	selectedCurrencyOne.value = selectedCurrencyTwo.value;
	selectedCurrencyTwo.value = temporaryValue;
	calculateResults();
});

function calculateResults() {
	const currency_one = selectedCurrencyOne.value;
	const currency_two = selectedCurrencyTwo.value;

	fetch(`https://v6.exchangerate-api.com/v6/${'9809b1cec3fb53ce2b3f3f6a'}/latest/${currency_one}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			const rate = data.conversion_rates[currency_two];
			rateDiv.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;
			amountTwo.value = (amountOne.value * rate).toFixed(2);
			lastUpdateDiv.innerHTML = `<h4>Last Update: ${data.time_last_update_utc}</h4>`;
		});
}

calculateResults();
