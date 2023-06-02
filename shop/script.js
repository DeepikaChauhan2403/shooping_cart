const produtc = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};


if(!localStorage.getItem('currUser')){
  location.href='../login/index.html';
}

const itemsContainer = document.querySelector('.items');
const search = document.getElementById('search');
const allBtn = document.getElementById('all');
const menBtn = document.getElementById('men');
const womenBtn = document.getElementById('women');
const jewelleryBtn = document.getElementById('jewellery');
const electronicsBtn = document.getElementById('electronics');
const range = document.getElementById('range');

var itemArr=[];

if(localStorage.getItem('cartArr')){
  var cartArr=JSON.parse(localStorage.getItem('cartArr'));
}
else{
  var cartArr=[];
}


fetch("https://fakestoreapi.com/products")
.then((resp)=>resp.json())
.then((data)=>{
  itemArr=data;
  localStorage.setItem('itemArr',JSON.stringify(itemArr));
  showItems(itemArr);
  console.log(itemArr);
});

function showItems(Arr){
  itemsContainer.innerHTML='';
  Arr.forEach(ele => {
    itemsContainer.innerHTML+=`
  <div class="item">
  <img src="${ele.image}" alt="Item" />
  <div class="info">
    <div style="margin-bottom: 10px; font-weight:600">${ele.title}</div>
    <div style="font-weight:bold" class="row">
      <div class="price">$${ele.price}</div>
    </div>
    <div style='margin-top:10px;' class="row">Rating: ${Math.floor(ele.rating.rate)}</div>
  </div>
  <button id="addBtn" onClick='addToCart(${ele.id})'>Add to Cart</button>
</div>
  `
  });
  

}

search.addEventListener('input',()=>{
  myArr = itemArr.filter(ele=>{
    if(ele.title.toLowerCase().includes(search.value.trim().toLowerCase())){
      return ele;
    }
  })
  if(myArr.length==0){
    itemsContainer.innerHTML=`
    <p>Oops,No products found for this filtering, try different combinations!</P>
    `
    return;
  }
  showItems(myArr);
})

allBtn.addEventListener('click',()=>{
  myArr =JSON.parse(localStorage.getItem('itemArr'));
  allBtn.style.backgroundColor='black';
  allBtn.style.color='white';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='white';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='white';
  jewelleryBtn.style.color='black';
  jewelleryBtn.style.backgroundColor='white';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='white';
  showItems(myArr);
})


menBtn.addEventListener('click',()=>{
  myArr = itemArr.filter(ele=>{
    if(ele.category=="men's clothing"){
      return ele;
    }
  })
  allBtn.style.backgroundColor='white';
  allBtn.style.color='black';
  menBtn.style.color='white';
  menBtn.style.backgroundColor='black';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='white';
  jewelleryBtn.style.color='black';
  jewelleryBtn.style.backgroundColor='white';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='white';


  showItems(myArr);
})

womenBtn.addEventListener('click',()=>{
  myArr = itemArr.filter(ele=>{
    if(ele.category=="women's clothing"){
      return ele;
    }
  })
  allBtn.style.backgroundColor='white';
  allBtn.style.color='black';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='white';
  womenBtn.style.color='white';
  womenBtn.style.backgroundColor='black';
  jewelleryBtn.style.color='black';
  jewelleryBtn.style.backgroundColor='white';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='white';

  showItems(myArr);
})

jewelleryBtn.addEventListener('click',()=>{
  myArr = itemArr.filter(ele=>{
    if(ele.category=="jewelery"){
      return ele;
    }
  })
  allBtn.style.backgroundColor='white';
  allBtn.style.color='black';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='white';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='white';
  jewelleryBtn.style.color='white';
  jewelleryBtn.style.backgroundColor='black';
  electronicsBtn.style.color='black';
  electronicsBtn.style.backgroundColor='white';

  showItems(myArr);
})

electronicsBtn.addEventListener('click',()=>{
  myArr = itemArr.filter(ele=>{
    if(ele.category=="electronics"){
      return ele;
    }
  })
  allBtn.style.backgroundColor='white';
  allBtn.style.color='black';
  menBtn.style.color='black';
  menBtn.style.backgroundColor='white';
  womenBtn.style.color='black';
  womenBtn.style.backgroundColor='white';
  jewelleryBtn.style.color='black';
  jewelleryBtn.style.backgroundColor='white';
  electronicsBtn.style.color='white';
  electronicsBtn.style.backgroundColor='black';

  showItems(myArr);
})

range.addEventListener('input',()=>{
  console.log(range.value);
  if(range.value==0){
    showItems(itemArr);
    return;
  }
  myArr = itemArr.filter(ele=>{
    if(Math.floor(ele.rating.rate)==range.value){
      return ele;
    }
  })
  if(myArr.length==0){
    itemsContainer.innerHTML=`
    <p>Oops,No products found for this filtering, try different combinations!</P>
    `
    return;
  }
  showItems(myArr);
})


document.querySelectorAll('input[type="checkbox"]').forEach(c => {
  c.addEventListener('change', filterProducts);
});


function filterProducts() {
  const checkboxes = Array.from(document.querySelectorAll('input[name="prange"]'));
  const checkedRanges = checkboxes.filter(c => c.checked).map(c => c.value);

  if (checkedRanges.length === 0) {
    showItems(itemArr);
    return;
  }


  const filteredProducts = itemArr.filter(p => {
    const price = p.price;
    for (const range of checkedRanges) {
      if (range === '100+' && price >= 100) {
        return true;
      }
      const [min, max] = range.split('-').map(parseFloat);
      if (price >= min && price <= max) {
        return true;
      }
    }
    return false;
  });


  myArr = itemArr.filter(p =>{
    if(filteredProducts.includes(p)){
      return p;
    }
  })
  showItems(myArr);
}


function addToCart(id){
  let item;
  itemArr.forEach((ele)=>{
    if(ele.id==id){
      item=ele;
    }
  })
  cartArr.push(item);
  localStorage.setItem('cartArr',JSON.stringify(cartArr));
  console.log(JSON.parse(localStorage.getItem('cartArr')));
}
