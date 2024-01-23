(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const n of c.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerPolicy&&(c.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?c.credentials="include":e.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(e){if(e.ep)return;e.ep=!0;const c=s(e);fetch(e.href,c)}})();document.querySelector("#app").innerHTML=`
<main class="min-h-screen flex flex-col">
      <!-- header -->
      <header class="header flex items-center p-6 border-b-4 border-b-red-600">
        <div class="header__container grow lowercase">
          <h1 class="header__title font-bold text-4xl text-red-600">is it worth?</h1>
          <p class="header__description text-gray-600">prices without surprises</p>
        </div>
        <img class="w-20 object-cover" src="./logo.png" />
      </header>

      <!-- content -->
      <article id="priceForm" class="grow">
        <form class="p-8 flex flex-col gap-6">
          <div class="flex items-center">
            <input
              type="text"
              inputmode="decimal"
              placeholder="Insert price in CAD"
              id="inputPrice"
              class="w-1/2 p-2 border border-gray-300 rounded-md mr-4"
            />
            <span class="text-sm">Exchange (R$)</span> <input
              type="text""
              inputmode="decimal"
              placeholder="3,90"
              id="inputExchange"
              class="grow w-1/4 p-2 ml-2 border border-gray-300 rounded-md">
          </div>
          <div><input type="checkbox" id="haveTax" /> <span class="ml-2">have tax?</span> <span class="text-xs text-slate-600">(13%)</span></div>
          <div><input type="checkbox" id="haveTip" /> <span class="ml-2">have tip?</span> <span class="text-xs text-slate-600 mr-2">(15%)</span>
          </div>
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
`;const T=.13,g=.15,$=document.querySelector("#priceForm"),u=document.querySelector("#inputPrice"),y=document.querySelector("#inputExchange"),l=document.querySelector("#haveTax"),m=document.querySelector("#haveTip"),b=document.querySelector("#inputPriceBr"),C=document.querySelector("#exchangeButton"),q=document.querySelector("#resultContainer"),S=document.querySelector(".resultPrices"),L=document.querySelector("#backButton"),f=t=>parseFloat(t)*T,h=t=>parseFloat(t)+parseFloat(f(t)),p=(t,r)=>r?parseFloat(h(t)*g):parseFloat(t)*g,v=(t,r)=>parseFloat(r?h(t)+p(t,r):t+p(t,r)),i=(t,r)=>parseFloat(t)*r,k=(t,r,s,o)=>{let e=t;return r&&s?e=i(v(e,!0),o):r?e=i(t+f(e),o):s?e=i(t+p(e),o):i(e,o)},d=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),a=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),w=()=>{$.classList.toggle("hidden"),q.classList.toggle("hidden")};u.focus();C.addEventListener("click",t=>{const r=y.value?parseFloat(y.value.replace(",",".")):3.9,s=parseFloat(u.value.replace(",","."));if(isNaN(s))return alert("Please, insert a price");const o=k(s,l.checked,m.checked,r),e=l.checked?`
    <li>💸 tax: CAD ${a.format(f(s))}</li>
    <li>💵 price + tax: CAD ${a.format(h(s))}</li>`:`
    <li><span class="text-xs text-slate-600">‼️ Price without taxes</span></li>`,c=m.checked?`
    <li>🎩 tip: CAD ${a.format(p(s,l.checked))}</li>
    <li>🫥 final price: CAD ${a.format(v(s,l.checked))}`:"",n=parseFloat(b.value.replace(",",".")),F=n-o,x=((1-o/n)*100).toFixed(2),P=x>0?"✅ It's a great opportunity!":"⚠️ Brazil's price is equal or better.",B=n?`
    <hr>
    <li class="text-sm">${P}</li>
    <li>💰 Brazil's price: ${d.format(n)}</li>
    <li>🆚 Difference between prices:<br /> 
      <span class="ml-7">${d.format(F)}</span>
      <span class="text-xs text-slate-600">(${x}%)</span>
    </li>`:"";S.innerHTML=`
    <ul class="flex flex-col gap-4">
        <li>🇨🇦 price: CAD ${a.format(s)}</li>
        ${e}
        ${c}
        <li>📈 exchange: ${d.format(r)}</li>
        <li class="text-xl font-bold">🇧🇷 ${d.format(o)} 🫠</li>
        ${B}
    </ul>`,w()});L.addEventListener("click",t=>{w(),u.value="",l.checked="",m.checked="",b.value="",u.focus()});
