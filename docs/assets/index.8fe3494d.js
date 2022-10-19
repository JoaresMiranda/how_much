(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();document.querySelector("#app").innerHTML=`
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
              type="number"
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
`;const p=.13,f=3.9,m=document.querySelector("#priceForm"),h=document.querySelector("#inputPrice"),i=document.querySelector("#haveTax"),g=document.querySelector("#exchangeButton"),x=document.querySelector("#resultContainer"),y=document.querySelector(".resultPrices"),b=document.querySelector("#backButton"),s=t=>parseFloat(t)*p,v=t=>parseFloat(t)+parseFloat(s(t)),d=t=>parseFloat(t)*f,w=(t,r)=>{let c=t;return r?c=d(t+s(c)):d(c)},u=()=>{m.classList.toggle("hidden"),x.classList.toggle("hidden")},P=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),l=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"});g.addEventListener("click",t=>{const r=parseInt(h.value);if(isNaN(r))return alert("Please insert a number to exchange");const c=i.checked?`<li>\u{1F4B8} tax: CAD ${l.format(s(r))}</li>
    <li>\u{1F4B5} price + tax: CAD ${l.format(v(r))}</li>`:'<li>\u26A0\uFE0F <span class="text-xs text-slate-600">Price without taxes</span></li>';y.innerHTML=`
    <ul class="flex flex-col gap-4">
    <li>\u{1F1E8}\u{1F1E6} CAD ${l.format(r)}</li>
    ${c}
    <li><span class="text-xl font-bold">\u{1F1E7}\u{1F1F7} ${P.format(w(r,i.checked))}</span> \u{1FAE0}</li>
        </ul>`,u()});b.addEventListener("click",t=>u());
