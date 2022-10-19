(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();document.querySelector("#app").innerHTML=`
<main class="min-h-screen flex flex-col">
      <!-- header -->
      <header class="header flex items-center p-8 border-b-4 border-b-red-600">
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
          <h2 class="valueResult text-2xl font-bold">Values</h2>
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

      <!-- footer -->
      <footer>
        <p class="text-center px-8 py-4 text-gray-400">
          &copy &middot; Joares Miranda &middot; 2022
        </p>
      </footer>
    </main>
`;const d=.13,u=3.9,p=document.querySelector("#priceForm"),f=document.querySelector("#inputPrice"),h=document.querySelector("#haveTax"),m=document.querySelector("#exchangeButton"),g=document.querySelector("#resultContainer"),x=document.querySelector(".resultPrices"),y=document.querySelector("#backButton"),i=t=>parseFloat(t)*d,b=t=>parseFloat(t)+parseFloat(i(t)),s=t=>parseFloat(t)*u,v=(t,o)=>{let c=t;return o?c=s(t+i(c)).toFixed(2):s(c).toFixed(2)},a=()=>{p.classList.toggle("hidden"),g.classList.toggle("hidden")};m.addEventListener("click",t=>{a();const o=parseInt(f.value);x.innerHTML=`
  <ul class="list-disc flex flex-col gap-6">
    <li>price: CAD ${o}</li>
    <li>price + tax: CAD ${b(o)}</li>
    <li><span class="font-bold">R$ ${v(o,h.checked)}</span></li>
  </ul>`});y.addEventListener("click",t=>a());
