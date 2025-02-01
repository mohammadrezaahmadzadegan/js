<?php
require('model.php');?>

                            <ul class="menu-items new">
                            <?php 
                            $pr = $conn->prepare('SELECT * FROM menu WHERE parent = 0');
                            $pr->execute();
                            $result = $pr->fetchAll();
                            
                           
                           
                            foreach ($result as $item) {
                                ?>
                               
                                   <?php 
                                   require('submenu.php');
                                   ?>
                               
                                <?php
                            }
                            ?>
                            </ul>
                     