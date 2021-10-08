const criptoSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

const objBusqueda = {
    moneda: "",
    criptomoneda: "",
}

//Crear un promise
const obetenerCriptomonedas = criptomonedas => new Promise(resoleve => {
    resoleve(criptomonedas);
}) 

document.addEventListener("DOMContentLoaded", ()=> {
    consultarCriptomonedas();
    formulario.addEventListener("submit", submitForm);

    criptoSelect.addEventListener("change", leerValor);
    monedaSelect.addEventListener("change", leerValor);
});

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value;
}

function consultarCriptomonedas(){
    const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD";

    fetch (url)
    .then(res => res.json() )
    .then(res => obetenerCriptomonedas(res.Data))
    .then(criptomonedas => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach( moneda => {
        const {FullName, Name} = moneda.CoinInfo;

        const option = document.createElement("option");
        option.value = Name;
        option.textContent = FullName;
        criptoSelect.append(option);
    });
}

function submitForm(e){
    e.preventDefault();
    const {moneda, criptomoneda} = objBusqueda;

    if(moneda === "" || criptomoneda === ""){
        mostrarAlerta("Ambos Campos Son Obligatorios");
        return;
    }

    //Consultar API
    consultarAPI();
}

function consultarAPI(){
    const {moneda, criptomoneda} = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    
    mostrarSpinner();
    fetch(url)
    .then(res => res.json())
    .then(res => {
        mostrarCotizacion(res.DISPLAY[criptomoneda][moneda])
    })
}

function mostrarCotizacion (cotizacion){
    limpiarHTML();
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = cotizacion;

    const precio = document.createElement("p");
    precio.innerHTML = `El precio es: <span>${PRICE}</span>`;
    precio.classList.add("precio");

    const precioAlto = document.createElement("p");
    precioAlto.innerHTML = `El precio mas alto del día: <span>${HIGHDAY}</span>`
    
    const precioBajo = document.createElement("p");
    precioBajo.innerHTML = `El precio mas bajo del día: <span>${LOWDAY}</span>`
    
    const lastHours = document.createElement("p");
    lastHours.innerHTML = `Variación las últimas 24H: <span>${CHANGEPCT24HOUR}%</span>`
    
    const lastUpdate = document.createElement("p");
    lastUpdate.innerHTML = `Última actualización: <span>${LASTUPDATE}</span>`

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(lastHours);
    resultado.appendChild(lastUpdate);
}

function mostrarSpinner(){
    limpiarHTML()
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.innerHTML = 
    `<div class="double-bounce1"></div>
    <div class="double-bounce2"></div>`;

    resultado.appendChild(spinner);
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function mostrarAlerta(mensaje){
    
    const error = document.querySelector(".error");
    if(!error){
        const alerta = document.createElement("div");
        alerta.textContent = mensaje;
        alerta.classList.add("error");

        formulario.append(alerta);

        setTimeout( ()=>{
            alerta.remove();
        },3000) 
    }
}

