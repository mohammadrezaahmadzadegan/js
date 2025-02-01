<?php
    $servername = 'mysql';
    $username = 'root';
    $password = '1234';
    $dbname = 'js';

    $conn = new PDO('mysql:host=' . $servername . ';dbname=' . $dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   




    
    ?>