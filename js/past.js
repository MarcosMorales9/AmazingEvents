let fechaActual;
let arrayEventos;
let cardDiv1 = document.querySelector("#CardDiv")
let textLol = ""
let checkBoxFilter = []
/*--------------------------------------------HACEMOS LA FUNCION API PARA QUE NOS DE LOS DATOS----------------------------------------------------*/ 
async function DisplayAPI() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(data => xd = data)

    arrayEventos = xd.events
    fechaActual = xd.currentDate

    // llamamos a la funcion que crea los checksbox
    checkBoxd();

    // llamamos a la funcion QUE FILTRA los checks
    var checkBOXZ = document.querySelectorAll(`input[type=checkbox]`);

    checkBOXZ.forEach(check => check.addEventListener("click", (event) => {
        var checked = event.target.checked;
        if (checked) {
            checkBoxFilter.push(event.target.value)
            filtradoComb(arrayEventos)
        } else {
            checkBoxFilter = checkBoxFilter.filter(uncheck => uncheck !== event.target.value)
            filtradoComb(arrayEventos)
        }
    }))
    // llamamos al que filtra y busca las cards  ya que si no tenemos los datos no podriamos ejecutarlos y ademas se ejecutan cuando tienen la api y se esa manera le pasamos el array con los datos
    filtradoComb(arrayEventos)
}
DisplayAPI()

/*----------------------------------------CREAMOS LAS CARDS DINAMICAS---------------------------------------------*/ 
function displayPast(array) {
    let cardLol = "";
    array.forEach(evento => {
        if (fechaActual > evento.date)
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
</div> `
    })
    if (array.length > 0) {     // hacemos una condicion que si es mayor a 0 que nos imprima las cards
        cardDiv1.innerHTML = cardLol
    } else       // ysi no es mayor que nos muestre el siguiente mensaje ya que si no es mayor a 0, por ende es menor 
        cardDiv1.innerHTML = `<p>Your search was not found</p>`
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
        imprimirCheck += `   <div class="form-check">
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
let buscador = document.querySelector("#buscador");
buscador.addEventListener("keyup", (event) => {
    textLol = event.target.value
    filtradoComb(arrayEventos)
})
/*------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------------------------------------------------------------------------------*/ 
/*-----------------------HACEMOS UNA FUNCION QUE ME COMBINA LOS EVENTOS CHECKEADOS Y BUSCADOS-------------------------------------------*/ 
function filtradoComb(array) {
    var datosEvents = [];
    if (checkBoxFilter.length > 0 && textLol !== "") {
        checkBoxFilter.map(categorias => {
            datosEvents.push(...array.filter(evento => evento.name.toLowerCase().includes(textLol.trim().toLowerCase()) && evento.category == categorias))
        }) // chec y busc
    } else if (checkBoxFilter.length > 0 && textLol === "") {
        checkBoxFilter.map(categorias => {
            datosEvents.push(...array.filter(evento => evento.category == categorias))
        }) //checks
    } else if (checkBoxFilter.length == 0 && textLol !== "") {
        datosEvents.push(...array.filter(evento => evento.name.toLowerCase().includes(textLol.trim().toLowerCase())))
    } //buscador
    else {
        datosEvents.push(...array)
    }
    displayPast(datosEvents)
}