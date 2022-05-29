let arrayEventos;
let fechaActual;
let contenedorCards = document.querySelector("#mainCards")

let dataApi

async function getData(){
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(response => response.json())
    .then(data => dataApi = data);

    arrayEventos = dataApi.events
    fechaActual= dataApi.currentDate
    detail(arrayEventos)


console.log(arrayEventos);

function detail() {

    var id = location.search.split("?id=")[1]
    var eventosXd = arrayEventos.find((eventos) =>{
        return eventos._id == id

    })  
    var templateHtml = `
    <div class="mt-5 mb-5 d-flex ">
    <div class="card bg-danger cardDetail">
        <div class="d-flex flex-column align-items-center container-fluid mt-3">
            <img src="${eventosXd.image}" class="img-fluid cardimage imagenDetails" alt="...">
        <div class="d-flex align-items-center flex-column justify-content-start text-white">
            <h2>${eventosXd.name}</h2>
            <h3>Date: ${eventosXd.date}</h3>
            <p>${eventosXd.description}</p>
            <p>Category: ${eventosXd.category}</p>
            <p> Place: ${eventosXd.place}</p>
            <h5>$${eventosXd.price}</h5>
         </div>
    </div>
    </div>
    </div> `    
contenedorCards.innerHTML = templateHtml
}
}
getData()

