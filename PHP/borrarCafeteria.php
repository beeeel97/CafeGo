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
  $eliminacion = mysqli_query($conexion, "DELETE FROM cafeterias WHERE idCafeteria = " . $params->idCafeteria);



// VALIDA SI LA eliminacion FUE EXITOSA
if ($eliminacion) {
    $eliminacionFeedback="true";
   
} else {
    $eliminacionFeedback="false";
}

$json = json_encode($eliminacionFeedback); // GENERA EL JSON CON LOS DATOS OBTENIDOS
  
echo $json; // MUESTRA EL JSON GENERAD
 
?>