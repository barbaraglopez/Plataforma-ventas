
//FORMATO DE LA FECHA :const format = (date, locale, options) =>

const format = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date);


//CAPTURO BOTONES DE MODAL NUEVA VENTA(ELIMINAR / CONFIRMAR)
const btnConfirmarNuevaVenta = document.querySelector("#btnGuardarVenta");
const btnCancelarNuevaVenta = document.querySelector("#btnCancelarVenta");

// -------------------------------------------------------------------------------------------//
//                          PRIMER RENDERIZADO EN PANTALLA
// -------------------------------------------------------------------------------------------//
window.addEventListener("load", () => {

  renderizadoDatosReporte();
  renderizadoVentasPorSucursal();
  crearTablaVentas();
  eliminarUnaVenta();
  editarUnaVenta();

  btnOpenModal.addEventListener("click", () => {
    showModal();
    cargarDatos("opcionesComponentes");
    cargarDatos("opcionesVendedoras");
    cargarDatos("opcionesSucursales");
  });

  btnConfirmarNuevaVenta.addEventListener('click', event =>{
    event.preventDefault();
    guardarNuevaVenta();
    hiddeModal();
  })

  btnCancelarNuevaVenta.addEventListener('click', event =>{
    event.preventDefault();
    hiddeModal();
  })

  btnCloseModal.addEventListener("click", hiddeModal);
  overlay.addEventListener("click", hiddeModal);
  btnCancelarEditarVenta.addEventListener("click", hiddeModal2);
  overlay2.addEventListener("click", hiddeModal2);
  btnCancelar.addEventListener("click", hiddeModal3);
  overlay3.addEventListener("click", hiddeModal3);

  document.addEventListener('keydown', function(e){
      if(e.key ==="Escape" || e.key === "scape"){
          hiddeModal()
          hiddeModal2()
          hiddeModal3()
      }
  })
});

/* -------------------------------------------------------------------------- */
/*                     CARGAR DATOS DE VENTAS EN PANTALLA                     */
/* -------------------------------------------------------------------------- */
const crearTablaVentas = () => {
  const { ventas } = local;
  const tablaVentas = document.getElementById("cuadriculaVentas");
  tablaVentas.innerHTML = "";

  ventas.forEach((ventas, index) => {
      const crearFilaVentas = document.createElement("tr");
      let plantillaDeDatos = `<td>${format(ventas.fecha, "es")}</td>
      <td>${ventas.nombreVendedora}</td>
      <td>${ventas.sucursal}</td>
      <td>${ventas.componentes}</td>
      <td>${precioMaquina(ventas.componentes)}</td>
      <td><button class="btnEditar" id="btnEditar-${index}"><i class="fas fa-pencil-alt"></i></button></td>
      <td><button class="btnEliminar" id="btnEliminar-${index}"><i class="fas fa-trash-alt"></i></td>
      `;
      crearFilaVentas.innerHTML = plantillaDeDatos;
      tablaVentas.appendChild(crearFilaVentas);
  });
  modalEnBotonEliminar();
  modalEnBotonEditar();
};

// -------------------------------------------------------------------------------------------//
//                              IMPRESION DE DATOS EN LAS MODALES
// -------------------------------------------------------------------------------------------//
const cargarDatos = (id) => {
  const opciones = document.getElementById(id);
  const { sucursales, vendedoras, precios } = local;
  if (opciones.innerHTML === "") {
    if (id === "opcionesSucursales" || id === "editarOpcionSucursales") {
      sucursales.forEach(element => {
        const crearInputs = document.createElement("option");
        opciones.appendChild(crearInputs);
        crearInputs.innerHTML = `${element}`;
    });
    } else if (id === "opcionesVendedoras" || id === "editarOpcionVendedora") {
      vendedoras.forEach(element => {
        const crearInputs = document.createElement("option");
        opciones.appendChild(crearInputs);
        crearInputs.innerHTML = `${element}`;
      });
    } else {
      precios.forEach(({componente}) => {
        const crearInputs = document.createElement("option");
        opciones.appendChild(crearInputs);
        crearInputs.innerHTML = `${componente}`;
      });
    }
  }
};

// -------------------------------------------------------------------------------------------//
//                               VENTANAS MODALES
// -------------------------------------------------------------------------------------------//

// ----------------------MODAL PARA NUEVA VENTA---------------------

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");

const showModal = () => {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};

