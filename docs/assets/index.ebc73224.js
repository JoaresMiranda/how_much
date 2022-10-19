(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();document.querySelector("#app").innerHTML=`
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
          <div>
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
`;const g=.13,y=3.9,b=document.querySelector("#priceForm"),s=document.querySelector("#inputPrice"),u=document.querySelector("#haveTax"),f=document.querySelector("#inputPriceBr"),v=document.querySelector("#exchangeButton"),w=document.querySelector("#resultContainer"),P=document.querySelector(".resultPrices"),B=document.querySelector("#backButton"),d=t=>parseFloat(t)*g,F=t=>parseFloat(t)+parseFloat(d(t)),p=t=>parseFloat(t)*y,C=(t,o)=>{let c=t;return o?c=p(t+d(c)):p(c)},i=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),a=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),m=()=>{b.classList.toggle("hidden"),w.classList.toggle("hidden")};s.focus();v.addEventListener("click",t=>{const o=parseFloat(s.value.replace(",","."));if(isNaN(o))return alert("Please, insert a price in CAD");const c=C(o,u.checked),l=u.checked?`
    <li>\u{1F4B8} tax: CAD ${a.format(d(o))}</li>
    <li>\u{1F4B5} price + tax: CAD ${a.format(F(o))}</li>`:`
    <li>\u26A0\uFE0F <span class="text-xs text-slate-600">Price without taxes</span></li>`,e=parseFloat(f.value.replace(",",".")),r=e-c,n=((1-c/e)*100).toFixed(2),h=n>0?"\u2705 Good shop":"\u{1F6AB} Bad shop",x=e?`
    <hr>
    <li class="text-sm">${h}</li>
    <li>\u{1F914} Price in Brazil: ${i.format(e)}</li>
    <li>\u{1F19A} Difference prices: ${i.format(r)} <span class="text-xs text-slate-600">(${n}%)</span></li>`:"";P.innerHTML=`
    <ul class="flex flex-col gap-4">
        <li>\u{1F1E8}\u{1F1E6} CAD ${a.format(o)}</li>
        ${l}
        <li class="text-xl font-bold">\u{1F1E7}\u{1F1F7} ${i.format(c)} \u{1FAE0}</li>
        ${x}
    </ul>`,m()});B.addEventListener("click",t=>{m(),s.value="",f.value="",t.target=s.focus()});
