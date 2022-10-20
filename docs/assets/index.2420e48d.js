(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(r){if(r.ep)return;r.ep=!0;const o=n(r);fetch(r.href,o)}})();document.querySelector("#app").innerHTML=`
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
          <div><input type="checkbox" id="haveTax" class="mr-2" />do have tax? <span class="text-xs text-slate-600">(13%)</span></div>
          <div><input type="checkbox" id="haveTip" class="mr-2" />do have tip? <span class="text-xs text-slate-600">(15%)</span></div>
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
`;const P=.13,x=.15,T=3.9,B=document.querySelector("#priceForm"),d=document.querySelector("#inputPrice"),i=document.querySelector("#haveTax"),g=document.querySelector("#haveTip"),y=document.querySelector("#inputPriceBr"),C=document.querySelector("#exchangeButton"),k=document.querySelector("#resultContainer"),$=document.querySelector(".resultPrices"),L=document.querySelector("#backButton"),f=e=>parseFloat(e)*P,m=e=>parseFloat(e)+parseFloat(f(e)),u=(e,t)=>t?parseFloat(m(e)*x):parseFloat(e)*x,b=(e,t)=>parseFloat(t?m(e)+u(e,t):e+u(e,t)),a=e=>parseFloat(e)*T,S=(e,t,n)=>{let c=e;return t&&n?c=a(b(c,!0)):t?c=a(e+f(c)):n?c=a(e+u(c)):a(c)},p=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),l=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),v=()=>{B.classList.toggle("hidden"),k.classList.toggle("hidden")};d.focus();C.addEventListener("click",e=>{const t=parseFloat(d.value.replace(",","."));if(isNaN(t))return alert("Please, insert a price in CAD");const n=S(t,i.checked,g.checked),c=i.checked?`
    <li>\u{1F4B8} tax: CAD ${l.format(f(t))}</li>
    <li>\u{1F4B5} price + tax: CAD ${l.format(m(t))}</li>`:`
    <li>\u26A0\uFE0F <span class="text-xs text-slate-600">Price without taxes</span></li>`,r=g.checked?`
    <li>\u{1F3A9} tip: CAD ${l.format(u(t,i.checked))}</li>
    <li>\u{1FAE5} final price: CAD ${l.format(b(t,i.checked))}`:"",o=parseFloat(y.value.replace(",",".")),s=o-n,h=((1-n/o)*100).toFixed(2),w=h>0?"\u2705 Good choice":"\u{1F6AB} Bad choice",F=o?`
    <hr>
    <li class="text-sm">${w}</li>
    <li>\u{1F914} Price in Brazil: ${p.format(o)}</li>
    <li>\u{1F19A} Difference prices: ${p.format(s)}
        <span class="text-xs text-slate-600">(${h}%)</span></li>`:"";$.innerHTML=`
    <ul class="flex flex-col gap-4">
        <li>\u{1F1E8}\u{1F1E6} CAD ${l.format(t)}</li>
        ${c}
        ${r}
        <li class="text-xl font-bold">\u{1F1E7}\u{1F1F7} ${p.format(n)} \u{1FAE0}</li>
        ${F}
    </ul>`,v()});L.addEventListener("click",e=>{v(),d.value="",y.value="",d.focus()});
