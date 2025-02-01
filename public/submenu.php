<?php

$pr = $conn->prepare('SELECT * FROM menu WHERE parent = :parent');
$pr->bindParam(':parent', $item['id']);
$pr->execute();
$result = $pr->fetchAll();


    $array = [
        1 => 'ti-home',
        2=> 'ti-settings',
        3=> 'ti-gallery',
        4=> 'ti-mobile',
        5=> 'ti-id-badge',
    ];
   $key = array_rand($array);  

if(count($result) > 0) {
    ?>
    <li class="dropdown">
    <a href="#"><i class="<?= $array[$key] ?>"></i> <?= $item['title'] ?></a>
     
       <ul class="menu-itemss">
    <?php   
    foreach ($result as $item) {   
        ?>
         <?php 
                                   require('submenu.php');
                                   ?>                    
        <?php     
    }  ?>
    </ul>
    </li>
<?php    
} else {
?>
<li>
                                    <a href="#"><i class="<?= $array[$key] ?>"></i>  <?= $item['title'] ?></a>
                                </li>
<?php
}
?>




