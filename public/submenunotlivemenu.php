<?php

$pr = $conn->prepare('SELECT * FROM menu WHERE parent = :parent');
$pr->bindParam(':parent', $item['id']);
$pr->execute();
$result = $pr->fetchAll();

if(count($result) > 0) {
    ?>
<ul>
    <?php
    foreach ($result as $item) {
        
        echo '<li class="d-flex flex-row menuItem shadow m-4 pt-3" data-id="' . htmlspecialchars($item['id']) . '">  
                                                <form class="deleteMenu" data-id="' . htmlspecialchars($item['id']) . '">  
                                                    <button class="btnn btn btn-success ms-3 mb-3">x</button>  
                                                </form>  
                                                <div class="allItem d-flex">  
                                                    <i class="ti-pencil"></i>  
                                                    <p>' . htmlspecialchars($item['title']) . '</p>  
                                                    <form class="formEditMenu mx-3" data-id="' . htmlspecialchars($item['id']) . '">  
                                                        <input class="editMenu p-2" type="text" name="title" value="' . htmlspecialchars($item['title']) . '" required>  
                                                        <select class="form-select my-4 parentMenu">  
                                                            <option value="0">select</option>';
    
        foreach ($result as $optionItem) {
            if($item['parent'] == $optionItem['id']) {
                $selected = 'selected';
            }else{
                $selected = '';
            }
            echo '<option data-id="' . htmlspecialchars($optionItem['id']) . '" value="' . htmlspecialchars($optionItem['id']) .'" '.$selected .'>' . htmlspecialchars($optionItem['title']) . '</option>';
        }
    
        echo '        </select>  
                                                        <button type="button" class="btn btn-warning bEditMenu mb-3">update</button>  
                                                    </form>  
                                                </div>  
                                             </li>';
                                          
                                             require('submenunotlivemenu.php');
    }
  ?>
</ul>
  <?php
} else {

}
?>




