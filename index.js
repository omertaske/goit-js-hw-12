import{a as S,i as o,S as I}from"./assets/vendor-ZyNgbvOy.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();const M="29490885-39aa37afc891f3eb40eae4912",T="https://pixabay.com/api/";async function f(e,r=1,n=40){const a={key:M,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:n};try{return(await S.get(T,{params:a})).data}catch(t){throw new Error(t.response.statusText||t.message)}}function y(e){return e.hits.map(({webformatURL:n,largeImageURL:a,tags:t,likes:s,views:c,comments:E,downloads:x})=>`
        <li class="card">
            <div class="place-for-image">
                <a href="${a}">
                    <img src="${n}" alt="${t}" class="picture"/>
                </a>
            </div>
            <div class="info-text">
                <div class="description">
                    <span class="bold-text">Likes</span>
                    <span class="info-value">${s}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Views</span>
                    <span class="info-value">${c}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Comments</span>
                    <span class="info-value">${E}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Downloads</span>
                    <span class="info-value">${x}</span>
                </div>
            </div>
        </li>`).join("")}let l=1,p="",g=0,m=0;const h=document.querySelector(".loader"),v=document.getElementById("searchForm"),d=document.querySelector(".gallery"),u=document.getElementById("loadMoreBtn");v.addEventListener("submit",A);u.addEventListener("click",B);async function A(e){e.preventDefault(),d.innerHTML="",i("block"),p=e.currentTarget.elements.searchInput.value.trim(),l=1,m=0;try{const r=await f(p,l);if(g=r.totalHits,r.hits.length===0){o.warning({title:"Caution",message:"No images found!"}),u.style.display="none";return}b(r),L(r),e.target.reset()}catch(r){o.error({title:"Error",message:r.message})}finally{i("none")}}async function B(){l++,i("block");try{const e=await f(p,l);b(e),L(e),H()}catch(e){o.error({title:"Error",message:e.message})}finally{i("none")}}function b(e){m+=e.hits.length,d.insertAdjacentHTML("beforeend",y(e)),w.refresh()}function L(e){m>=g?(u.style.display="none",o.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):u.style.display="block"}function H(){const e=document.querySelector(".gallery .card"),r=(e==null?void 0:e.getBoundingClientRect().height)||0;window.scrollBy({top:r*2,behavior:"smooth"})}const w=new I(".card .place-for-image a",{captions:!0,captionsData:"alt",captionDelay:250});function i(e){h.style.display=e}h.style.display="none";v.addEventListener("submit",P);async function P(e){e.preventDefault(),d.innerHTML="";const r=e.currentTarget.elements.searchInput.value;i("block"),f(r).then(n=>{if(n.total===0)return o.warning({title:"Caution",message:"Sorry, there are no images matching your search query. Please try again!"}),0;d.insertAdjacentHTML("beforeend",y(n)),w.refresh(),e.target.reset()}).catch(n=>{o.error({title:"Error",message:n.message})}).finally(()=>{i("none")})}
//# sourceMappingURL=index.js.map
