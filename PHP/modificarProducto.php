<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
header("Content-Type: application/json");


  
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

  $params = json_decode(file_get_contents('php://input'));
  // REALIZA LA QUERY A LA DB

  $actualizacion = mysqli_query($conexion, "UPDATE productos SET NombreProducto = '" . $params->NombreProducto . "', Categoria = '" . $params->Categoria . "', Frio = " . $params->Frio . ", UnidadProducto = '" . $params->UnidadProducto . "', PrecioProducto = " . $params->PrecioProducto . ", DescripcionProducto = '" . $params->DescripcionProducto . "', LinkImagen = '" . $params->LinkImagen . "' WHERE IDProducto = " . $params->IDProducto);

// VALIDA SI LA INSERCIÓN FUE EXITOSA
if ($actualizacion) {
    $actualizacionFeedback="true";
   
} else {
    $actualizacionFeedback="false";
}

$json = json_encode($actualizacionFeedback); // GENERA EL JSON CON LOS DATOS OBTENIDOS
  
echo $json; // MUESTRA EL JSON GENERAD
 
?>