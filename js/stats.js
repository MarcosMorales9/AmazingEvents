let arrayApi;
let arrayEventos;
let fechaActual;
let pastEvents;
let futureEvents;

async function getDataApi() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(response => arrayApi = response)

    arrayEventos = arrayApi.events
    fechaActual = arrayApi.currentDate
    let pastEvents = arrayEventos.filter(e => fechaActual > e.date)
    let futureEvents = arrayEventos.filter(e => fechaActual < e.date) // dividimos las cards por eventos pasados y futuros con el valor de fechaActual
    /////////////TABLA 1/////////////
    let porcentajes = []
    pastEvents.map(eventos => {
        porcentajes.push({
            eventos: eventos.name,
            porAssistance: (eventos.assistance * 100 / eventos.capacity).toFixed(2)
        })
    })
    let max = porcentajes.sort((a, b) => b.porAssistance - a.porAssistance)[0]
    console.log(max);

    let min = porcentajes.sort((a, b) => a.porAssistance - b.porAssistance)[0]
    console.log(min);

    let capacity = pastEvents.filter(e=>e.capacity).sort((a,b) => b.capacity - a.capacity)[0]
    console.log(capacity);
/* EVENTOS FUTURO*/
    const categoryAssistFuture = futureEvents.map(events => events.category)
    const categorySetFuture = new Set(categoryAssistFuture)
    const categoryFuture =[...categorySetFuture];


    const categoryValueFuture = [] //  hacemos un array que tiene un objeto con 2 propidades que serian category y evento 
    categoryFuture.map(category =>
        categoryValueFuture.push({
            category: category,
            evento: futureEvents.filter(evento => evento.category === category), // tenemos las categorias que tienen adentro todos los eventos pasados
        })
    )
console.log(categoryValueFuture);

let estimateAndCapacityFuture = [] // a la anterior mapeamos en un array de cada evento y la assitencia y la capacidad y revenue 
categoryValueFuture.map(datardos => {
    estimateAndCapacityFuture.push({
        category: datardos.category,
        estimate: datardos.evento.map(item => item.estimate),
        capacity: datardos.evento.map(item => item.capacity),
        estimateRevenue: datardos.evento.map(item => item.estimate * item.price)
    })
})
console.log(estimateAndCapacityFuture);

estimateAndCapacityFuture.forEach(category => { // separamos por categoria
    let totalEstimate = 0
    category.estimate.forEach(estimate => totalEstimate += Number(estimate)) // suma de estimate
    category.estimate = totalEstimate

    let totalCapacityFuture = 0
    category.capacity.forEach(capacity => totalCapacityFuture += Number(capacity)) // capacity
    category.capacity = totalCapacityFuture

    let totalRevenueEstimate = 0
    category.estimateRevenue.forEach(estimateRevenue => totalRevenueEstimate += Number(estimateRevenue)) // revenue
    category.estimateRevenue= totalRevenueEstimate

    category.porcentaje = ((totalEstimate * 100) / totalCapacityFuture).toFixed(2) //se le agrega una prop  % de asistencias por categoria
})
console.log(estimateAndCapacityFuture);
    /////////////// EVENTS PAST //////////////////
    let categoryByAssist = arrayEventos.map(e => e.category); // agarramos las categorias del pasado
    let categorySet = new Set(categoryByAssist); // eliminamos las categorias repetidas
    let categorias = [...categorySet]; // lo hacemos array(categorySet) ya que no es por el set  

    const categoryValue = [] //  hacemos un array que tiene un objeto con 2 propidades que serian category y evento 
    categorias.map(category =>
        categoryValue.push({
            category: category,
            evento: pastEvents.filter(evento => evento.category === category), // tenemos las categorias que tienen adentro todos los eventos pasados
        })
    )
        console.log(categoryValue);

    let assistAndCapacity = [] // a la anterior mapeamos en un array de cada evento y la assitencia y la capacidad y revenue 
    categoryValue.map(datardos => {
        assistAndCapacity.push({
            category: datardos.category,
            assistance: datardos.evento.map(item => item.assistance),
            capacity: datardos.evento.map(item => item.capacity),
            revenue: datardos.evento.map(item => item.assistance * item.price)
        })
    })

    console.log(assistAndCapacity);

    // sumamos los elementos entre si osea assitance, capacity y revenue
    assistAndCapacity.forEach(category => { // separamos por categoria
        let totalAssist = 0
        category.assistance.forEach(assistance => totalAssist += Number(assistance)) // suma de assitance
        category.assistance = totalAssist

        let totalCapacity = 0
        category.capacity.forEach(capacity => totalCapacity += Number(capacity)) // capacity
        category.capacity = totalCapacity

        let totalRevenue = 0
        category.revenue.forEach(revenue => totalRevenue += Number(revenue)) // revenue
        category.revenue= totalRevenue

        category.porcentaje = ((totalAssist * 100) / totalCapacity).toFixed(2) //se le agrega una prop  % de asistencias por categoria
    })
    console.log(assistAndCapacity);
    console.log(categoryValue);

/* imp tablas */

function Tables(){
    let contenedor = `  <tr>
    <td>Events with the highest percentage of attendance</td>
    <td class="bordercolor">Events with the lowest percentage of attendance</td>
    <td>Event with larger capacity</td>
  </tr>
     <td>${max.eventos} : ${max.porAssistance}% </td>
    <td class="bordercolor">${min.eventos} : ${min.porAssistance}%</td>
    <td>${capacity.name} : ${capacity.capacity}</td>`
    document.querySelector("#tableStats").innerHTML = contenedor
}
Tables()

function TableUp(){
    let contenedorDos =`<tr>
    <td scope="col" class="bordercolor">Categories</td>
    <td scope="col" class="bordercolor">Revenues</td>
    <td scope="col" class="bordercolor">Porcentage of attendance</td>
  </tr>`

    estimateAndCapacityFuture.forEach(e => {
        
        e.estimateAndCapacityFuture

        contenedorDos +=
        `<tr>
        <td scope="row" class="bordercolor">${e.category}</td>
        <td class="bordercolor">$${e.estimateRevenue}</td>
        <td class="bordercolor">${e.porcentaje}%</td>
        </tr>
        `
    })
    document.querySelector("#table2").innerHTML= contenedorDos
}
TableUp()

function tablePast(){
    let TablePastHTML =`<tr>
    <td class="bordercolor">Categories</td>
    <td class="bordercolor">Revenues</td>
    <td class="bordercolor">Porcentage of attendance</td>
  </tr>`

    assistAndCapacity.forEach(e => {
        
        e.assistAndCapacity

        TablePastHTML +=
        `<tr>
        <td class="bordercolor">${e.category}</td>
        <td class="bordercolor">$${e.revenue}</td>
        <td class="bordercolor">${e.porcentaje}%</td>
        </tr>
        `
    })
    document.querySelector("#tablePast").innerHTML= TablePastHTML
}
tablePast()
}
getDataApi();