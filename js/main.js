let arrayEventos;
let cardDiv1 = document.querySelector("#CardDiv") // llamamos el html de cardDiv
let checkBox = document.querySelector("#checkbox"); // Llamamos el html de los checks
let buscador = document.querySelector("#buscador"); //buscamos la id buscador que hace referencia al search
let textLol = ""
let checkBoxFilter = [];

getData()

let xd;

async function getData(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(data => xd = data);
 // el orden de esto es importante para que se ejecute de manera correcta en el async ya que si no tenemos checkBoxd no podriamos usar el filter 
    arrayEventos = xd.events
    checkBoxd();

    ///////////////////////////////////////
// FILTER CHECKBOX
    var checkBOXZ = document.querySelectorAll(`[type=checkbox]`);

checkBOXZ.forEach(check => check.addEventListener("click", (event) => {
    var checked = event.target.checked;

    if (checked) {
        checkBoxFilter.push(event.target.value)
        filtradoComb(arrayEventos)
        console.log(checked);
    } else {
        checkBoxFilter = checkBoxFilter.filter(uncheck => uncheck !== event.target.value)
        filtradoComb(arrayEventos)
    }
}))
filtradoComb(arrayEventos)
    console.log(arrayEventos)

}
///////////////////////////////////////////  CARDS /////////////////////////////////////////
function displayCards(array) { // le damos un parametro array a displaycards ya que si usamos una variable seria fijo y no se podria filtrar
    let cardLol = ""
    array.forEach(data => {
        cardLol +=
            `<div class="card" style="width: 20rem; height:27rem">
                        <img src="${data.image}" class="imagenesxd mt-3" alt="${data.name}">
                    <div class="card-body d-flex align-items-center flex-column">
                        <h5 class="card-title">${data.name}</h5>
                        <p class="card-text">${data.description}</p>
                    </div>
                    <p>${data.date}</p>
                    <div class="card-body d-flex justify-content-between">
                        <h5 class="me-5">$${data.price}</h5>
                        <a href="./card.html?id=${data._id}" class="btn btn-danger">See More..</a>
                    </div>
                </div> `
    })
    cardDiv1.innerHTML = cardLol
}
////////////////////////////////////////////////////////////////////////////////
// CHECKBOXS
function checkBoxd() {
    let category = arrayEventos.map(e => e.category);  // le damos el valor de las categorias de los eventos 
    let categoryNoRepeat = new Set(category); // elimina las categorias repetidas del array pero se convierte en objeto y las hace como valor unico
    let categoriasCheck = [...categoryNoRepeat]; // convertimos en categoryNoRepeat de objeto a array
    let imprimirChecks = ""
    categoriasCheck.forEach(e => {
        imprimirChecks +=
            `
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="${e}" id="flexCheckDefault">
        <label class="form-check-label p-lg-1" for="flexCheckDefault">
        ${e}
        </label>
    </div>
    `
    })
    checkBox.innerHTML = imprimirChecks
    // console.log(arrayEventos);
}
////////////////////////////////////////////////////////////////////////////
// SEARCH
buscador.addEventListener("keyup", (event) => { // generamos un evento keyup que lo que hace es que cuando busquemos una card con el nombre se vaya mostrando
    textLol = event.target.value
    filtradoComb(arrayEventos)
})
////////////////////////////////////////////////////////////////////
// FILTRAR COMBINACION 
function filtradoComb(array) {
    var datosEvents = [];
    if (checkBoxFilter.length > 0 && textLol !== "") {
        checkBoxFilter.map(categorias => {
            datosEvents.push(...array.filter(evento => evento.name.toLowerCase().includes(textLol.trim().toLowerCase()) && evento.category == categorias))
        })
    }else if(checkBoxFilter.length > 0 && textLol === "") {
        checkBoxFilter.map(categorias => {
            datosEvents.push(...array.filter(evento => evento.category == categorias))
        })
    } else if (checkBoxFilter.length == 0 && textLol !== "") {
        datosEvents.push(...array.filter(evento => evento.name.toLowerCase().includes(textLol.trim().toLowerCase())))
    } 
    else { datosEvents.push(...array) }
    
    if(datosEvents.length == 0 ){
        Sinresultado =  `<p>Your search was not found</p> `
        document.querySelector("#CardDiv").innerHTML = Sinresultado
    }
    else{ displayCards(datosEvents)}
}

// elemento, indice, arraycompleto