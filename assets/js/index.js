const TAXES = 0.13;
const CONVERTION = 3.9;

const priceForm = document.querySelector('#priceForm');
const inputPrice = document.querySelector('#inputPrice');
const haveTax = document.querySelector('#haveTax');
const exchangeButton = document.querySelector('#exchangeButton');

const resultContainer = document.querySelector('#resultContainer');
const resultPrices = document.querySelector('.resultPrices');
const backButton = document.querySelector('#backButton');

const getTaxes = (price) => parseFloat(price) * TAXES;
const addTaxes = (price) => parseFloat(price) + parseFloat(getTaxes(price));

const getPriceReal = (price) => parseFloat(price) * CONVERTION;

const allPrices = (initialPrice, tax) => {
  let finalPrice = initialPrice;
  if (tax) return (finalPrice = getPriceReal(initialPrice + getTaxes(finalPrice)).toFixed(2));
  return getPriceReal(finalPrice).toFixed(2);
};

const toggleContainers = () => {
  priceForm.classList.toggle('hidden');
  resultContainer.classList.toggle('hidden');
};

exchangeButton.addEventListener('click', (e) => {
  exchangeButton.addEventListener('click', (e) => toggleContainers());
  backButton.addEventListener('click', (e) => toggleContainers());

  const initialPrice = parseInt(inputPrice.value);

  resultPrices.innerHTML = `
  <ul class="list-disc flex flex-col gap-6">
    <li>price: CAD ${initialPrice}</li>
    <li>price + tax: CAD ${addTaxes(initialPrice)}</li>
    <li><span class="font-bold">R$ ${allPrices(initialPrice, haveTax.checked)}</span></li>
  </ul>`;
});

backButton.addEventListener('click', (e) => toggleContainers());
