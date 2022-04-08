const montoVentasPorVendedora = (vend, arrVentas) => {
  let acc = 0;
  for (const { nombreVendedora, componentes } of arrVentas) {
    if (nombreVendedora === vend) {
      acc += precioMaquina(componentes);
    }
  }
  return acc;
};

const ventasPorAño = (anio, ventas) => {
  return ventas.filter(({ fecha }) => {
    return fecha.getFullYear() === anio;
  });
};

const mejorVendedoraDelAño = (anio) => {
  const { ventas } = local;
  const ventasAnio = ventasPorAño(anio, ventas);
  let nombre = "";
  for (const venta of ventasAnio) {
    for (const venta1 of ventasAnio) {
      const precioVenta = montoVentasPorVendedora(
        venta.nombreVendedora,
        ventasAnio
      );
      const precioVenta1 = montoVentasPorVendedora(
        venta1.nombreVendedora,
        ventasAnio
      );
      if (precioVenta > precioVenta1) {
        nombre = venta.nombreVendedora;
      }
    }
  }
  return nombre;
};
