import './style.css';

document.querySelector('#app').innerHTML = `
<main class="min-h-screen flex flex-col">
      <!-- header -->
      <header class="header flex items-center p-6 border-b-4 border-b-red-600">
        <div class="header__container grow lowercase">
          <h1 class="header__title font-bold text-4xl text-red-600">How much?</h1>
          <p class="header__description text-gray-600">The real price of things</p>
        </div>
        <img class="w-20 object-cover" src="./logo.png" />
      </header>

      <!-- content -->
      <article id="priceForm" class="grow">
        <form class="p-8 flex flex-col gap-6">
          <div>
            <input
              type="text"
              inputmode="decimal"
              placeholder="Insert price in CAD"
              id="inputPrice"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div><input type="checkbox" id="haveTax" class="mr-2" />have tax? <span class="text-xs text-slate-600">(13%)</span></div>
          <div><input type="checkbox" id="haveTip" class="mr-2" />have tip? <span class="text-xs text-slate-600">(15%)</span></div>
          <div>
          <p class="text-sm mb-1">Do you want to compare prices?</p>
            <input
              type="text"
              inputmode="decimal"
              placeholder="Insert price in Brazil (optional)"
              id="inputPriceBr"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            id="exchangeButton"
            type="button"
            class="button w-full bg-red-600 p-4 rounded-md text-white lowercase"
          >
            Check values
          </button>
        </form>
      </article>

      <!-- result -->
      <article id="resultContainer" class="hidden grow">
        <div class="p-8 flex flex-col gap-8">
          <div class="resultPrices gap-6"></div>
          <button
            id="backButton"
            type="button"
            class="button w-full bg-red-600 p-4 rounded-md text-white lowercase"
          >
            New price
          </button>
        </div>
      </article>

    </main>
`;

const TAXES = 0.13;
const TIP = 0.15;
const CONVERTION = 3.9;

const priceForm = document.querySelector('#priceForm');
const inputPrice = document.querySelector('#inputPrice');
const haveTax = document.querySelector('#haveTax');
const haveTip = document.querySelector('#haveTip');
const inputPriceBr = document.querySelector('#inputPriceBr');
const exchangeButton = document.querySelector('#exchangeButton');

const resultContainer = document.querySelector('#resultContainer');
const resultPrices = document.querySelector('.resultPrices');
const backButton = document.querySelector('#backButton');

const getTaxes = (price) => parseFloat(price) * TAXES;
const addTaxes = (price) => parseFloat(price) + parseFloat(getTaxes(price));

const getTip = (price, tax) => (tax ? parseFloat(addTaxes(price) * TIP) : parseFloat(price) * TIP); // TOTAL TIP
const addTip = (price, tax) =>
  tax ? parseFloat(addTaxes(price) + getTip(price, tax)) : parseFloat(price + getTip(price, tax)); //FINAL PRICE WITH TAX AND TIP

const getPriceReal = (price) => parseFloat(price) * CONVERTION;

const allPrices = (initialPrice, tax, tip) => {
  let finalPrice = initialPrice;
  if (tax && tip) {
    return (finalPrice = getPriceReal(addTip(finalPrice, true)));
  }
  if (tax) return (finalPrice = getPriceReal(initialPrice + getTaxes(finalPrice)));
  if (tip) return (finalPrice = getPriceReal(initialPrice + getTip(finalPrice)));

  return getPriceReal(finalPrice);
};

const formatToReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatToCad = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

const toggleContainers = () => {
  priceForm.classList.toggle('hidden');
  resultContainer.classList.toggle('hidden');
};

inputPrice.focus();

exchangeButton.addEventListener('click', (e) => {
  const initialPrice = parseFloat(inputPrice.value.replace(',', '.'));
  if (isNaN(initialPrice)) return alert('Please, insert a price');

  const priceFull = allPrices(initialPrice, haveTax.checked, haveTip.checked);

  const taxRender = haveTax.checked
    ? `
    <li>💸 tax: CAD ${formatToCad.format(getTaxes(initialPrice))}</li>
    <li>💵 price + tax: CAD ${formatToCad.format(addTaxes(initialPrice))}</li>`
    : `
    <li><span class="text-xs text-slate-600">‼️ Price without taxes</span></li>`;

  const tipRender = haveTip.checked
    ? `
    <li>🎩 tip: CAD ${formatToCad.format(getTip(initialPrice, haveTax.checked))}</li>
    <li>🫥 final price: CAD ${formatToCad.format(addTip(initialPrice, haveTax.checked))}`
    : ``;

  const priceBr = parseFloat(inputPriceBr.value.replace(',', '.'));
  const differencePrice = priceBr - priceFull;

  const percentual = ((1 - priceFull / priceBr) * 100).toFixed(2);
  const status =
    percentual > 0 ? `✅ It's a good opportunity!` : `⚠️ Brazil's price is equal or better.`;

  const priceBrRender = priceBr
    ? `
    <hr>
    <li class="text-sm">${status}</li>
    <li>💰 Brazil's price: ${formatToReal.format(priceBr)}</li>
    <li>🆚 Diff between prices: ${formatToReal.format(differencePrice)}
        <span class="text-xs text-slate-600">(${percentual}%)</span></li>`
    : ``;

  resultPrices.innerHTML = `
    <ul class="flex flex-col gap-4">
        <li>🇨🇦 price: CAD ${formatToCad.format(initialPrice)}</li>
        ${taxRender}
        ${tipRender}
        <li class="text-xl font-bold">🇧🇷 ${formatToReal.format(priceFull)} 🫠</li>
        ${priceBrRender}
    </ul>`;
  toggleContainers();
});

backButton.addEventListener('click', (e) => {
  toggleContainers();
  inputPrice.value = '';
  haveTax.checked = '';
  haveTip.checked = '';
  inputPriceBr.value = '';
  inputPrice.focus();
});
