(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=c(e);fetch(e.href,o)}})();document.querySelector("#app").innerHTML=`
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
`;const f=.13,m=3.9,h=document.querySelector("#priceForm"),n=document.querySelector("#inputPrice"),d=document.querySelector("#haveTax"),g=document.querySelector("#exchangeButton"),x=document.querySelector("#resultContainer"),y=document.querySelector(".resultPrices"),b=document.querySelector("#backButton"),a=t=>parseFloat(t)*f,v=t=>parseFloat(t)+parseFloat(a(t)),u=t=>parseFloat(t)*m,w=(t,r)=>{let c=t;return r?c=u(t+a(c)):u(c)},p=()=>{h.classList.toggle("hidden"),x.classList.toggle("hidden")},C=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}),s=new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"});n.focus();g.addEventListener("click",t=>{const r=parseFloat(n.value.replace(",","."));if(console.log(r),isNaN(r))return alert("Please, insert a price in CAD");const c=d.checked?`<li>\u{1F4B8} tax: CAD ${s.format(a(r))}</li>
    <li>\u{1F4B5} price + tax: CAD ${s.format(v(r))}</li>`:'<li>\u26A0\uFE0F <span class="text-xs text-slate-600">Price without taxes</span></li>';y.innerHTML=`
    <ul class="flex flex-col gap-4">
    <li>\u{1F1E8}\u{1F1E6} CAD ${s.format(r)}</li>
    ${c}
    <li><span class="text-xl font-bold">\u{1F1E7}\u{1F1F7} ${C.format(w(r,d.checked))}</span> \u{1FAE0}</li>
        </ul>`,p()});b.addEventListener("click",t=>{p(),n.value="",t.target=n.focus()});
