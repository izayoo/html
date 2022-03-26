<?php

$connection = mysqli_connect("localhost", "root", "");
$db = mysqli_select_db($connection, "socials");

$name = $_POST['name'];
$email = $_POST['email'];
$mobileNo = $_POST['mobileNo'];
$bday = $_POST['bday'];
$age = $_POST['age'];
$gender = $_POST['gender'];

$runcheck = mysqli_query($connection, "SELECT * from `users` where `email` = '". $email ."'");
if (mysqli_num_rows($runcheck) > 0) {
    echo "Email Already Exists";
} else {
    $query = mysqli_query($connection, 
        "INSERT INTO `users` 
            (`name`, `email`, `gender`, `birthdate`, `age`, `mobile_no`) 
        VALUES ('". $name ."', '". $email ."', '". $gender ."', '". $bday ."', '". $age ."', '". $mobileNo ."');");

    echo "User Successfully Registered";
}


mysqli_close($connection);