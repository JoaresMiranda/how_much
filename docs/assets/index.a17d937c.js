(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const c of e)if(c.type==="childList")for(const n of c.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const c={};return e.integrity&&(c.integrity=e.integrity),e.referrerpolicy&&(c.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?c.credentials="include":e.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(e){if(e.ep)return;e.ep=!0;const c=s(e);fetch(e.href,c)}})();document.querySelector("#app").innerHTML=`
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
`;const B=.13,g=.15,T=document.querySelector("#priceForm"),u=document.querySelector("#inputPrice"),y=document.querySelector("#inputExchange"),a=document.querySelector("#haveTax"),m=document.querySelector("#haveTip"),b=document.querySelector("#inputPriceBr"),$=document.querySelector("#exchangeButton"),C=document.querySelector("#resultContainer"),q=document.querySelector(".resultPrices"),S=document.querySelector("#backButton"),f=t=>parseFloat(t)*B,h=t=>parseFloat(t)+parseFloat(f(t)),p=(t,r)=>r?parseFloat(h(t)*g):parseFloat(t)*g,v=(t,r)=>parseFloat(r?h(t)+p(t,r):t+p(t,r)),i=(t,r)=>parseFloat(t)*r,L=(t,r,s,o)=>{let e=t;return r&&s?e=i(v(e,!0),o):r?e=i(t+f(e),o):s?e=i(t+p(e),o):i(e,o)},d=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),l=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),w=()=>{T.classList.toggle("hidden"),C.classList.toggle("hidden")};u.focus();$.addEventListener("click",t=>{const r=y.value?parseFloat(y.value.replace(",",".")):3.9,s=parseFloat(u.value.replace(",","."));if(isNaN(s))return alert("Please, insert a price");const o=L(s,a.checked,m.checked,r),e=a.checked?`
    <li>\u{1F4B8} tax: CAD ${l.format(f(s))}</li>
    <li>\u{1F4B5} price + tax: CAD ${l.format(h(s))}</li>`:`
    <li><span class="text-xs text-slate-600">\u203C\uFE0F Price without taxes</span></li>`,c=m.checked?`
    <li>\u{1F3A9} tip: CAD ${l.format(p(s,a.checked))}</li>
    <li>\u{1FAE5} final price: CAD ${l.format(v(s,a.checked))}`:"",n=parseFloat(b.value.replace(",",".")),F=n-o,x=((1-o/n)*100).toFixed(2),P=x>0?"\u2705 It's a great opportunity!":"\u26A0\uFE0F Brazil's price is equal or better.",k=n?`
    <hr>
    <li class="text-sm">${P}</li>
    <li>\u{1F4B0} Brazil's price: ${d.format(n)}</li>
    <li>\u{1F19A} Difference between prices:<br /> 
      <span class="ml-7">${d.format(F)}</span>
      <span class="text-xs text-slate-600">(${x}%)</span>
    </li>`:"";q.innerHTML=`
    <ul class="flex flex-col gap-4">
        <li>\u{1F1E8}\u{1F1E6} price: CAD ${l.format(s)}</li>
        ${e}
        ${c}
        <li>\u{1F4C8} exchange: ${d.format(r)}</li>
        <li class="text-xl font-bold">\u{1F1E7}\u{1F1F7} ${d.format(o)} \u{1FAE0}</li>
        ${k}
    </ul>`,w()});S.addEventListener("click",t=>{w(),u.value="",a.checked="",m.checked="",b.value="",u.focus()});
