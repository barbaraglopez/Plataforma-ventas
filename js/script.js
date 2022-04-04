//Funcion para obtener las coincidencias de busqueda con la fecha 
const obtenerFecha =(mes, anio)=>{
  let getDate = local.ventas.filter(
    (elemento) =>
      elemento.fecha.getMonth() + 1 === mes &&
      elemento.fecha.getFullYear() === anio
  );
  return getDate
}


const precioComponente=(componente)=>{
  const {precios} = local
  for(const precio of precios){
    if(precio.componente === componente){
      return precio.precio
    }
  }
}

/* precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes,
que es la suma de los precios de cada componente incluido. */

const precioMaquina = (componentes) => {
  let acc = 0;
  for (const componente of componentes) {
    acc += precioComponente(componente);
  }
  return acc;
};

//console.log("precioMaquina: ", precioMaquina(['Monitor GPRS 3000', 'Motherboard ASUS 1500']))// 320 ($200 del monitor + $120 del motherboard))

/* cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas */

const cantidadVentasComponente = (componente) =>{
  let contador = 0;
  const {ventas} = local
  for(const venta of ventas){
    const {componentes} = venta
    if(componentes.includes(componente)){
      contador++
    }
  }
  return contador
}
//console.log(cantidadVentasComponente("Monitor GPRS 3000"))

/* vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). */

const vendedoraDelMes = (mes, anio) => {
  const {ventas, vendedoras} = local
  let ventasFiltrado = ventas.filter(elemento => elemento.fecha.getMonth() + 1 === mes && elemento.fecha.getFullYear() === anio)
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

//console.log(vendedoraDelMes(1, 2019));

/* ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). */

const ventasMes = (mes, anio) => {
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
  return acumulador
};

//console.log(ventasMes(1, 2019));

//ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre)=>{
    const {ventas} = local;
    let contador = 0;
    for(const {nombreVendedora, componentes} of ventas){
        if(nombre === nombreVendedora){
            contador += precioMaquina(componentes)
        }
    }
    return contador
}

//console.log(ventasVendedora("Grace"))

/* componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente*/

const componenteMasVendido=()=>{
    const {ventas} = local;
    let contador = 0;
    let str = "";
    for(const{componentes} of ventas){
      for(const componente of componentes){
        if(cantidadVentasComponente(componente) > contador){
          contador += cantidadVentasComponente(componente)
          str = componente
        }
      } 
    }
    return str
}
//console.log(componenteMasVendido())

/* huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre) */
const huboVentas = (mes, anio) =>{
const {ventas} = local
let huboVentas = false
obtenerFecha(mes,anio)
  if(obtenerFecha.length > 0){
    huboVentas = true
  }
return huboVentas
}

//console.log(huboVentas(1,2019))

/* Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha. */

const ventasSucursal=(sucursalElegida)=>{
  const {ventas} = local;
  let contador = 0;
    for(const {sucursal, componentes} of ventas){
        if(sucursal === sucursalElegida){
            contador += precioMaquina(componentes)
        }
    }
    return contador
}

//console.log(ventasSucursal("Centro"))

/* Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre). */

sucursalDelMes=(mes, anio)=>{
  obtenerFecha(mes,anio)
  let contador = 0;
  let str = ""
  const {ventas} = local;
  for(const {componentes, sucursal} of ventas){
    if(contador < precioMaquina(componentes)){
      contador += precioMaquina(componentes)
      str = sucursal
    }
  }
  return str
}

//console.log(sucursalDelMes(1,2019))

/* renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año */
const renderPorMes=()=>{
  return `
          Enero: ${ventasMes(1,2019)}
          Febrero: ${ventasMes(2,2019)}
          Marzo: ${ventasMes(3,2019)}
          Abril: ${ventasMes(4,2019)}
          Mayo: ${ventasMes(5,2019)}
          Junio: ${ventasMes(6,2019)}
          Julio: ${ventasMes(7,2019)}
          Agosto: ${ventasMes(8,2019)}
          Septiembre: ${ventasMes(9,2019)}
          Octubre: ${ventasMes(10,2019)}
          Noviembre: ${ventasMes(11,2019)}
          Diciembre: ${ventasMes(12,2019)}
          `
}
//console.log(renderPorMes())

/* renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal */

const renderPorSucursal=()=>{
    return `
            Centro: ${ventasSucursal("Centro")}
            Caballito: ${ventasSucursal("Caballito")}
            `
}
//console.log(renderPorSucursal())

/* render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó Reporte Ventas por mes: Total de enero 2019: 1250 Total de febrero 2019: 4210 Ventas por sucursal: Total de Centro: 4195 Total de Caballito: 1265 Producto estrella: Monitor GPRS 3000 Vendedora que más ingresos generó: Grace */

const render =()=>{
  return `
          Reporte 
          Ventas por mes: 
          Total de enero 2019: ${ventasMes(1,2019)}
          Total de febrero 2019: ${ventasMes(2,2019)} 
          Ventas por sucursal: 
          Total de Centro: ${ventasSucursal("Centro")}
          Total de Caballito: ${ventasSucursal("Caballito")}
          Producto estrella: ${componenteMasVendido()}
          Vendedora que más ingresos generó: ${vendedoraDelMes(1,2019)}
          `
}

console.log(render())