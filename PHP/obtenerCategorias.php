<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, X-Token-Auth, Authorization');
header("Content-Type: application/json");


  
  require("conexion.php"); // IMPORTA EL ARCHIVO CON LA CONEXION A LA DB

  $conexion = conexion(); // CREA LA CONEXION

 
  // REALIZA LA QUERY A LA DB
  $registros = mysqli_query($conexion, "SELECT DISTINCT Categoria FROM productos");
  
  $numRegistros=mysqli_num_rows($registros);

  // RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY

for ($i=0; $i <  $numRegistros; $i++) { 

    $row = mysqli_fetch_array($registros);
    $datos[] = $row['Categoria'];
 
}

  $json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS


  echo $json; // MUESTRA EL JSON GENERADO
  
 // header('Content-Type: application/json');
?>