<?php
require('model.php');
if(isset($_FILES['preloader'])){
    $img = $_FILES['preloader'];
    
    $array = explode(   '.', $img['name']);

    $ext = end($array);
    $name = uniqid(rand()).'.'.$ext;

    $path = dirname(__FILE__).'/uploads/'.$name;
    move_uploaded_file($img['tmp_name'],$path);
    $pr = $conn->prepare('INSERT INTO preloader (name) VALUES (:name)');
    $pr->bindParam(':name', $name);
    $pr->execute();
  
}


$pr = $conn->prepare('SELECT * FROM preloader ORDER BY id DESC LIMIT 1');  
$pr->execute();  
$result = $pr->fetch();  
$path = 'uploads/'.$result['name'];
echo '<img src="'.$path.'">';