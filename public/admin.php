<?php
require('model.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {  
    if (isset($_FILES['myfile']) && $_FILES['myfile']['error'] == 0) {  
        $uploadDirectory = dirname(__FILE__) . '/uploads/'; 
        $array = explode('.',$_FILES['myfile']['name']);
        $ext = end($array);
        $name = uniqid(rand()) . '.' . $ext;
        $destinationPath = $uploadDirectory . $name;  

        move_uploaded_file($_FILES['myfile']['tmp_name'], $destinationPath);

        $pr = $conn->prepare("INSERT INTO images (name) VALUES (:name)");
        $pr->bindParam(":name", $name);
        $pr->execute();

    } 
}
     
   
if (isset($_POST['idDelete'])) {  
    $id = $_POST['idDelete'];  
    $pr = $conn->prepare('SELECT * FROM images WHERE id = :id');
    $pr->bindParam(':id',$id);
    $pr->execute();
    $array = $pr->fetch();
  $name = $array['name'];
$address =  dirname(__FILE__).'/uploads/'.$name;
if(file_exists($address)){
    unlink($address);
}
    $pr = $conn->prepare('DELETE FROM images WHERE id = :id');
    $pr->bindParam(':id',$id);
    $pr->execute();
    echo json_encode(['id' => $id]); 
}
    



if (isset($_POST['title'])) {
    $title = $_POST['title'];
    $content = $_POST['content'];

    $sql = "INSERT INTO table3 (title, content) VALUES (:title, :content)";
    $pr = $conn->prepare($sql);
    $pr->bindParam(':title', $title);
    $pr->bindParam(':content', $content);
    $pr->execute();

    $lastId = $conn->lastInsertId();
    echo json_encode(['status' => 'success', 'id' => $lastId, 'title' => $title, 'content' => $content]);
}

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "DELETE FROM table3 WHERE id = :id";
    $pr = $conn->prepare($sql);
    $pr->bindParam(':id', $id);
    $pr->execute();
}

if (isset($_POST['idSelect'])) {
    $id = $_POST['idSelect'];
    $sql = "SELECT * FROM table3 WHERE id = :id";
    $pr = $conn->prepare($sql);
    $pr->bindParam(':id', $id);
    $pr->execute();
    $result = $pr->fetch();
    echo json_encode(['status' => 'success', 'result' => $result]);
}


if (isset($_POST['idUpdate'])) {
    $id = $_POST['idUpdate'];
    $title = $_POST['titleUp'];
    $content = $_POST['contentUp'];
    $sql = 'UPDATE table3 SET title = :title, content = :content WHERE id = :id';
    $pr = $conn->prepare($sql);
    $pr->bindParam(':title', $title);
    $pr->bindParam(':content', $content);
    $pr->bindParam(':id', $id);

    $pr->execute();

    $sql = "SELECT * FROM table3 WHERE id = :id";
    $pr = $conn->prepare($sql);
    $pr->bindParam(':id', $id);
    $pr->execute();
    $result = $pr->fetch();
    echo json_encode(['status' => 'success', 'result' => $result]);
}

if(isset($_POST['titleMenu'])) {
    $title = $_POST['titleMenu'];
    $parent = $_POST['parentMenu'];

    $pr = $conn->prepare('INSERT INTO menu (title,parent) VALUES (:title,:parent)');
    $pr->bindParam(':title', $title);
    $pr->bindParam(':parent', $parent);
    $pr->execute();
    $lastId = $conn->lastInsertId();
    $pr = $conn->prepare('SELECT * FROM menu WHERE id = :id');
    $pr->bindParam(':id', $lastId);
    $pr->execute();
    $result = $pr->fetch();
    echo json_encode(['status'=> 'success','data'=> $result]);
}
if(isset($_POST['idMenu'])) {
    $array = [];
    $id = $_POST['idMenu'];
    $pr = $conn->prepare('SELECT * FROM menu WHERE parent = :parent');
    $pr->bindParam(':parent', $id);
    $pr->execute();
    $array = $pr->fetchAll();


    if(count($array) > 0) {
        foreach ($array as $item) {
            $id = $item['id'];
            $pr = $conn->prepare('DELETE FROM menu WHERE id = :id');
    $pr->bindParam(':id', $id);
    $pr->execute();
        }
    } else {

    }
$id = $_POST['idMenu'];
    $pr = $conn->prepare('DELETE FROM menu WHERE id = :id');
    $pr->bindParam(':id', $id);
    $pr->execute();
    echo json_encode(['status'=> 'success','id'=> $id,'array'=> $array]);
}

if (isset($_POST['editId'])) {  
    $id = $_POST['editId'];  
    $title = $_POST['editTitle'];  
    $parent = $_POST['editParent'];  
    $pr = $conn->prepare('UPDATE menu SET title = :title, parent = :parent WHERE id = :id');  
    

    $pr->bindParam(':title', $title);  
    $pr->bindParam(':parent', $parent);  
    $pr->bindParam(':id', $id);  
    

    $pr->execute();  


    $pr = $conn->prepare('SELECT * FROM menu WHERE id = :id');  
    $pr->bindParam(':id', $id);  
    $pr->execute();  

    $result = $pr->fetch(PDO::FETCH_ASSOC);

    echo json_encode(['result' => $result]);  
} 
if(isset($_POST['idTest'])) {
    $id = $_POST['idTest'];
    echo json_encode(['id'=> $id]);
}
if(isset($_POST['time'])) {
    $time = $_POST['time'];
    $pr = $conn->prepare('UPDATE timePreloader SET time = :time WHERE id = 1');
    $pr->bindParam(':time', $time);
    $pr->execute();
    $pr = $conn->prepare('SELECT * FROM timePreloader WHERE id = 1');
    $pr->execute();
    $result = $pr->fetch();
    
    echo json_encode(['time'=> $result['time']]);
}
?>