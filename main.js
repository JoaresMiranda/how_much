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
          <div>
            <input type="checkbox" id="haveTax" class="mr-2" checked="checked" />do have tax?
          </div>
          <button
            id="exchangeButton"
            type="button"
            class="button w-full bg-red-600 p-4 rounded-md text-white lowercase"
          >
            Exchange
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
  if (tax) return (finalPrice = getPriceReal(initialPrice + getTaxes(finalPrice)));
  return getPriceReal(finalPrice);
};

const toggleContainers = () => {
  priceForm.classList.toggle('hidden');
  resultContainer.classList.toggle('hidden');
};

const formatToReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const formatToCad = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

exchangeButton.addEventListener('click', (e) => {
  const initialPrice = parseFloat(inputPrice.value.replace(',', '.'));

  if (isNaN(initialPrice)) return console.log(typeof initialPrice, initialPrice);

  const taxRender = haveTax.checked
    ? `<li>💸 tax: CAD ${formatToCad.format(getTaxes(initialPrice))}</li>
    <li>💵 price + tax: CAD ${formatToCad.format(addTaxes(initialPrice))}</li>`
    : '<li>⚠️ <span class="text-xs text-slate-600">Price without taxes</span></li>';

  resultPrices.innerHTML = `
    <ul class="flex flex-col gap-4">
    <li>🇨🇦 CAD ${formatToCad.format(initialPrice)}</li>
    ${taxRender}
    <li><span class="text-xl font-bold">🇧🇷 ${formatToReal.format(
      allPrices(initialPrice, haveTax.checked)
    )}</span> 🫠</li>
        </ul>`;
  toggleContainers();
});

backButton.addEventListener('click', (e) => toggleContainers());
