<?php
require('model.php');
$pr = $conn->prepare("SELECT * FROM images");
$pr->execute();
$result = $pr->fetchAll();
$url = 'http://'. $_SERVER['HTTP_HOST'] . '/';
foreach ($result as $item) {  
    echo '<div data-id="' . $item['id'] . '" class="image-container">  
        <img src="' . $url . '/uploads/' . $item['name'] . '" alt="Image">  
        <form class="deleteImg" data-id="' . $item['id'] . '" method="POST">   
            <button type="button" class="noSend btn btn-success my-4">x</button>   
        </form>   
    </div>';  
}