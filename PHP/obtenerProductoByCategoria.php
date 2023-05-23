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

  if($params->categoria=="TodosProductos"){
    $registros = mysqli_query($conexion, "SELECT * FROM productos");
  }else{
      $registros = mysqli_query($conexion, "SELECT * FROM productos WHERE categoria = (SELECT IDCategoria FROM categorias WHERE NombreCategoria = '".$params->categoria."')");
  }



//$registros = mysqli_query($conexion, "SELECT * FROM productos WHERE categoria = (SELECT IDCategoria FROM categorias WHERE NombreCategoria = 'Bebida fria')");

  
  $numRegistros=mysqli_num_rows($registros);

  // RECORRE EL RESULTADO Y LO GUARDA EN UN ARRAY

for ($i=0; $i <  $numRegistros; $i++) { 

    $row = mysqli_fetch_array($registros);
    $datos[] = $row;
 
}

  $json = json_encode($datos); // GENERA EL JSON CON LOS DATOS OBTENIDOS


  echo $json; // MUESTRA EL JSON GENERADO
  
 // header('Content-Type: application/json');
?>