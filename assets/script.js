const btnConvertir = document.getElementById('btnConvertir');
const inputCLP = document.getElementById('inputCLP');
const monedaSeleccionada = document.getElementById('monedaSeleccionada');
const apiUrl = 'https://mindicador.cl/api/';

agregarOpcionesDesdeAPI();



let convertir  = () => {

}

btnConvertir.addEventListener('click', convertir)









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

