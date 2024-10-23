let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let temp;
// to check the variable is okey
//console.log(title, price, taxes, abs, discount, total, count, category, submit);

//calculate the total value
function getTotal()
{
    //for check the event
    // console.log("done");
    
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'red';
    }
    
}


//create product

let datapro;//array
// if local storage not empty dont delete the data from array
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}
else { datapro = []; }
submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category:category.value
    }

    //to check
    //console.log(newpro);

    if (title.value != '' && price.value!='' &&category.value!=''&& newpro.count <100 &&taxes!='' &&ads!='' ) {
        if (mood == 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            }
            else {
        
                datapro.push(newpro);
            }
        }

        else {
            datapro[temp] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData();

    }
    //to check
   //console.log(datapro);

    //store data in local storage
    localStorage.setItem('product', JSON.stringify(datapro));
    //for check
    //console.log(datapro);

    showData();
}



//clear inputs
function clearData() {
    title.value = '';
    price.value ='';
    ads.value = '';
    taxes.value='';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}




//show data in the table 
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++){
        table += ` <tr>
                            <td>${i+1}</td>
                            <td>${ datapro[i].title}</td>
                            <td>${ datapro[i].price}</td>
                            <td>${ datapro[i].taxes}</td>
                            <td>${ datapro[i].ads}</td>
                            <td>${ datapro[i].discount}</td>
                            <td>${ datapro[i].total}</td>
                            <td>${ datapro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                            
                        </tr>`
       

    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()"> Delete All (${datapro.length}) </button>
        `
    } else {
        btnDelete.innerHTML = '';
    }
    
}

showData();


//delete a row
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showData();
}

//delete all
function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showData();
}


//update
function updateData(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display='none'
    category.value = datapro[i].category;

    submit.innerHTML = "update";
    mood = update;
    temp = i;
    scroll ( {
        top: 0,
    behavior:"smooth"
    })

}


//search
let searchMood = 'title';
//let search = document.getElementById('search');
function getSearchMood(id) {
    //test
    //console.log(id);

    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else {
        searchMood = 'category';
        search.placeholder = 'Search By category';

    }
    //test
    // console.log(searchMood);
    
    search.focus();
    search.value = '';
    showData();
}


function searchData(value)
{
    //test
    //console.log(value);

    let table = [];
    if (searchMood == 'title')
    {
    
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += ` <tr>
                                        <td>${i}</td>
                                        <td>${datapro[i].title}</td>
                                        <td>${datapro[i].price}</td>
                                        <td>${datapro[i].taxes}</td>
                                        <td>${datapro[i].ads}</td>
                                        <td>${datapro[i].discount}</td>
                                        <td>${datapro[i].total}</td>
                                        <td>${datapro[i].category}</td>
                                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                                        
                                    </tr>`
                   
            
            }
          
        }
    }
    else
    {

        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += ` <tr>
                                        <td>${i}</td>
                                        <td>${datapro[i].title}</td>
                                        <td>${datapro[i].price}</td>
                                        <td>${datapro[i].taxes}</td>
                                        <td>${datapro[i].ads}</td>
                                        <td>${datapro[i].discount}</td>
                                        <td>${datapro[i].total}</td>
                                        <td>${datapro[i].category}</td>
                                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                                        
                                    </tr>`
                   
            
            }
        
        }
    }

    document.getElementById('tbody').innerHTML = table;

}

//clean data

