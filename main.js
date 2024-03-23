//get data
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'Create';
let updateIndex;
//console.log(title,price,taxes,ads,discount,total,count,category,submit);
//get total
function getTotal(){
    if(price.value !=''){
        let result = +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    }
    else{
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//create product
let dataProducts; //localStorage save
if(localStorage.product != null)
    dataProducts = JSON.parse(localStorage.product)

else 
    dataProducts = [];

submit.onclick = function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }

    //console.log(newProduct)

    if(price.value !='' && title.value !='' && count.value <=100  && category.value !=''){
    if(mood === 'Create'){
        for(let i=0;i<count.value;i++)
            dataProducts.push(newProduct);
    }
    else{
        dataProducts[updateIndex] = newProduct;
        mood = 'Create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    localStorage.setItem('product',JSON.stringify(dataProducts));

    clearInputs();}
    //console.log(dataProducts);
    showData();
}

//clear inputs 
function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.background  = '#a00d02';
    count.value = 1;
    category.value = '';
}
//read
showData();
function showData(){
    let table = '';
    for(let i=0;i<dataProducts.length;i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
            `
    }
    document.getElementById('tbody').innerHTML = table;
    
        let btndeleteAll = document.getElementById('deleteAll');
        if(dataProducts.length>0){
        btndeleteAll.innerHTML = 
            `<button onclick="deleteAll()">Delete All (${dataProducts.length})</button>`
    }
    else{
        btndeleteAll.innerHTML='';
    }
    
}
//delete All
function deleteAll(){
    localStorage.clear();    
    dataProducts.splice(0);
    showData();
}

//count


//delete Product
function deleteProduct(i){
    //dataProducts.splice(i,1);
    dataProducts.splice(i,1);
    localStorage.product = JSON.stringify(dataProducts);
    showData();
}

//delete

//Update Product
function updateProduct(i){
    submit.innerHTML = 'Update';
    scroll({
        top: 0, 
        behavior:"smooth"
    })
    title.value = dataProducts[i].title;
    price.value = dataProducts[i].price;
    taxes.value = dataProducts[i].taxes;
    ads.value = dataProducts[i].ads;
    discount.value = dataProducts[i].discount;
    count.style.display = 'none';
    getTotal();
    category.value = dataProducts[i].category;
    mood = 'Update';
    updateIndex=i;
}
//search
let searchMood='Title';
function getSearch(id){  
    let search = document.getElementById('search');
    if(id == 'searchCategory')
        searchMood = 'Category';
    search.placeholder='Search By ' + searchMood;
    
    search.focus();
    search.value='';
    showData();
}
function searchData(value){
    let getElements='';
        for(let i=0;i<dataProducts.length;i++){
            if(searchMood == 'Title'){
            if(dataProducts[i].title.toLowerCase().includes(value.toLowerCase())){
                getElements += `<tr>
                    <td>${i+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>`
        }}
            else{
                if(dataProducts[i].category.toLowerCase().includes(value.toLowerCase())){
                getElements += `<tr>
                    <td>${i+1}</td>
                    <td>${dataProducts[i].title}</td>
                    <td>${dataProducts[i].price}</td>
                    <td>${dataProducts[i].taxes}</td>
                    <td>${dataProducts[i].ads}</td>
                    <td>${dataProducts[i].discount}</td>
                    <td>${dataProducts[i].total}</td>
                    <td>${dataProducts[i].category}</td>
                    <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>`
            
                }
            }
            showData();
        }
        document.getElementById('tbody').innerHTML = getElements;
}
//clean data
