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
$insercion = mysqli_query($conexion, "INSERT INTO pedidos (IDUsuarioPedido, IDCafeteriaPedido, FechaPedido) VALUES ('" . $params->IDUsuarioPedido . "','" . $params->IDCafeteriaPedido . "','" . $params->FechaPedido . "')");

// VALIDA SI LA INSERCIÓN FUE EXITOSA
if ($insercion) {
    // Obtener el objeto insertado
    $idInsertado = mysqli_insert_id($conexion);
    $resultado = mysqli_query($conexion, "SELECT * FROM pedidos WHERE IDPedido = $idInsertado");
    $objetoInsertado = mysqli_fetch_assoc($resultado);

    $json = json_encode($objetoInsertado); // GENERA EL JSON CON EL OBJETO INSERTADO
} else {
    $json = json_encode(false); // GENERA EL JSON CON EL VALOR FALSE
}

echo $json; // MUESTRA EL JSON GENERADO
?>
