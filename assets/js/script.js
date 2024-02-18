const btnConvertir = document.getElementById('btnConvertir');
const inputCLP = document.getElementById('inputCLP');
const monedaSeleccionada = document.getElementById('monedaSeleccionada');
const spanTotal = document.getElementById('spanTotal');
const ctx = document.getElementById('myChart');
const apiUrl = 'https://mindicador.cl/api/';
let myChart;

agregarOpcionDesdeAPI();
btnConvertir.addEventListener('click', convertir)


async function convertir(){
    if(inputCLP.value != ''){
        const valorMoneda = await buscarMoneda(monedaSeleccionada.value);
        let valorCovertido = (inputCLP.value / valorMoneda).toFixed(1);
        spanTotal.innerHTML = `Resultado: $${valorCovertido}`;
    }else{
        alert("Debes ingresar un monto a convertir");
        inputCLP.value = "";
    }
}

async function buscarMoneda(moneda) {
    try {
        const resConvertir = await fetch(`${apiUrl}${moneda}`);
        
        if (!resConvertir.ok) {
            throw new Error(`Error al obtener datos de la API: ${resConvertir.statusText}`);
        }
        
        const dataConvertir = await resConvertir.json();
        const { serie } = dataConvertir;
        const grafico = dataGrafico(serie.slice(0, 10).reverse());

        if (myChart) {
            myChart.data.labels = grafico.fechaGrafico;
            myChart.data.datasets = grafico.infoGrafico.map(({ label, borderColor, valorGrafico }) => ({
                label,
                borderColor,
                data: valorGrafico
            }));
            myChart.update();
        } else {
            renderGrafico(grafico);
        }

        const [{ valor: valorMoneda }] = serie;
        return valorMoneda;

    } catch (error) {
        alert(`Error al obtener datos de la API: buscarMoneda: ${error}`);
    }
}

async function agregarOpcionDesdeAPI() {
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
        alert('Error al obtener datos de la API: agregarOpcionDesdeAPI', error);
    }
}

function renderGrafico(grafico) {
    const configurar = {
        type: "line",
        data: {
            labels: grafico.fechaGrafico,
            datasets: grafico.infoGrafico.map(({ label, borderColor, valorGrafico }) => ({
                label,
                borderColor,
                data: valorGrafico
            }))
        }
    };

    // Si myChart ya está definido, destrúyelo antes de crear un nuevo gráfico
    if (myChart) {
        myChart.destroy();
    }
    ctx.style.backgroundColor = "whitesmoke";
    // Crea una instancia de Chart.js y almacénala en la variable global myChart
    myChart = new Chart(ctx, configurar);
}

function dataGrafico(serie){
    const fechaGrafico = serie.map(({fecha}) => formatoFecha(fecha));
    const valorGrafico = serie.map(({valor}) => valor);
    const infoGrafico = [
        {
            label: "Historial de los Ultimos 10 dias",
            borderColor: "rgb(255, 99, 132)",
            valorGrafico
        },
    ];
    return {fechaGrafico, infoGrafico};
}


function formatoFecha(date){
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}