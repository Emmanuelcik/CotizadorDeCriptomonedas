const criptoSelect = document.querySelector("#criptomonedas");

//Crear un promise
const obetenerCriptomonedas = criptomonedas => new Promise(resoleve => {
    resoleve(criptomonedas);
}) 

document.addEventListener("DOMContentLoaded", ()=> {
    consultarCriptomonedas();

});

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