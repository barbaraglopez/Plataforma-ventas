// -------------------------------------------------------------------------------------------//
//                               PRIMER RENDERIZADO
// -------------------------------------------------------------------------------------------//
    window.addEventListener("load", () => {
    const btnSelectSucursal = document.getElementById("sucursales");
    const btnSelectVendedora = document.getElementById("vendedoras");
    //const btnGuardarVenta = document.querySelector("#btnGuardarVenta");
    const btnNuevaVenta = document.querySelector("#btnNuevaVenta");
    //const vendedora = document.querySelector("#vendedoras").options;
    //const componentes = document.querySelector("#componentes").options;
    //const sucursales = document.querySelector("#sucursales").options;
    //const fecha = document.querySelector("#fechaNuevaVenta");
    

    renderizadoDatosReporte();
    renderizadoVentasPorSucursal();
    crearTablaVentas();
    eliminarUnaVenta();
    //editarUnaVenta()

    cargarDatos("editarOpcionComponentes");
    cargarDatos("editarOpcionVendedora");
    cargarDatos("editarOpcionSucursales");

    btnCloseModal.addEventListener("click", hiddeModal);
    overlay.addEventListener("click", hiddeModal);
    btnCancelarNuevaVenta.addEventListener("click", hiddeModal2);
    overlay2.addEventListener("click", hiddeModal2);
    btnCancelar.addEventListener("click", hiddeModal3);
    overlay3.addEventListener("click", hiddeModal3);
    btnNuevaVenta.addEventListener("click", componentesSelect);
    btnSelectVendedora.addEventListener("click", vendedoraSelect);
    btnSelectSucursal.addEventListener("click", selectSucursal);

    document.addEventListener('keydown', function(e){
        if(e.key ==="Escape" || e.key === "scape"){
            hiddeModal()
            hiddeModal2()
            hiddeModal3()
        }
    })
    });

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

    const hiddeModal = () => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
    };

    btnOpenModal.addEventListener("click", () => {
    showModal();
    //componentesSelect();
    cargarDatos("opcionesComponentes");
    cargarDatos("opcionesVendedoras");
    cargarDatos("opcionesSucursales");
});
// ---------------------------------MODAL PARA EDITAR VENTA-----------------------------------

const modal2 = document.querySelector(".modal2");
const overlay2 = document.querySelector(".overlay2");
const btnCancelarNuevaVenta = document.querySelector(".close-modal2");

const showModal2 = () => {
    overlay2.classList.remove("hidden");
    modal2.classList.remove("hidden");
    };

    const hiddeModal2 = () => {
    overlay2.classList.add("hidden");
    modal2.classList.add("hidden");
};


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

// -------------------------------------------------------------------------------------------//
//                              IMPRESION DE DATOS EN LAS MODALES
// -------------------------------------------------------------------------------------------//

//OPCION SELECCIONAR COMPONENTES
const componentesSelect = () => {
    const opcionesComponentes = document.getElementById("opcionesComponentes");
    //creo los option del select
    const { precios } = local;
    for (const { componentes } of precios) {
        const crearInputs = document.createElement("option");
        opcionesComponentes.appendChild(crearInputs);
        crearInputs.innerHTML = `${componentes}`;
    }
};

//OPCION SELECCIONAR VENDEDORA
const vendedoraSelect = () => {
    const nodoVendedoras = document.getElementById("opcionesVendedoras");
    if (nodoVendedoras.innerHTML === "") {
        for (const { vendedoras } of local) {
        let vendedorass = vendedoras;
        const crearOpciones = document.createElement("option");
        nodoVendedoras.appendChild(crearOpciones);
        crearOpciones.innerHTML = `${vendedorass}`;
        }
    }
};

//OPCION SELECCIONAR SUCURSAL
const selectSucursal = () => {
    const opcionSucursales = document.getElementById("opcionesSucursales");
    if (opcionSucursales.innerHTML === "") {
        for (const { sucursales } of local) {
        let array = sucursales;
        const opciones = document.createElement("option");
        opcionSucursales.appendChild(opciones);
        opciones.innerHTML = `${array}`;
        }
    }
    };


    const cargarDatos = (id) => {
    const opciones = document.getElementById(id);
    const { sucursales, vendedoras, precios } = local;
    if (opciones.innerHTML === "") {
        if (id === "opcionesSucursales" || id === "editarOpcionSucursales") {
        sucursales.forEach((element) => {
            const opciones = document.createElement("option");
            const opcionSucursales = document.getElementById(id);
            opcionSucursales.appendChild(opciones);
            opciones.innerHTML = `${element}`;
        });
        } else if (id === "opcionesVendedoras" || id === "editarOpcionVendedora") {
        vendedoras.forEach((element) => {
            const crearOpciones = document.createElement("option");
            let nodoVendedoras = document.getElementById(id);
            nodoVendedoras.appendChild(crearOpciones);
            crearOpciones.innerHTML = `${element}`;
        });
        } else {
        precios.forEach(({ componente }) => {
            let opcionesComponentes = document.getElementById(id);
            const crearInputs = document.createElement("option");
            opcionesComponentes.appendChild(crearInputs);
            crearInputs.innerHTML = `${componente}`;
        });
        }
    }
};

//FORMATO DE LA FECHA :
const format = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(date);

//CARGAR DATOS DE VENTAS EN PANTALLA

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
/* const editarUnaVenta = () => {
    const {ventas} = local;
    const btnEditar = document.querySelectorAll('.btnEditar');
    let fragmentoID
    btnEditar.forEach(btn=>{
        btn.addEventListener('click', event =>{
            let id = event.target.id;
            fragmentoID = parseInt(id.slice(10));
            console.log(fragmentoID)
            const botonAceptar = document.querySelector('.buttonContainer2 .confirmar');
            const botonCancelar = document.querySelector('.buttonContainer2 .cancelar');


            botonAceptar.addEventListener('click', ()=>{
                ventas.forEach((_,i) => {
                    if(i === fragmentoID){

                    }
                })
            }) */

/* 
        botonCancelar/addEventListener('click', ()=>{
            hiddeModal2();
            fragmentoID="";
        })

        })
    })
} */


/* const limpiarTabla =()=>{
    const crearFilaVentas = document.createElement("tr");
    crearFilaVentas.innerHTML="";
}  */

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
    vendedoraMejor.innerHTML = `<p>Vendedora que más ingresos generó: <b>${mejorVendedoraDelAño(
    2019
    )}</b></p>`;
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
