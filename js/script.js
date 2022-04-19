//FORMATO DE LA FECHA :const format = (date, locale, options) =>
const format = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date);

//Id para editar venta
let fragmentoIDEditar = undefined;
let fragmentoIDEliminar = undefined;

/* -------------------------------------------------------------------------- */
/*                   Primera carga e invocación de funciones                  */
/* -------------------------------------------------------------------------- */
window.addEventListener("load", () => {
  const btnagregarNuevaVenta = document.querySelector(".show-modal");

  const btnAceptarNuevaVenta = document.querySelector("#btnGuardarVenta");
  const btnCancelarNuevaVenta = document.querySelector("#btnCancelarVenta");
  
  const btnAceptarEditarVenta = document.querySelector(".buttonContainer2 .confirmar");
  const btnCancelarEditarVenta = document.querySelector(".buttonContainer2 .cancelar");

  const btnAceptarEliminar = document.querySelector(".buttonContainer3 .confirmar");
	const btnCancelarEliminar = document.querySelector(".buttonContainer3 .cancelar");

  //Muestro las ventas ya disponibles en la tabla.
  crearTablaVentas();
  //Cargo los datos de los reportes.
  renderizadoDatosReporte();
  //Cargo los datos de las ventas por sucursal.
  renderizadoVentasPorSucursal();

  btnagregarNuevaVenta.addEventListener("click", () => {
		showModal();
		cargarDatos("opcionesComponentes");
		cargarDatos("opcionesVendedoras");
		cargarDatos("opcionesSucursales");
  });
/* ------------------------------------ x ----------------------------------- */
  btnAceptarNuevaVenta.addEventListener('click', (event) =>{
    event.preventDefault();
    guardarNuevaVenta();
  });

  btnCancelarNuevaVenta.addEventListener("click", (event) => {
    event.preventDefault();
    hiddeModal();
  });

/* ------------------------------------ x ----------------------------------- */
  btnAceptarEditarVenta.addEventListener('click', event =>{
    event.preventDefault();
    editarUnaVenta(fragmentoIDEditar);
  })

  btnCancelarEditarVenta.addEventListener('click', event =>{
    event.preventDefault();
    fragmentoIDEditar = "";
    hiddeModal2();
  })

  /* ------------------------------------ x ----------------------------------- */
  btnAceptarEliminar.addEventListener('click', event =>{
    event.preventDefault();
    eliminarUnaVenta(fragmentoIDEliminar);
    crearTablaVentas();
    renderizadoDatosReporte();
    renderizadoVentasPorSucursal();
    hiddeModal3();
  })
  btnCancelarEliminar.addEventListener('click', event =>{
    event.preventDefault();
    fragmentoIDEliminar = "";
    hiddeModal3();
  })

  document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" || e.key === "scape") {
			hiddeModal();
			hiddeModal2();
			hiddeModal3();
		}
  });
});

/* -------------------------------------------------------------------------- */
/*                      Carga datos de ventas en pantalla                     */
/* -------------------------------------------------------------------------- */
const crearTablaVentas = () => {
	const { ventas } = local;
	const tablaVentas = document.getElementById("cuadriculaVentas");
	tablaVentas.innerHTML = "";

	ventas.forEach((venta, index) => {
		const crearFilaVenta = document.createElement("tr");
		let plantillaDeDatos = `<td>${format(venta.fecha, "es")}</td>
      <td>${venta.nombreVendedora}</td>
      <td>${venta.sucursal}</td>
      <td>${venta.componentes}</td>
      <td>${precioMaquina(venta.componentes)}</td>
      <td><button class="btnEditar" id="btnEditar-${index}"><i class="fas fa-pencil-alt"></i></button></td>
      <td><button class="btnEliminar" id="btnEliminar-${index}"><i class="fas fa-trash-alt"></i></td>
      `;
		crearFilaVenta.innerHTML = plantillaDeDatos;
		tablaVentas.appendChild(crearFilaVenta);
	});

  //Asigno los eventos a los botones creados dinámicamente
  const btnEditarVentas = document.querySelectorAll(".btnEditar");
  const btnEliminarVentas = document.querySelectorAll(".btnEliminar");

  btnEditarVentas.forEach(btn =>{
    btn.addEventListener('click', event =>{
      showModal2();
      fragmentoIDEditar = parseInt(event.target.id.slice(10));
      cargarDatos("editarOpcionComponentes");
			cargarDatos("editarOpcionVendedora");
			cargarDatos("editarOpcionSucursales");
    })
  });

  btnEliminarVentas.forEach(btn =>{
    btn.addEventListener('click', event =>{
      showModal3();
      fragmentoIDEliminar = parseInt(event.target.id.slice(12));
    })
  })

};

/* -------------------------------------------------------------------------- */
/*                        Impresion de datos en modales                       */
/* -------------------------------------------------------------------------- */
const cargarDatos = (id) => {
	const opciones = document.getElementById(id);
	const { sucursales, vendedoras, precios } = local;
  opciones.innerHTML="";

  if (id === "opcionesSucursales" || id === "editarOpcionSucursales") {
    sucursales.forEach((element) => {
      const crearInputs = document.createElement("option");
      opciones.appendChild(crearInputs);
      crearInputs.innerHTML = `${element}`;
    });
  } else if (id === "opcionesVendedoras" || id === "editarOpcionVendedora") {
    vendedoras.forEach((element) => {
      const crearInputs = document.createElement("option");
      opciones.appendChild(crearInputs);
      crearInputs.innerHTML = `${element}`;
    });
  } else {
    precios.forEach(({ componente }) => {
      const crearInputs = document.createElement("option");
      opciones.appendChild(crearInputs);
      crearInputs.innerHTML = `${componente}`;
    });
  }
};

