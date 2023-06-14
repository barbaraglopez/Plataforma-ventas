# Plataforma ventas
***
Les presento mi segundo proyecto realizado para Ada. El mismo consiste en una plataforma de ventas que se encarga de almacenar información que consiste en vendedoras, productos vendidos, importe total de ventas, información de cada sucursal, total de ventas por vendedoras, etc.[Podés verlo accediendo a este link!](https://barbaraglopez.github.io/SegundoProyectoAda/)
***
Está diseñado en HTML, CSS, Javascript y una libreria para los estilos de los alerts.
***
## Informacion de ventas:
Este proyecto inicia con una base de datos que consiste en un array que contiene todos los datos que incluyen ventas realizadas, sucursales, precio de los componentes, etc. 
Esos datos van a modificarse con las funcionalidades que detallo a continuación, además de que se pueden sumar ventas a esa base o eliminar las que tenemos de forma dinámica
***
## Funcionalidades:
El proyecto consta de varias funcionalidades pero las tres que le dan dinamismo a la misma son editar venta, eliminar venta y guardar una nueva venta.

### Editar Venta:
Editar venta consiste en acceder a la venta que se selecciona con el boton de editar venta (por cada venta hay un boton de editar venta y de elimnar venta), una vez seleccionado se abre una ventana modal que arroja los datos a rellenar para volver a insertarlos en la venta. 
***
[visualizacion de modal editar venta](img/editarVentaVisualizacion.png)
***
La modal contiene un formulario con varios a campos a seleccionar, además tiene una validación que no me permite cargar la edición si selecciono una fecha futura o alguno de los campos esta vacío, cuando esto sucede aparece una ventana emergente que le indica al usuario que llene todos los campos correctamente.

[ventana emergente en error al editar venta](img/errorEditarVenta.png)
***
Si se llenan todos los campos correctamente se modifican los datos de la venta seleccionada y recibimos un mensaje de exito

[ventana emergente de exito al editar una venta correctamente](img/exitoEditarVenta.png)
***
### Guardar Venta:
Cuando seleccionamos el boton de nueva venta se abre una ventana modal con todos los campos a rellenar para guardar la nueva venta. 
***
[ventana de nueva venta](img/agregarNuevaVenta.png)
***
Este tambien cuenta con una validación que verifique si todos los campos estan completos y si la fecha es valida. Si todos los datos estan cargados correctamente se guardará la nueva venta y nos figurará una ventana emergente de exíto, seguido de la nueva venta en nustra tabla de ventas realizadas.De lo contrario la venta no se guardará y figurará un mensaje de error solicitando que se carguen los datos completamente.
***
### Eliminar venta:
Se accede a la funcionalidad de eliminar venta seleccionando el botón de eliminar venta representado por un bote de basura en rojo. Cuando se accede a esta opcion nos figura una ventana modal que consulta si el usuario está seguro de eliminar la venta
***
[ventana de eliminar venta](img/eliminarVenta.png)
***
De seleccionar cancelar se vuelve al paso anterior y de seleccionar confirmar la venta se elimina de nuestra base de datos y no difurará en la tabla.

## Renderizado en pantalla de ventas por sucursal y reportes
La plataforma cuenta con el dinamismo de los datos en pantalla, podremos ver contantemente cuantas ventas tiene cada sucursal, que producto se vendió más, que vendedora realizó mayor cantidad de ventas. Todo esto se actualiza constantemente mientras agregamos, editamos y eliminamos ventas.
***
[visualizacion de total de ventas por sucursal, vendedora estrella y componente más vendido](img/renderizadoReportes.png)
***
## Renderizado en pantalla de ventas 
En la pantalla vamos a visualizar una tabla donde veremos constantemente todas las ventas realizadas, la sucursal en la que se realizó cada una, la vendedora, el importe y la fecha
***
[visualizacion de total de ventas realizadas](img/tablaVentas.png)
***
Todo el proyecto cuenta con un diseño responsive para mejorar la experiencia del usuario.
