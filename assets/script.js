const btnConvertir = document.getElementById('btnConvertir');
const monedaSeleccionada = document.getElementById('monedaSeleccionada')
const apiUrl = 'https://mindicador.cl/api/';
let tablaHTML = '';

let convertir  = () => {

}
btnConvertir.addEventListener('click', convertir)


fetch(apiUrl)
  .then(res => res.json())
  console.log(res)
  .then(data => {
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.codigo;
      option.textContent = item.nombre;
      monedaSeleccionada.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Hubo un problema al obtener los datos:', error);
  });


async function getData(){
    try{
        const res = await fetch("https://mindicador.cl/api/");
        const datas = await res.json();
        console.log(datas);
    }catch (error){
        alert(error.message);
    }
    }