/* -------------------------------------------------------------------------- */
/*                              Ventanas Modales                              */
/* -------------------------------------------------------------------------- */

/* ------------------------- MODAL PARA NUEVA VENTA ------------------------- */
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const showModal = () => {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
};
const hiddeModal = () =>{
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
}

overlay.addEventListener("click", hiddeModal);

/* ------------------------- MODAL PARA EDITAR VENTA ------------------------ */
const modal2 = document.querySelector(".modal2");
const overlay2 = document.querySelector(".overlay2");

const showModal2 = () => {
  overlay2.classList.remove("hidden");
  modal2.classList.remove("hidden");
};
const hiddeModal2 = () =>{
  overlay2.classList.add("hidden");
  modal2.classList.add("hidden");
}

overlay2.addEventListener("click", hiddeModal2);

/* ------------------------ MODAL PARA ELIMINAR VENTA ----------------------- */
const modal3 = document.querySelector(".modal3");
const overlay3 = document.querySelector(".overlay3");

const showModal3 = () => {
  overlay3.classList.remove("hidden");
  modal3.classList.remove("hidden");
};
const hiddeModal3 = () => {
  overlay3.classList.add("hidden");
  modal3.classList.add("hidden");
};

overlay3.addEventListener("click", hiddeModal3);

/* -------------------------------------------------------------------------- */
/*                             Guardar nueva venta                            */
/* -------------------------------------------------------------------------- */
const guardarNuevaVenta = () => {
	const selectVendedoras = document.querySelector("#vendedoras").options;
	const selectComponentes = document.querySelector("#componentes").options;
	const selectSucursales = document.querySelector("#sucursales").options;

	const { ventas } = local;

  const inputFecha = document.querySelector("#fechaNuevaVenta").value;
  const arrayFecha = [...inputFecha.split("-")];//Se guardan los elementos de la fecha en el array

  const datosNormalizados = {
    fecha: undefined,
    nombreVendedora: undefined,
    componentes: [],
    sucursal: undefined,
  };

  for (const opcion of selectVendedoras) {
    if (opcion.selected === true) {
      datosNormalizados.nombreVendedora = opcion.value;
    }
  }
  for (const opcion of selectComponentes) {
    if (opcion.selected === true) {
      datosNormalizados.componentes.push(opcion.value);
    }
  }
  for (const opcion of selectSucursales) {
    if (opcion.selected === true) {
      datosNormalizados.sucursal = opcion.value;
    }
  }
  datosNormalizados.fecha = new Date(
    arrayFecha[0],
    arrayFecha[1]-1,
    arrayFecha[2]
  );

  let fechaHoy = new Date()
  if(datosNormalizados.fecha !== undefined && 
    datosNormalizados.fecha <= fechaHoy && 
    datosNormalizados.nombreVendedora !==undefined && 
    datosNormalizados.componentes.length > 0){
    
    ventas.push(datosNormalizados);
    swal("Bien!","Venta cargada con exito","success")
    crearTablaVentas();
		renderizadoDatosReporte();
		renderizadoVentasPorSucursal();
		hiddeModal();
  }else{
    swal("Error al cargar la venta", "Verifique que todos los campos esten seleccionados corractamente y que la fecha sea valida.","error")
  }
};

//FUNCIONALIDAD ELIMINAR VENTA
const eliminarUnaVenta = (id) => {
	const { ventas } = local;
  ventas.forEach((_, i) => {
    if (i === id) {
      ventas.splice(i, 1);
    }
  });
};

/* -------------------------------------------------------------------------- */
/*                             Editar una venta                               */
/* -------------------------------------------------------------------------- */
const editarUnaVenta = (id) => {
	const selectVendedoras = document.querySelector("#editarVendedoras").options;
	const selectComponentes = document.querySelector("#editarComponentes").options;
	const selectSucursales = document.querySelector("#editarSucursales").options;

	const { ventas } = local;

  const inputFecha = document.querySelector("#fechaEditarVenta").value;
  const arrayFecha = [...inputFecha.split("-")];

  const datosARemplazar = {
    fecha: undefined,
    nombreVendedora: undefined,
    componentes: [],
    sucursal: undefined,
  };

  for (const opcion of selectVendedoras) {
    if (opcion.selected === true) {
      datosARemplazar.nombreVendedora = opcion.value;
    }
  }
  for (const opcion of selectComponentes) {
    if (opcion.selected === true) {
      datosARemplazar.componentes.push(opcion.value);
    }
  }
  for (const opcion of selectSucursales) {
    if (opcion.selected === true) {
      datosARemplazar.sucursal = opcion.value;
    }
  }

  datosARemplazar.fecha = new Date(
    arrayFecha[0],
    arrayFecha[1]-1,
    arrayFecha[2]
  );

  let fechaHoy = new Date();
  
  if(datosARemplazar.fecha !== undefined && 
    datosARemplazar.fecha <= fechaHoy &&
    datosARemplazar.nombreVendedora !== undefined &&
    datosARemplazar.componentes.length > 0){
    ventas.forEach((_, i) => {
      if (i === id) {
        ventas.splice(i, 1, datosARemplazar);
      }
    });
    swal("Bien!","Venta modificada con exito","success")
    crearTablaVentas();
    renderizadoDatosReporte();
    renderizadoVentasPorSucursal();
    hiddeModal2();
  }else{
    swal("Error al cargar la venta", "Verifique que todos los campos esten completos y que la fecha sea valida","error")
  }
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



