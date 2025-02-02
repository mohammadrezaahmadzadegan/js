<?php
session_start();
if (isset($_SESSION['message'])) {

    echo "<div class='alert alert-success'>" . $_SESSION['message'] . "</div>";
    unset($_SESSION['message']);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/themify-icons/themify-icons.css">
</head>

<body>


    <section>
        <div class="container upl">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <?php

                        require('model.php');

                        ?>
                        <a href="http://<?= $_SERVER['HTTP_HOST'] ?>/admin.php">admin panel</a>
                        <p class="text-center mt-3">project 1</p>
                        <form id="uploadForm" enctype="multipart/form-data">
                            <label
                                class="d-flex flex-column justify-content-center align-items-center bg-light rounded-lg shadow p-3">
                                <img src="images/1.png" alt="logo" style="width: 200px;height: 200px;">
                                <p class="mt-3">Upload file</p>
                                <input type="file" name="myfile" accept="image/*" style="width: 0;height: 0;"
                                    id="input1" multiple>
                            </label>

                            <input type="submit" class="btn btn-success my-4" value="Upload">
                        </form>

                        <div id="imageList"></div>
                        <div class="mt-3 d-flex nameFile flex-column">

                            no file
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 2</p>
                        <p>Preloader</p>

                        <form class="my-4" id="timef">
                            <?php
                            $pr = $conn->prepare('SELECT * FROM timePreloader WHERE id = 1');
                            $pr->execute();
                            $result = $pr->fetch();

                            ?>
                            <label for="timein">please inter time</label>
                            <input type="text" class="form-control my-3" id="timein" value="<?= $result['time'] ?>">
                            <button class="btn btn-success" type="button" id="timeb">enter</button>
                        </form>
                        <form class="form-container mb-3" id="pre" enctype="multipart/form-data">
                            <label for="inpre">please inter time</label>
                            <input class="form-control my-3" type="file" id="inpre" name="preloader">
                            <input type="submit" class="btn btn-success" id="btnUpload" value="upload">
                        </form>
                        <div id="imgUpload"></div>
                        <div class="loader">
                            <?php
                            $pr = $conn->prepare('SELECT * FROM preloader ORDER BY id DESC LIMIT 1');
                            $pr->execute();
                            $result = $pr->fetch();
                            $path = 'uploads/' . $result['name'];

                            ?>
                            <img src="<?= $path ?>" alt="loader">
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 3</p>

                        <div class="accordion">
                            <?php
                            $sql = "select * from table3";
                            $pr = $conn->prepare($sql);
                            $pr->execute();
                            $result = $pr->fetchAll();
                            ?>

                            <form id="myForm" class="mb-4">
                                <label for="title">title:</label>
                                <input type="text" class="form-control" id="title" name="title" required>
                                <br>
                                <label for="content">content:</label>
                                <input type="text" class="form-control" id="content" name="content" required>
                                <br>
                                <input class="btn btn-success" type="submit" value="send">
                            </form>
                            <form id="deleteForm" class="my-4">
                                <select class="form-select" id="itemAc">
                                    <option value="">select</option>

                                    <?php
                                    foreach ($result as $item) {
                                        ?>
                                        <option class="intitle" data-id="<?= $item['id'] ?>" value="<?= $item['id'] ?>">
                                            <?= $item['title'] ?>
                                        </option>
                                        <?php
                                    }
                                    ?>
                                </select>
                                <input class="btn btn-danger my-4" type="submit" value="delete">
                            </form>
                            <form id="updateForm">
                                <label for="titleUp">title:</label>
                                <input type="text" class="form-control" name="title" id="titleUp" required>
                                <label for="contentUp">content:</label>
                                <input type="text" class="form-control mb-4" name="content" id="contentUp" required>
                                <select class="form-select" id="itemUp">
                                    <option value="">select</option>

                                    <?php
                                    foreach ($result as $item) {
                                        ?>
                                        <option class="intitle" data-id="<?= $item['id'] ?>" value="<?= $item['id'] ?>">
                                            <?= $item['title'] ?>
                                        </option>
                                        <?php
                                    }
                                    ?>
                                </select>
                                <input class="btn btn-warning my-4" type="submit" value="update">
                            </form>
                            <?php

                            foreach ($result as $item) {
                                ?>
                                <div class="item" data-id="<?= $item['id'] ?>">
                                    <div class="heading">
                                        <p class="intitle" data-id="<?= $item['id'] ?>"><?= $item['title'] ?></p>
                                        <i class="ti-angle-down"></i>

                                    </div>
                                    <div class="content">
                                        <p class="incontent" data-id="<?= $item['id'] ?>"><?= $item['content'] ?></p>
                                    </div>
                                </div>
                                <?php
                            }
                            ?>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 4</p>
                        <div class="password shadow bg-white p-4">
                            <p class="mb-3">Enter your password</p>
                            <input type="password" class="p-4 border">
                            <p class="text-danger mt-3" id="errorn"></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 5</p>
                        <p class="text-center mt-3">mobileMenu</p>

                        <button class="btn btn-primary text-white m-4 btnMobile">open menu</button>

                        <form id="menuForm">
                            <label for="titleMenu">create menu:</label>
                            <input class="form-control" type="text" name="title" id="titleMenu" required>
                            <select class="form-select my-4 parentMenu">
                                <option value="0">select</option>
                                <?php
                                $pr = $conn->prepare('SELECT * FROM menu');
                                $pr->execute();
                                $result = $pr->fetchAll();
                                foreach ($result as $item) {
                                    ?>
                                    <option data-id="<?php echo $item['id'] ?>" value="<?php echo $item['id'] ?>">
                                        <?php echo $item['title'] ?>
                                    </option>
                                    <?php
                                }
                                ?>

                            </select>
                            <button class="btn btn-success">send</button>
                        </form>

                        <div class="my-4" id="menuAjax"></div>
                        <div class="mobileMenu">
                            <div class="toggle-menu-button">
                                <i class="ti-menu"></i>
                            </div>
                            <div id="admin"></div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 6</p>

                        <div class="container">
                            <div class="gallery">
                                <section class="slider">
                                    <button class="prev ti-arrow-left"></button>

                                    <div class="items">
                                        <div class="item active">
                                            <img src="http://localhost:8080//uploads/1082143573679aa9414134b.png"
                                                alt="lorestan">
                                            <h2 class="title">Lorestan</h2>
                                        </div>
                                        <div class="item">
                                            <img src="http://localhost:8080//uploads/925130934679aa9148a6da.png"
                                                alt="azerbaijan">
                                            <h2 class="title">Azerbaijan</h2>
                                        </div>
                                        <div class="item">
                                            <img src="http://localhost:8080//uploads/893169562679aa8f94fcb2.jpg"
                                                alt="yazd">
                                            <h2 class="title">Yazd</h2>
                                        </div>
                                        <div class="item">
                                            <img src="http://localhost:8080//uploads/1646876777679aaa5d8a619.jpg"
                                                alt="fars">
                                            <h2 class="title">Fars</h2>
                                        </div>
                                    </div>

                                    <button class="next ti-arrow-right"></button>
                                </section>
                                <section class="images">
                                    <div class="item">
                                        <img src="http://localhost:8080//uploads/1082143573679aa9414134b.png"
                                            alt="lorestan">
                                    </div>
                                    <div class="item">
                                        <img src="http://localhost:8080//uploads/925130934679aa9148a6da.png"
                                            alt="azerbaijan">
                                    </div>
                                    <div class="item">
                                        <img src="http://localhost:8080//uploads/893169562679aa8f94fcb2.jpg" alt="yazd">
                                    </div>
                                    <div class="item">
                                        <img src="http://localhost:8080//uploads/1646876777679aaa5d8a619.jpg"
                                            alt="fars">
                                    </div>
                                </section>
                            </div>
                        </div>
                        <div>
                            <form class="test bg-danger p-5" data-id="1">
                                <button type="button" class="tb">send</button>
                            </form>
                        </div>
                        <?php
                        echo 1;
                        ?>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p7">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 7</p>

                        <div class="container">
                            <div class="form-group mb-4">
                                <input class="incopy" type="text" value="https://www.leader.ir/">
                                <div class="copy-button" title="Copy to Clipboard">
                                    <i class="ti-files"></i>
                                </div>
                            </div>

                            <div class="form-group d-flex flex-row">

                                <div class="d-flex flex-row align-items-baseline border-n bg-white ps-3">
                                    <p>your code is:</p><b class="mx-3 px-3 fs-4 bcopy">47698</b>
                                </div>
                                <div class="copyButton" title="Copy to Clipboard">
                                    <i class="ti-files"></i>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p8">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 8</p>
                        <div class="container">
                            <div class="form-group mb-4">
                                <input type="password">
                                <div class="show-password-button" title="Show Password">
                                    <i class="ti-eye"></i>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="password" class="pshow">
                                <div class="show-password-button2" title="Show Password">
                                    <i class="ti-eye"></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p9">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 9</p>
                        <p>scrollbar</p>
                        <div class="percent"></div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p10">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 10</p>
                        <input type="text" name="title" class="animet form-control w-50 mb-3">
                        <div class="htitleH">
                            <h1 class="titleH">Type your name to see it animated</h1>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p11">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="container">
                        <p class="text-center mt-3">project 11</p>
                        <div class="inputC">
                            <div class="form-group">
                                <input type="number" name="meter">
                                <div class="unit">meter</div>
                            </div>
                            <div class="form-group">
                                <input type="number" name="centimeter">
                                <div class="unit">centimeter</div>
                            </div>
                            <div class="form-group">
                                <input type="number" name="inch">
                                <div class="unit">inch</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p12 ps">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex flex-column shadow m-3 p-3">

                    <p class="text-center mt-3">project 12</p>

                    <div class="container1">
                        <div class="logo">

                            <img src="images/dark-mode-logo.png" class="dark-mode-logo" alt="dark logo">
                            <img src="images/light-mode-logo.png" class="light-mode-logo" alt="light logo">
                        </div>
                        <h1>Light / Dark Mode</h1>
                        <label class="switch">
                            <input type="checkbox">
                            <span class="toggle"></span>
                        </label>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p12 p13">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex flex-column shadow m-3 p-3">

                    <p class="text-center mt-3 text-white">project 13</p>

                    <div class="container1">

                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p14">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex flex-column shadow m-3 p-0">

                    <p class="text-center mt-3">project 14</p>


                    <div class="container2 shadow">

                        <div class="container p-0">
                            <div class="row">
                                <div class="col-2">
                                    <ul class="list-group">
                                        <li class="list-group-item">clear page</li>
                                        <li class="list-group-item ps">
                                            <label class="switch">
                                                <input class="form-check" type="checkbox" id="cblack">
                                                <span class="toggle"></span>
                                            </label>
                                        </li>
                                        <li class="list-group-item">size</li>
                                        <li class="list-group-item">
                                            <input class="form-control" type="text" id="wpencil">
                                        </li>
                                        <li class="list-group-item">pencil</li>
                                      
                                        <li class="list-group-item ps">
                                            <label class="switch">
                                            <input class="form-check" type="checkbox" id="pencil">
                                                <span class="toggle"></span>
                                            </label>
                                        </li>
                                        <li class="list-group-item">border radius</li>
                                        <li class="list-group-item">
                                            <input class="form-control" type="text" id="bpencil">
                                        </li>
                                        <li class="list-group-item">
                                            Pencil color
                                        </li>
                                        <li class="list-group-item">
                                            <div class="mb-3">
                                                <input type="color" id="colorp" class="form-control" value="#000000">
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            Background color
                                        </li>
                                        <li class="list-group-item">
                                            <div class="mb-3">
                                                <input type="color" id="bgcolor" class="form-control" value="#ffffff">
                                            </div>
                                        </li>


                                    </ul>
                                </div>
                                <div class="col-10">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <section class="p9">
        <div class="container">
            <div class="row">
                <div class="col align-items-center justify-content-center d-flex shadow m-3 p-3">
                    <div class="form-group d-flex flex-column justify-content-center align-items-center">
                        <p class="text-center mt-3">project 15</p>
                        <p>Background</p>
                        <div class="bg"></div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    </section>
    <script src="assets/js/jquery-3.2.1.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>

</html> 