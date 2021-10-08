const criptoSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");
const formulario = document.querySelector("#formulario");

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
    formulario.addEventListener("click", submitForm);

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
}

function mostrarAlerta(mensaje){
    console.log(mensaje);
}