const hiddeModal = () =>{
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

// ---------------------------------MODAL PARA EDITAR VENTA-----------------------------------

const modal2 = document.querySelector(".modal2");
const overlay2 = document.querySelector(".overlay2");
const btnCancelarEditarVenta = document.querySelector(".close-modal2");

const showModal2 = () => {
  overlay2.classList.remove("hidden");
  modal2.classList.remove("hidden");
};

const hiddeModal2 = () =>{
  overlay2.classList.add("hidden");
  modal2.classList.add("hidden");
}

//--------------------------------- MODAL PARA ELIMINAR VENTA ----------------------------------

const modal3 = document.querySelector(".modal3");
const overlay3 = document.querySelector(".overlay3");
const btnCancelar = document.querySelector(".close-modal3");

const showModal3 = () => {
  overlay3.classList.remove("hidden");
  modal3.classList.remove("hidden");
};

const hiddeModal3 = () => {
  overlay3.classList.add("hidden");
  modal3.classList.add("hidden");
};

const guardarNuevaVenta = () => {
  const {ventas} = local;
  const optVendedora = document.querySelector('#vendedoras').options;
  const optComponente = document.querySelector('#componentes').options;
  const optSucursal = document.querySelector('#sucursales').options;

  //Trabajo las fechas
  const inputFecha = document.querySelector('#fechaNuevaVenta').value;
  let arrayFecha = inputFecha.split("-")
  let arrayFiltrado = []
  arrayFecha.map(elemento =>{
    arrayFiltrado.push(parseInt(elemento))
  })

  const datosNormalizados = { 
    fecha: undefined, 
    nombreVendedora: undefined, 
    componentes: [], 
    sucursal: undefined
  }
  
  for(const opcion of optVendedora){
    if(opcion.selected === true){
      datosNormalizados.nombreVendedora = opcion.value;
    }
  }
  for(const opcion of optComponente){
    if(opcion.selected === true){
      datosNormalizados.componentes.push(opcion.value);
    }
  }
  for(const opcion of optSucursal){
    if(opcion.selected === true){
      datosNormalizados.sucursal = opcion.value;
    }
  }

  datosNormalizados.fecha = new Date (arrayFiltrado[0], arrayFiltrado[1], arrayFiltrado[2])
  
  ventas.push(datosNormalizados);
  crearTablaVentas();
  renderizadoDatosReporte();
  renderizadoVentasPorSucursal();
}


//FUNCIONALIDAD ELIMINAR VENTA
const eliminarUnaVenta = () => {
    const { ventas } = local;
    const botones = document.querySelectorAll('.btnEliminar');
    let fragmentoID;
    botones.forEach(btn =>{
        btn.addEventListener('click', event =>{
            let id = event.target.id;
            fragmentoID = parseInt(id.slice(12));
            const botonAceptar = document.querySelector('.buttonContainer3 .confirmar');
            const botonCancelar = document.querySelector('.buttonContainer3 .cancelar')

            botonAceptar.addEventListener('click', ()=>{
              ventas.forEach((_, i) => {
                if(i === fragmentoID){
                  ventas.splice(i, 1);
                }
              })
              hiddeModal3();
              crearTablaVentas();
            })

            botonCancelar.addEventListener('click', ()=>{
              fragmentoID = "";
              hiddeModal3();
            })
        })
    })
}

//FUNCIONALIDAD EDITAR VENTA
const editarUnaVenta = () => {
  const {ventas} = local;
  const btnEditar = document.querySelectorAll('.btnEditar');
  let fragmentoID
  btnEditar.forEach(btn=>{
    btn.addEventListener('click', event =>{
      const botonAceptar = document.querySelector('.buttonContainer2 .confirmar');

      cargarDatos("editarOpcionComponentes");
      cargarDatos("editarOpcionVendedora");
      cargarDatos("editarOpcionSucursales");

      let id = event.target.id;
      fragmentoID = parseInt(id.slice(10));
      botonAceptar.addEventListener('click', ()=>{
        ventas.forEach((_,i) => {
          if(i === fragmentoID){
          }
        })
      })
    })
  })
}

//EVENTOS EN EL B0TON ELIMINAR VENTA
const modalEnBotonEliminar = () => {
    const btnOpenModalEliminar = document.querySelectorAll(".btnEliminar");
    btnOpenModalEliminar.forEach((btn) => {
        btn.addEventListener("click", () => {
        showModal3();
        });
    });
};

//EVENTOS EN EL B0TON EDITAR VENTA
const modalEnBotonEditar = () => {
    const btnOpenModalEditar = document.querySelectorAll(".btnEditar");
    btnOpenModalEditar.forEach((btn) => {
        btn.addEventListener("click", () => {
        showModal2();
        });
    });
};

// -------------------------------------------------------------------------------------------//
//                          RENDERIZADO SECCION REPORTES
// -------------------------------------------------------------------------------------------//

const renderizadoDatosReporte = () => {
    const productosEstrella = document.querySelector(".productosEstrella");
    const vendedoraMejor = document.querySelector(".vendedoraMejor");
    productosEstrella.innerHTML = `<p> Producto estrella: <b>${componenteMasVendido()}</b></p>`;
    vendedoraMejor.innerHTML = `<p>Vendedora que más ingresos generó: <b>${nombreVendedoraEstrella()}</b></p>`;
};

// -------------------------------------------------------------------------------------------//
//                       RENDERIZADO SECCION VENTAS POR SUCURSAL
// -------------------------------------------------------------------------------------------//
const renderizadoVentasPorSucursal = () => {
    const sucursal = document.querySelector("#datosMasVentas");
    sucursal.innerHTML = "";
    const totalVentas = document.querySelector("#datosTotalVentas");
    totalVentas.innerHTML = "";
    const datosGuardados = renderPorSucursal();

    datosGuardados.forEach((dato) => {
        sucursal.innerHTML += `<div> ${dato.sucursal}</div>`;
        totalVentas.innerHTML += `<div> ${dato.importe}</div>`;
    });
};
