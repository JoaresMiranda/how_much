(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=s(r);fetch(r.href,c)}})();document.querySelector("#app").innerHTML=`
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
`;const T=.13,y=.15,P=3.9,k=document.querySelector("#priceForm"),d=document.querySelector("#inputPrice"),i=document.querySelector("#haveTax"),f=document.querySelector("#haveTip"),g=document.querySelector("#inputPriceBr"),B=document.querySelector("#exchangeButton"),C=document.querySelector("#resultContainer"),$=document.querySelector(".resultPrices"),q=document.querySelector("#backButton"),m=e=>parseFloat(e)*T,h=e=>parseFloat(e)+parseFloat(m(e)),u=(e,t)=>t?parseFloat(h(e)*y):parseFloat(e)*y,b=(e,t)=>parseFloat(t?h(e)+u(e,t):e+u(e,t)),a=e=>parseFloat(e)*P,L=(e,t,s)=>{let o=e;return t&&s?o=a(b(o,!0)):t?o=a(e+m(o)):s?o=a(e+u(o)):a(o)},p=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),n=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}),v=()=>{k.classList.toggle("hidden"),C.classList.toggle("hidden")};d.focus();B.addEventListener("click",e=>{const t=parseFloat(d.value.replace(",","."));if(isNaN(t))return alert("Please, insert a price");const s=L(t,i.checked,f.checked),o=i.checked?`
    <li>\u{1F4B8} tax: CAD ${n.format(m(t))}</li>
    <li>\u{1F4B5} price + tax: CAD ${n.format(h(t))}</li>`:`
    <li><span class="text-xs text-slate-600">\u203C\uFE0F Price without taxes</span></li>`,r=f.checked?`
    <li>\u{1F3A9} tip: CAD ${n.format(u(t,i.checked))}</li>
    <li>\u{1FAE5} final price: CAD ${n.format(b(t,i.checked))}`:"",c=parseFloat(g.value.replace(",",".")),l=c-s,x=((1-s/c)*100).toFixed(2),w=x>0?"\u2705 It's a good opportunity!":"\u26A0\uFE0F Brazil's price is equal or better.",F=c?`
    <hr>
    <li class="text-sm">${w}</li>
    <li>\u{1F4B0} Brazil's price: ${p.format(c)}</li>
    <li>\u{1F19A} Difference between prices: ${p.format(l)}
        <span class="text-xs text-slate-600">(${x}%)</span></li>`:"";$.innerHTML=`
    <ul class="flex flex-col gap-4">
        <li>\u{1F1E8}\u{1F1E6} price: CAD ${n.format(t)}</li>
        ${o}
        ${r}
        <li class="text-xl font-bold">\u{1F1E7}\u{1F1F7} ${p.format(s)} \u{1FAE0}</li>
        ${F}
    </ul>`,v()});q.addEventListener("click",e=>{v(),d.value="",i.checked="",f.checked="",g.value="",d.focus()});
