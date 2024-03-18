#!/usr/bin/php-cgi
#!/usr/bin/php-cgi
<?php
session_start();

// Verificar si se han recibido los datos esperados
if (!isset($_POST['uuid']) || !isset($_POST['pairs']) || !isset($_POST['points']) || !isset($_POST['cards'])) {
    echo json_encode(false); // Devolver un valor de error si faltan datos
    exit();
}

// Asignar los datos recibidos a las variables de sesión
$_SESSION['uuid'] = $_POST['uuid'];
$_SESSION['pairs'] = $_POST['pairs'];
$_SESSION['points'] = $_POST['points'];
$_SESSION['cards'] = $_POST['cards'];

// Crear una conexión a la base de datos
$conn = oci_connect('usuario', 'contraseña', 'nombre_de_la_base_de_datos');
if (!$conn) {
    $error = oci_error();
    echo json_encode("Error al conectar con la base de datos: " . $error['message']);
    exit();
}

// Preparar la consulta SQL para insertar los datos de la partida
$insert = "INSERT INTO memory_save (uuid, pairs, points, cards) VALUES (:uuid, :pairs, :points, :cards)";
$comanda = oci_parse($conn, $insert);

// Vincular los parámetros
oci_bind_by_name($comanda, ":uuid", $_SESSION['uuid']);
oci_bind_by_name($comanda, ":pairs", $_SESSION['pairs']);
oci_bind_by_name($comanda, ":points", $_SESSION['points']);
oci_bind_by_name($comanda, ":cards", $_SESSION['cards']);

// Ejecutar la consulta
if (oci_execute($comanda)) {
    echo json_encode(true); // Devolver éxito si la inserción fue exitosa
} else {
    $error = oci_error($comanda);
    echo json_encode("Error al insertar en la base de datos: " . $error['message']); // Devolver un mensaje de error si falla la inserción
}

?>



