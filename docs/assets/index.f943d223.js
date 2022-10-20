(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();document.querySelector("#app").innerHTML=`
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
          <div><input type="checkbox" id="haveTax" class="mr-2" checked="checked" />do have tax? <span class="text-xs text-slate-600">(13%)</span></div>
          <div><input type="checkbox" id="haveTip" class="mr-2" checked="checked" />do have tip? <span class="text-xs text-slate-600">(15%)</span></div>
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
`;const T=.13,g=.15,k=3.9,B=document.querySelector("#priceForm"),u=document.querySelector("#inputPrice"),i=document.querySelector("#haveTax"),y=document.querySelector("#haveTip"),b=document.querySelector("#inputPriceBr"),C=document.querySelector("#exchangeButton"),$=document.querySelector("#resultContainer"),L=document.querySelector(".resultPrices"),S=document.querySelector("#backButton"),m=e=>parseFloat(e)*T,h=e=>parseFloat(e)+parseFloat(m(e)),p=(e,t)=>t?parseFloat(h(e)*g):parseFloat(e)*g,v=(e,t)=>parseFloat(t?h(e)+p(e,t):e+p(e,t)),d=e=>parseFloat(e)*k,a=(e,t,l)=>{let c=e;return t&&l?c=d(v(c,!0)):t?c=d(e+m(c)):l?c=d(e+p(c)):d(c)};console.log(a(100,!1,!1));console.log(a(100,!0,!1));console.log(a(100,!1,!0));console.log(a(100,!0,!0));const f=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),w=()=>{B.classList.toggle("hidden"),$.classList.toggle("hidden")};u.focus();C.addEventListener("click",e=>{const t=parseFloat(u.value.replace(",","."));if(isNaN(t))return alert("Please, insert a price in CAD");const l=a(t,i.checked,y.checked),c=i.checked?`
    <li>\u{1F4B8} tax: CAD ${n.format(m(t))}</li>
    <li>\u{1F4B5} price + tax: CAD ${n.format(h(t))}</li>`:`
    <li>\u26A0\uFE0F <span class="text-xs text-slate-600">Price without taxes</span></li>`,r=y.checked?`
    <li>\u{1F3A9} tip: CAD ${n.format(p(t,i.checked))}</li>
    <li>\u{1FAE5} final price: CAD ${n.format(v(t,i.checked))}`:"",o=parseFloat(b.value.replace(",",".")),s=o-l,x=((1-l/o)*100).toFixed(2),F=x>0?"\u2705 Good shop":"\u{1F6AB} Bad shop",P=o?`
    <hr>
    <li class="text-sm">${F}</li>
    <li>\u{1F914} Price in Brazil: ${f.format(o)}</li>
    <li>\u{1F19A} Difference prices: ${f.format(s)}
        <span class="text-xs text-slate-600">(${x}%)</span></li>`:"";L.innerHTML=`
    <ul class="flex flex-col gap-4">
        <li>\u{1F1E8}\u{1F1E6} CAD ${n.format(t)}</li>
        ${c}
        ${r}
        <li class="text-xl font-bold">\u{1F1E7}\u{1F1F7} ${f.format(l)} \u{1FAE0}</li>
        ${P}
    </ul>`,w()});S.addEventListener("click",e=>{w(),u.value="",b.value="",u.focus()});
