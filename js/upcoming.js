let fechaActual;
let arrayEventos;
let cardDiv1 = document.querySelector("#CardDiv")
let textLol = ""
let checkBoxFilter = []; // en esta variable con una array vacia es donde vamos a almacenar los filtros 

/*--------------------------------------------HACEMOS LA FUNCION API PARA QUE NOS DE LOS DATOS----------------------------------------------------*/ 
async function getData(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(data => events = data);

    arrayEventos = events.events
    fechaActual= events.currentDate
    // console.log(fechaActual)
    // el filtrado lo movemos dentro del async    
    checkBoxd();
    var checkBOXZ = document.querySelectorAll(`[type=checkbox]`);

    checkBOXZ.forEach(check => check.addEventListener("click", (event) => {
    var checked = event.target.checked;

    if (checked) {
        checkBoxFilter.push(event.target.value)
        filtradoComb(arrayEventos)
    } else {
        checkBoxFilter = checkBoxFilter.filter(uncheck => uncheck !== event.target.value)
        filtradoComb(arrayEventos)      // le ponemos en el parametro arrayEventos xq u si no, no hay nada que imprimir xd 
    }
}))
filtradoComb(arrayEventos)

}
getData() //llamamos la funcion getData para que aparezcan
/*----------------------------------------CREAMOS LAS CARDS DINAMICAS---------------------------------------------*/ 
function displayUpcoming(array){
    let cardLol = ""
    array.forEach( evento => {
        if (fechaActual < evento.date){ 
        cardLol += 
        `<div class="card" style="width: 20rem; height:27rem">
        <img src="${evento.image}" class="imagenesxd mt-3" alt="${evento.name}">
    <div class="card-body d-flex align-items-center flex-column">
        <h5 class="card-title">${evento.name}</h5>
        <p class="card-text">${evento.description}</p>
    </div>
    <p>${evento.date}</p>
    <div class="card-body d-flex justify-content-between">
        <h5 class="me-5">$${evento.price}</h5>
        <a href="./card.html?id=${evento._id}" class="btn btn-danger">See More..</a>
    </div>
</div> `;
        }
    })
    if(cardLol.length > 0){
        cardDiv1.innerHTML= cardLol
        }
        else
        {
            var sinResultados = 
            `<p>Your search was not found</p>`
            cardDiv1.innerHTML = sinResultados;
        }
    // if(array.length > 0){
    // cardDiv1.innerHTML= cardLol
    // }else
    //     cardDiv1.innerHTML=   `<p> aaaaaaaaaaaaaaaaaaa</p>`
}
/*------------------------------------------------------------------------------------------------------------------*/ 
/* -----------------------------------------CREAMOS LOS CHECKS DINAMICOS--------------------------------------*/
function checkBoxd() {    
let checkBox = document.querySelector("#checkbox");
let category = arrayEventos.map(e => e.category);
let categoryNoRepeat = new Set(category);
let categoriasCheck = [...categoryNoRepeat];
    let imprimirCheck = ""
    categoriasCheck.forEach(e => {
        imprimirCheck +=`   <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${e}" id="flexCheckDefault">
        <label class="form-check-label p-lg-1" for="flexCheckDefault">
        ${e}
        </label>
        </div>
        `
    })
    checkBox.innerHTML = imprimirCheck

}

/*------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------------------------------------------------------------------------------*/ 
/*-------------------------------------------------------HACEMOS EL BUSCADOR----------------------------------------*/ 
let buscador = document.querySelector("#buscador");   // llamamos al id
buscador.addEventListener("keyup", (event) => {
    textLol = event.target.value
    filtradoComb(arrayEventos)
})
/*------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------------------------------------------------------------------------------*/ 
/*-----------------------HACEMOS UNA FUNCION QUE ME COMBINA LOS EVENTOS CHECKEADOS Y BUSCADOS-------------------------------------------*/ 
function filtradoComb(array) {
    var datosEvents = [];     //generamos una array vacia para poder añadirle los filtros
    if (checkBoxFilter.length > 0 && textLol !== "") {
        checkBoxFilter.map(categorias => {
            datosEvents.push(...array.filter(evento => evento.name.toLowerCase().includes(textLol.trim().toLowerCase()) && evento.category == categorias))
        })
    } else if (checkBoxFilter.length > 0 && textLol === "") {
        checkBoxFilter.map(categorias => {
            datosEvents.push(...array.filter(evento => evento.category == categorias))
        })
    } else if (checkBoxFilter.length == 0 && textLol !== "") {
        datosEvents.push(...array.filter(evento => evento.name.toLowerCase().includes(textLol.trim().toLowerCase())))

    }  else {
         datosEvents.push(...array) 
        
    }/*   
    if(datosEvents.length == 0 ){
        Sinresultado =  `<p>Your search was not found</p> `
        document.querySelector("#CardDiv").innerHTML = Sinresultado
    } 
    else{ displayUpcoming(datosEvents)} */
    displayUpcoming(datosEvents)
}