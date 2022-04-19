//------------------------------------------------------------ FUNCIONES------------------------------------------------------------------------------------
//Funcion que arroja las ventas coincidentes con la busqueda con la fecha
const obtenerFecha = (mes, anio) => {
  let getDate = local.ventas.filter(
    (elemento) =>
      elemento.fecha.getMonth() + 1 === mes &&
      elemento.fecha.getFullYear() === anio
  );
  return getDate;
};

//precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes,que es la suma de los precios de cada componente incluido
const precioComponente = (componente) => {
  const { precios } = local;
  for (const precio of precios) {
    if (precio.componente === componente) {
      return precio.precio;
    }
  }
};

const precioMaquina = (componentes) => {
  let acc = 0;
  for (const componente of componentes) {
    acc += precioComponente(componente);
  }
  return acc;
};

//cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas */
const cantidadVentasComponente = (componente) => {
  let contador = 0;
  const { ventas } = local;
  for (const venta of ventas) {
    const { componentes } = venta;
    if (componentes.includes(componente)) {
      contador++;
    }
  }
  return contador;
};

//vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). */
const vendedoraDelMes = (mes, anio) => {
  const { ventas, vendedoras } = local;
  let ventasFiltrado = ventas.filter(
    (elemento) =>
      elemento.fecha.getMonth() + 1 === mes &&
      elemento.fecha.getFullYear() === anio
  );
  let vendedorasObj = {};
  for (const vendedora of vendedoras) {
    let contador = 0;
    for (const venta of ventasFiltrado) {
      if (vendedora === venta.nombreVendedora) {
        contador += precioMaquina(venta.componentes);
      }
    }
    vendedorasObj[vendedora] = contador;
  }
  let contadorDos = 0;
  let nombreVendedora = "";
  for (const vendedora in vendedorasObj) {
    const total = vendedorasObj[vendedora];
    if (contadorDos < total) {
      contadorDos = total;
      nombreVendedora = vendedora;
    }
  }
  return nombreVendedora;
};

//ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre)
const ventasMes = (anio, mes) => {
  const { ventas } = local;
  let getDate = ventas.filter(
    (elemento) =>
      elemento.fecha.getMonth() + 1 === mes &&
      elemento.fecha.getFullYear() === anio
  );
  //console.log(getDate)
  let acumulador = 0;
  for (const { componentes } of getDate) {
    acumulador += precioMaquina(componentes);
  }
  return acumulador;
};

//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre) => {
  const { ventas } = local;
  let contador = 0;
  for (const { nombreVendedora, componentes } of ventas) {
    if (nombre === nombreVendedora) {
      contador += precioMaquina(componentes);
    }
  }
  return contador;
};

//componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente
const componenteMasVendido = () => {
  const { ventas } = local;
  let contador = 0;
  let str = "";
  for (const { componentes } of ventas) {
    for (const componente of componentes) {
      if (cantidadVentasComponente(componente) > contador) {
        contador += cantidadVentasComponente(componente);
        str = componente;
      }
    }
  }
  return str;
};

//huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre) 
const huboVentas = (mes, anio) => {
  let huboVentas = false;
  obtenerFecha(mes, anio);
  if (obtenerFecha.length > 0) {
    huboVentas = true;
  }
  return huboVentas;
};

//Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha. */
  const ventasSucursal = (sucursalElegida) => {
  const { ventas } = local;
  let contador = 0;
  for (const { sucursal, componentes } of ventas) {
    if (sucursal === sucursalElegida) {
      contador += precioMaquina(componentes);
    }
  }
  return contador;
};

//Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). */
sucursalDelMes = (mes, anio) => {
  obtenerFecha(mes, anio);
  const contador = 0;
  let str = "";
  const { ventas } = local;
  for (const { componentes, sucursal } of ventas) {
    if (contador < precioMaquina(componentes)) {
      contador += precioMaquina(componentes);
      str = sucursal;
    }
  }
  return str;
};

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorMes = (anio) => {
  let mes = 0;
    let resumen= `
        Enero: ${ventasMes(anio, mes)}
        Febrero: ${ventasMes(anio, mes + 1)}
        Marzo: ${ventasMes(anio, mes + 2)}
        Abril: ${ventasMes(anio, mes + 3)}
        Mayo: ${ventasMes(anio, mes + 4)}
        Junio: ${ventasMes(anio, mes + 5)}
        Julio: ${ventasMes(anio, mes + 6)}
        Agosto: ${ventasMes(anio, mes + 7)}
        Septiembre: ${ventasMes(anio, mes + 8)}
        Octubre: ${ventasMes(anio, mes + 9)}
        Noviembre: ${ventasMes(anio, mes + 10)}
        Diciembre: ${ventasMes(anio, mes + 11)}
    `;
    return resumen;
}

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {
  const { sucursales } = local;
  const renderizado = sucursales.map((sucursal) => {
    return {
      sucursal: sucursal,
      importe: ventasSucursal(sucursal),
    };
  });
  return renderizado;
};

// render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó Reporte Ventas por mes: Total de enero 2019: 1250 Total de febrero 2019: 4210 Ventas por sucursal: Total de Centro: 4195 Total de Caballito: 1265 Producto estrella: Monitor GPRS 3000 Vendedora que más ingresos generó: Grace */
const render = () => {
  return `
          Reporte 
          Ventas por mes: 
          Total de enero 2019: ${ventasMes(1, 2019)}
          Total de febrero 2019: ${ventasMes(2, 2019)} 
          Ventas por sucursal: 
          Total de Centro: ${ventasSucursal("Centro")}
          Total de Caballito: ${ventasSucursal("Caballito")}
          Producto estrella: ${componenteMasVendido()}
          Vendedora que más ingresos generó: ${mejorVendedoraDelAño(1, 2019)}
          `;
};

//nombreVendedoraEstrella retorna el nombre de la vendedora que tenga el registro de mayor cantidad de ventas total
const nombreVendedoraEstrella = () => {
  const { ventas } = local;
  let monto = 0;
  let nombre = 0;
  for (const { nombreVendedora } of ventas) {
    let montoTotal = ventasVendedora(nombreVendedora);
    if (monto < montoTotal) {
      monto = montoTotal;
      nombre = nombreVendedora;
    }
  }
  return nombre;
};
