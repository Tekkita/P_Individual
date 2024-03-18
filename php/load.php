#!/usr/bin/php-cgi
<?php
session_start();

// Verificar si existen los datos de la partida en la sesión
if (!isset($_SESSION['pairs']) || !isset($_SESSION['points']) || !isset($_SESSION['cards'])) {
    echo json_encode(false); // Devolver un valor de error si no se encuentran los datos en la sesión
    exit();
}

// Crear un objeto para almacenar los datos de la partida
$ret = new stdClass();
$ret->pairs = $_SESSION['pairs'];
$ret->points = $_SESSION['points'];
$ret->cards = $_SESSION['cards'];

// Devolver los datos de la partida como respuesta JSON
echo json_encode($ret);
?>


