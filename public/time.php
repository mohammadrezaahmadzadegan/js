<?php
require('model.php');
$pr = $conn->prepare('SELECT * FROM timePreloader WHERE id = 1');
$pr->execute();
$result = $pr->fetch();

echo json_encode(array('time'=> $result['time']));