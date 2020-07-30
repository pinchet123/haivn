<?php
session_start();
include "../Database.php";
include "../Function.php";
$db = new Database;
$get_user = $db->total("SELECT * FROM `users` WHERE `user` = '$username' ");

if(isset($username)){
if(isset($_FILES['img_chat']['name'])){
    /* Location */
    $get = 1;
    $filename = $_FILES['img_chat']['name'];
    $location = "../assets/img/chat/".$filename;
    $uploadOk = 1;
    $imageFileType = pathinfo($location,PATHINFO_EXTENSION);
    $valid_extensions = array("jpg","jpeg","png");
    if( !in_array(strtolower($imageFileType),$valid_extensions) ) {
        $uploadOk = 0;
    }
    if($uploadOk == 0){
        $check = 0;
    }else{
        /* Upload file */
        if(move_uploaded_file($_FILES['img']['tmp_name'],$location)){
            $check = 1;
            $send_img = $db->insert('live_chat' , array('img' => $filename));
            if($send_img){
                $status = 0;
                $messages = "gửi hình ảnh thành công";
            }
            
        }else{
            $check = 0;
            $status = 1;
            $messages = "không thể gửi tệp";
           
        }
    }
}
}
else {
    $status = 1;
    $messages = "xin mời đăng nhập";
}
echo json_encode(array('status' => $status , 'messages' => $messages));
