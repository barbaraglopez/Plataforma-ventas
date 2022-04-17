//FORMATO DE LA FECHA :const format = (date, locale, options) =>
const format = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date);

/* -------------------------------------------------------------------------- */
/*                   Primera carga e invocación de funciones                  */
/* -------------------------------------------------------------------------- */
window.addEventListener("load", () => {
  const btnOpenModal = document.querySelector(".show-modal");
  const btnCloseModal = document.querySelector(".close-modal");

  //Muestro las ventas ya disponibles en la tabla.
  crearTablaVentas();
  //Cargo los datos de los reportes.
  renderizadoDatosReporte();
  //Cargo los datos de las ventas por sucursal.
  renderizadoVentasPorSucursal();
  //Agrego los eventos a los botones eliminar ya renderizados.
  eliminarUnaVenta();
  //Agrego los eventos a los botones editar ya renderizados.
  editarUnaVenta();
  //Agrego la funcionalidad para poder guardar ventas nuevas.
  guardarNuevaVenta();

  btnOpenModal.addEventListener("click", () => {
		showModal();
		cargarDatos("opcionesComponentes");
		cargarDatos("opcionesVendedoras");
		cargarDatos("opcionesSucursales");
  });
  btnCloseModal.addEventListener("click", hiddeModal);

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


/* -------------------------------------------------------------------------- */
/*                        Impresion de datos en modales                       */
/* -------------------------------------------------------------------------- */
const cargarDatos = (id) => {
	const opciones = document.getElementById(id);
	const { sucursales, vendedoras, precios } = local;

	if (opciones.innerHTML === "") {
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
	const btnGuardarVenta = document.querySelector("#btnGuardarVenta");
	const btnCancelarVenta = document.querySelector("#btnCancelarVenta");
	const selectVendedoras = document.querySelector("#vendedoras").options;
	const selectComponentes = document.querySelector("#componentes").options;
	const selectSucursales = document.querySelector("#sucursales").options;

	const { ventas } = local;

	btnGuardarVenta.addEventListener("click", (event) => {
		event.preventDefault();

		const inputFecha = document.querySelector("#fechaNuevaVenta").value;
		const arrayFecha = inputFecha.split("-");
		const arrayFiltrado = [];
		arrayFecha.map((elemento) => arrayFiltrado.push(parseInt(elemento)));

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
			arrayFiltrado[0],
			arrayFiltrado[1],
			arrayFiltrado[2]
		);
		ventas.push(datosNormalizados);
		crearTablaVentas();
		renderizadoDatosReporte();
		renderizadoVentasPorSucursal();
		hiddeModal();
	});

	btnCancelarVenta.addEventListener(
		"click",
		(event) => event.preventDefault(),
		hiddeModal()
	);
};

//FUNCIONALIDAD ELIMINAR VENTA
const eliminarUnaVenta = () => {
	const btnEliminar = document.querySelectorAll(".btnEliminar");
	const btnAceptar = document.querySelector(".buttonContainer3 .confirmar");
	const btnCancelar = document.querySelector(".buttonContainer3 .cancelar");

	const { ventas } = local;
	let fragmentoID;

	btnEliminar.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			let id = event.target.id;
			fragmentoID = parseInt(id.slice(12));

			btnAceptar.addEventListener("click", (event) => {
				event.preventDefault();
				ventas.forEach((_, i) => {
					if (i === fragmentoID) {
						ventas.splice(i, 1);
					}
				});
				crearTablaVentas();
				hiddeModal3();
			});

			btnCancelar.addEventListener("click", (event) => {
				event.preventDefault();
				fragmentoID = "";
				hiddeModal3();
			});
		});
	});
};

//FUNCIONALIDAD EDITAR VENTA
const editarUnaVenta = () => {
	const btnEditar = document.querySelectorAll(".btnEditar");
	const btnAceptar = document.querySelector(".buttonContainer2 .confirmar");
	const btnCancelar = document.querySelector(".buttonContainer2 .cancelar");
	const selectVendedoras = document.querySelector("#editarVendedoras").options;
	const selectComponentes = document.querySelector("#editarComponentes").options;
	const selectSucursales = document.querySelector("#editarSucursales").options;

	const { ventas } = local;
	let fragmentoID;

	btnEditar.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			let id = event.target.id;
			fragmentoID = parseInt(id.slice(10));

			cargarDatos("editarOpcionComponentes");
			cargarDatos("editarOpcionVendedora");
			cargarDatos("editarOpcionSucursales"); 

	
			/* let arrayVacio = [];
			const listaComponentes = document.querySelector("editarOpcionComponentes")
			listaComponentes.forEach(componente => componente.selected && arrayVacio.push(componente.value))
				
			ventas.forEach((venta,indexVenta) => {	
				if(indexVenta === fragmentoID){
					console.log(fragmentoID)
				}
			}) */

      /* ------------------------------------ x ----------------------------------- */
      //ToDo: agregar funcionalidad para que al renderizar me muestre ya las opciones seleccioandas de la venta 
      /* ------------------------------------ x ----------------------------------- */

			btnAceptar.addEventListener("click", (event) => {
				event.preventDefault();

				const inputFecha = document.querySelector("#fechaEditarVenta").value;
				const arrayFecha = inputFecha.split("-");
				const arrayFiltrado = [];
				arrayFecha.map((elemento) => arrayFiltrado.push(parseInt(elemento)));

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
					arrayFiltrado[0],
					arrayFiltrado[1],
					arrayFiltrado[2]
				);
				
				/* if(datosARemplazar.fecha === undefined && datosARemplazar.nombreVendedora === undefined && datosARemplazar.sucursal === undefined && datosARemplazar.fecha === undefined){
					alert:"rellene el campo vacio"
				}else{ */
				ventas.forEach((_, i) => {
					if (i === fragmentoID) {
						ventas.splice(i, 1, datosARemplazar);
					}
				});
			//}		


        crearTablaVentas();
        renderizadoDatosReporte();
        renderizadoVentasPorSucursal();
        hiddeModal2();
        eliminarUnaVenta();
			});


			btnCancelar.addEventListener("click", (event) => {
				event.preventDefault();
				hiddeModal2();
			});
		});
	});
};

/* ------------------- Eventos en el boton eliminar venta ------------------- */
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




