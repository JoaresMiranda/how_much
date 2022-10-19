(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();document.querySelector("#app").innerHTML=`
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
              pattern="[0-9]*"
              inputmode="numeric"
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
`;const u=.13,p=3.9,f=document.querySelector("#priceForm"),h=document.querySelector("#inputPrice"),i=document.querySelector("#haveTax"),m=document.querySelector("#exchangeButton"),x=document.querySelector("#resultContainer"),g=document.querySelector(".resultPrices"),b=document.querySelector("#backButton"),l=t=>parseFloat(t)*u,y=t=>parseFloat(t)+parseFloat(l(t)),a=t=>parseFloat(t)*p,v=(t,r)=>{let n=t;return r?n=a(t+l(n)).toFixed(2):a(n).toFixed(2)},d=()=>{f.classList.toggle("hidden"),x.classList.toggle("hidden")};m.addEventListener("click",t=>{const r=parseInt(h.value);if(isNaN(r))return alert("n\xE9 numero n\xE3o macho");const n=i.checked?`<li>\u{1F4B8} tax: CAD ${l(r)}</li>
    <li>\u{1F4B5} price + tax: CAD ${y(r)}</li>`:'<li>\u26A0\uFE0F <span class="text-xs text-slate-600">Price without taxes</span></li>';g.innerHTML=`
    <ul class="flex flex-col gap-4">
    <li>\u{1F1E8}\u{1F1E6} CAD ${r}</li>
    ${n}
    <li><span class="text-xl font-bold">\u{1F1E7}\u{1F1F7} R$ ${v(r,i.checked)}</span> \u{1FAE0}</li>
        </ul>`,d()});b.addEventListener("click",t=>d());
