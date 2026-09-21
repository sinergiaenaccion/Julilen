const WA="5493547522351";
let cart=[];
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
function renderCart(){
 const box=$("#cartItems"),count=$("#cartCount"); count.textContent=cart.length;
 if(!cart.length){box.innerHTML='<p class="empty-cart">Todavía no agregaste productos.</p>';return;}
 box.innerHTML=cart.map((name,i)=>'<div class="cart-item"><span>'+name+'</span><button data-remove="'+i+'" aria-label="Quitar '+name+'">×</button></div>').join("");
 $$("[data-remove]").forEach(b=>b.addEventListener("click",()=>{cart.splice(Number(b.dataset.remove),1);renderCart();}));
}
function openCart(){$("#cartDrawer").classList.add("open");$("#cartOverlay").classList.add("show");$("#cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#cartOverlay").classList.remove("show");$("#cartDrawer").setAttribute("aria-hidden","true");}
function filterProducts(filter){
 $$(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));
 $$(".product-card").forEach(card=>{const show=filter==="todos"||card.dataset.category.split(" ").includes(filter);card.classList.toggle("hidden",!show);});
}
document.addEventListener("DOMContentLoaded",()=>{
 $$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}}));
 $$(".filter").forEach(b=>b.addEventListener("click",()=>filterProducts(b.dataset.filter)));
 $$("[data-filter-link]").forEach(a=>a.addEventListener("click",()=>setTimeout(()=>filterProducts(a.dataset.filterLink),250)));
 $$(".add-product").forEach(b=>b.addEventListener("click",()=>{cart.push(b.dataset.name);renderCart();openCart();}));
 $("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#cartOverlay").addEventListener("click",closeCart);
 $("#sendOrder").addEventListener("click",()=>{
  if(!cart.length){openCart();return;}
  const note=$("#customerNote").value.trim();
  const lines=cart.map((x,i)=>(i+1)+". "+x).join("\\n");
  const text="Hola Julilen 💚 Quiero hacer este pedido:\\n\\n"+lines+(note?"\\n\\nMensaje: "+note:"")+"\\n\\n¿Me indican disponibilidad, precio y opciones de entrega?";
  window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank","noopener");
 });
});