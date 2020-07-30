<?php
$tabel_comment = $db->fetchAll('post');
// var_dump($tabel_comment);
foreach($tabel_comment as $key => $val) {
    // echo "<br>";
    $content =  $val['content'];
    $content_post = to_slug($content);
    // echo $content_post . '<br>';
    if($content_post == $_REQUEST['post']){
        
        $get_post = $db->total("SELECT * FROM `post` WHERE `content` = '$content' ");
        // echo $get_post['id_thanhvien'];
        $user_post = $db->fetchID('users' , $get_post['id_thanhvien']);
        $first_name = $user_post['ho'];
        $last_name = $user_post['ten'];
        $name = to_slug($first_name . " " . $last_name);

?>
<main class="container">
    <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
            <h5 class="title py-2">New Images</h5>
            <div class="alert alert-warning" role="alert">
                ban la nguoi quyet dinh bai viet co duoc hien thi hay khong, bai viet co luong dislike tren 10 thi se bi
                loai bo click nut dislike &nbsp;<i class="fas fa-thumbs-down"></i>
                <br> Chú ý : HaiVN đang trong giai đoạn thử nghiệm
            </div>
            <div class="row post py-3">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <?php if($get_post['img'] !== ""){ ?>
                        <a href="assets/img/post/<?php echo $get_post['img']; ?>?image=250" data-toggle="lightbox" data-max-width="100%" data-type="image" class="open_images">
                        <img src="assets/img/post/<?php echo $get_post['img']; ?>?image=250" alt="" class=" img-post">
                        </a>
                    
                    <?php } else { ?>
                    <img src="assets/img/avatar/anh.jpg" alt="" class="img-fluid img-post">
                    <?php } ?>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="view">
                        <h5 class="title id" data="<?php echo $get_post['id']; ?>">
                            <?php 
                                if($get_post['content'] !== "") {
                                    echo $get_post['content'];  
                                }
                                else {
                                    echo "Bài viết không có nội dung";
                                }
                            ?>
                        </h5>
                        <p>
                            <a class="far fa-eye views" href="">&nbsp;<?php echo $get_post['views']; ?></a>
                            <a class="fas fa-comments commnets"
                                href="?views=comment&post=<?php echo to_slug($get_post['content']); ?>&id=<?php echo $get_post['id']; ?>">
                                &nbsp; <?php echo $get_post['comment']; ?> &nbsp;</a>

                            <?php
                
                                if(isset($username)){
                                $get_user = $db->total("SELECT * FROM `users` WHERE `user` = '$username' ");

                                $check_like = $db->countTable('likes' , array('post' => $get_post['id'] , 'id_thanhvien_like' => $get_user['id'] , 'id_thanhvien_post' => $get_post['id_thanhvien'])); 
                                if($check_like > 0){
                                    $get_like = $db->total("SELECT * FROM `likes` WHERE `id_thanhvien_like` = '{$get_user['id']}'  AND `id_thanhvien_post` = '{$get_post['id_thanhvien']}' ");
                                    $like = $get_like['status'];
                                }
                                else{
                                    $like = 1;
                                }
                            ?>
                            <?php if($like == 0){ ?>
                            <a class=" far fa-heart like   text-danger ">&nbsp;
                                <?php echo $get_post['num_likes']; ?></a>
                            <?php } elseif($like == 1) { ?>
                            <a class="far fa-heart like"> &nbsp; <?php echo $get_post['num_likes']; ?> </a>
                            <?php } ?>
                            <?php } else { ?>
                            <a class="far fa-heart like"> &nbsp; <?php echo $get_post['num_likes']; ?> </a>
                            <?php } ?>
                        </p>
                        <p><a class="id_thanhvien" data="<?php echo $get_post['id_thanhvien']; ?> " href="?views=profileview&name=<?php echo $name?>&token=<?php echo $get_user['token'] ?>">Tác giả <b
                                    class="btn-primary"><?php echo $first_name . " " . $last_name; ?></b></a></p>
                        <p><a href="">Thời gian <b class="btn-success"><?php echo $get_post['date']; ?></b></a></p>
                    </div>
                </div>
            </div>

            <div class="row bootstrap snippets">
                <div class="col-md-12 col-md-offset-2 col-sm-12">
                    <div class="comment-wrapper">
                        <div class="panel panel-info">
                            <div class="panel-heading">
                                Viết Bình luận mới
                            </div>
                            <div class="panel-body">
                                <form id="comment">
                                    <textarea class="form-control" placeholder="write a comment..." rows="3"
                                        id="input_comment" autofocus></textarea>
                                    <br>
                                    <button type="submit" class="btn btn-info pull-right" id="btn-comment">Bình
                                        luận</button>
                                </form>
                                <div class="clearfix"></div>



                            </div>
                            <hr>

                            <div id="load_comment"></div>
                            <div id="load_data_comment"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>



    </div>

</main>


<?php }  }  ?>