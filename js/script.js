// -------------------------------------------------------------------------------------------//
//                               PRIMER RENDERIZADO
// -------------------------------------------------------------------------------------------//
window.addEventListener('load',()=>{
  renderizadoDatosReporte()
  renderizadoVentasPorSucursal()
  crearTablaVentas()
})


// -------------------------------------------------------------------------------------------//
//                               VENTANAS MODALES
// -------------------------------------------------------------------------------------------//

// ----------------------MODAL PARA NUEVA VENTA---------------------
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let btnCloseModal = document.querySelector(".close-modal");
let btnOpenModal = document.querySelector(".show-modal"); 


let showModal = function () {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
}

let hiddeModal = function (){
    overlay.classList.add('hidden')
    modal.classList.add('hidden')
}

btnOpenModal.addEventListener('click', ()=>{
    showModal()
    //componentesSelect();
    cargarDatos('opcionesComponentes');
    cargarDatos('opcionesVendedoras');
    cargarDatos('opcionesSucursales');

})

// -------------------------------------------------------------------------------------------//
//                              IMPRESION DE DATOS EN LAS MODALES
// -------------------------------------------------------------------------------------------//
//OPCION SELECCIONAR COMPONENTES
const componentesSelect = () => {
  let opcionesComponentes = document.getElementById('opcionesComponentes')
//creo los option del select 
      const {precios} = local;
      for(const {componentes} of precios){
      const crearInputs = document.createElement('option');
      opcionesComponentes.appendChild(crearInputs);
      crearInputs.innerHTML = `${componentes}`
      }
}

//OPCION SELECCIONAR VENDEDORA
const vendedoraSelect = () => {
  const nodoVendedoras = document.getElementById('opcionesVendedoras')
  if(nodoVendedoras.innerHTML === ""){
      for(const{vendedoras} of local){
          let vendedorass = vendedoras
          const crearOpciones = document.createElement('option');
          nodoVendedoras.appendChild(crearOpciones);
          crearOpciones.innerHTML = `${vendedorass}`
      }  
  }     
} 

 //OPCION SELECCIONAR SUCURSAL
const selectSucursal = () => {
  const opcionSucursales = document.getElementById('opcionesSucursales')
  if(opcionSucursales.innerHTML === ""){
      for(const{sucursales} of local){
          let array = sucursales
          const opciones = document.createElement('option');
          opcionSucursales.appendChild(opciones);
          opciones.innerHTML = `${array}`
      }  
  }
} 

const cargarDatos = (id) => {
  const opciones = document.getElementById(id)
  const {sucursales, vendedoras, precios} = local;
  if(opciones.innerHTML===""){
      if(id === 'opcionesSucursales'){
          sucursales.forEach(element => {
              const opciones = document.createElement('option');
              const opcionSucursales = document.getElementById('opcionesSucursales')
              opcionSucursales.appendChild(opciones);
              opciones.innerHTML = `${element}`
          } )
      }else if(id === 'opcionesVendedoras'){
          vendedoras.forEach(element=>{
              const crearOpciones = document.createElement('option');
              let nodoVendedoras = document.getElementById('opcionesVendedoras')
              nodoVendedoras.appendChild(crearOpciones);
              crearOpciones.innerHTML = `${element}`
          })
      }else{ 
          precios.forEach(({componente})=>{
              const crearInputs = document.createElement('option');
              opcionesComponentes.appendChild(crearInputs);
              crearInputs.innerHTML = `${componente}`
          })
      }
  }
}

// ---------------------------------MODAL PARA EDITAR VENTA----------------------------------- 

let modal2 = document.querySelector(".modal2");
let overlay2 = document.querySelector(".overlay2");
let btnCancelarNuevaVenta = document.querySelector(".close-modal2");

function showModal2() {
    overlay2.classList.remove('hidden')
    modal2.classList.remove('hidden')
}
    
function  hiddeModal2() {
    overlay2.classList.add('hidden')
    modal2.classList.add('hidden')
}

//--------------------------------- MODAL PARA ELIMINAR VENTA ----------------------------------

let modal3 = document.querySelector(".modal3");
let overlay3 = document.querySelector(".overlay3");
let btnCancelar = document.querySelector(".close-modal3");

function showModal3() {
    overlay3.classList.remove('hidden')
    modal3.classList.remove('hidden')
}
    
function hiddeModal3() {
        overlay3.classList.add('hidden')
        modal3.classList.add('hidden')
}


//FORMATO DE LA FECHA :
const format = (date, locale ,options) => new Intl.DateTimeFormat(locale, options).format(date);

crearTablaVentas=()=>{
  const{ventas} = local;
  const tablaVentas = document.getElementById('cuadriculaVentas');
  tablaVentas.innerHTML = "";

  ventas.forEach(ventas=>{
    const crearFilaVentas = document.createElement('tr');

    let plantillaDeDatos =
    `<td>${format(ventas.fecha, 'es')}</td>
    <td>${ventas.nombreVendedora}</td>
    <td>${ventas.sucursal}</td>
    <td>${ventas.componentes}</td>
    <td>${precioMaquina(ventas.componentes)}</td>
    <td><button class="btnEditar"><i id="btnEditar-${ventas}" class="fas fa-pencil-alt"></i></button></td>
    <td><button class="btnEliminar"><i id="btnEliminar-${ventas}" class="fas fa-trash-alt"></i></td>
      `;

  crearFilaVentas.innerHTML = plantillaDeDatos;
  tablaVentas.appendChild(crearFilaVentas);
  })

  borrarVenta();
  //editarVenta()
}
//BOTONES BORRADO


//CARGA DE DATOS EN REPORTES

const renderizadoDatosReporte=()=>{
  const productosEstrella = document.querySelector('.productosEstrella')
  const vendedoraMejor = document.querySelector('.vendedoraMejor')
  productosEstrella.innerHTML = `<p> Producto estrella: <b>${componenteMasVendido()}</b></p>`
  vendedoraMejor.innerHTML =`<p>Vendedora que más ingresos generó: <b>${mejorVendedoraDelAño(2019)}</b></p>`
}


//CARGA DE DATOS EN VENTAS POR SUCURSAL
const renderizadoVentasPorSucursal=()=>{
    const sucursal = document.querySelector('#datosMasVentas')
    sucursal.innerHTML="";
    const totalVentas = document.querySelector('#datosTotalVentas')
    totalVentas.innerHTML = "";
    const datosGuardados = renderPorSucursal()
    
    datosGuardados.forEach(dato=>{
      sucursal.innerHTML += `<div> ${dato.sucursal}</div>`
      totalVentas.innerHTML +=`<div> ${dato.importe}</div>`
    })
  
}

