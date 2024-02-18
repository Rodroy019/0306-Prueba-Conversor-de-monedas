const btnConvertir = document.getElementById('btnConvertir');
const inputCLP = document.getElementById('inputCLP');
const monedaSeleccionada = document.getElementById('monedaSeleccionada');
const spanTotal = document.getElementById('spanTotal');
const apiUrl = 'https://mindicador.cl/api/';
const fechaActual = new Date();

agregarOpcionesDesdeAPI();



async function convertir(){
    if(inputCLP.value != ''){
        const valorMoneda = await buscarMoneda(monedaSeleccionada.value);
        let valorCovertido = (inputCLP.value / valorMoneda);
        spanTotal.innerHTML = valorCovertido;
    }else{
        alert("Debes ingresar un monto a convertir");
        inputCLP.value = "";
    }
}

btnConvertir.addEventListener('click', convertir)


async function buscarMoneda(moneda){
    try{
        const resConvertir = await fetch(`${apiUrl}${moneda}`);
        const dataConvertir = await resConvertir.json();
        const { serie } = dataConvertir;
        const [{valor: valorMoneda}] = serie;
        console.log(valorMoneda);
        return valorMoneda;
    
    }catch (error){
        console.log(error);
    }

}






async function agregarOpcionesDesdeAPI() {
    try {

        const res = await fetch(apiUrl);
        const data = await res.json();

        for (const [codigo, info] of Object.entries(data)) {
            if (codigo && info.nombre) {
                const option = document.createElement('option');
                option.value = codigo;
                option.textContent = `${info.nombre}`;
                monedaSeleccionada.appendChild(option);
            }
        }
    } catch (error) {
        console.error('Error al obtener datos de la API:', error);
    }
}

