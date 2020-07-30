<?php
$token = $_REQUEST['token'];
$get_num_user = $db->num_row("SELECT *FROM `users` WHERE `token` = '$token'");
if($get_num_user > 0){
    $get_user = $db->total("SELECT *FROM `users` WHERE `token` = '$token'");
    $name = $get_user['ho'] . " " . $get_user['ten'];
    

 ?>
<div class="container py-3">
    <div class="fb-profile">
        <img align="left" class="fb-image-lg" src="http://lorempixel.com/850/280/nightlife/5/"
            alt="Profile image example" />
        <img align="left" class="fb-image-profile thumbnail img-fluid " src="assets/img/anh.jpg"
            alt="Profile image example" style="width: 16%" />
        <div class="fb-profile-text">
            <h1 data="<?php echo $get_user['id']; ?>"><?php echo $name; ?></h1>
            <p>Girls just wanna go fun.</p>
            <?php
            if(isset($username)){
            $get_user_online = $db->total("SELECT *FROM `users` WHERE `user` = '$username'");
            $get_follow = $db->num_row("SELECT * FROM `follow` WHERE `id_user_follow` = '{$get_user_online['id']}' AND `id_user_can_follow` = '{$get_user['id']} '");
            $get_like = $db->num_row("SELECT * FROM `like_profile` WHERE `id_user_like` = '{$get_user_online['id']}' AND `id_user_can_like` = '{$get_user['id']} '");
            
            if($get_follow > 0){ 
            ?>
            <a href="" class="follow text-success"> <i class="fas fa-wifi text-success check_follow"></i> Đã Theo dõi</a>
            
            <?php } else { ?>
            <a href="" class="follow "> <i class="fas fa-wifi   check_follow"></i> Theo dõi</a>

            <?php } if($get_like > 0){ ?>
                <a href="" class="like_profile px-2"><i class="fa fa-gittip text-danger check_like"></i> Đã like</a>
            <?php } else { ?>  
                <a href="" class="like_profile px-2"><i class="fa fa-gittip  check_like"></i> like</a>
            <?php } ?>
            <?php }else { ?>
                <a href="" class="follow "> <i class="fas fa-wifi   check_follow"></i> Theo dõi</a>
                <a href="" class="like_profile px-2"><i class="fa fa-gittip  check_like"></i> like</a>
            <?php }  ?>
           
            
           
        </div>
    </div>



    <div class="container-fluid gedf-wrapper py-3">
        <div class="row">
            <div class="col-md-4 py-3">
                <div class="card">
                    <div class="card-body">
                        <div class="h5">Giới thiệu bản thân</div>
                        <?php 
                       if($get_user['status'] !== ""){ ?>
                        <div class="h7"> <?php echo $get_user['status']; ?>
                        </div>

                        <?php } else { ?>
                        <div class="h7"> Hạnh phúc là gì
                        </div>
                        <?php } ?>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="h6 text-muted"><i class="fa fa-gittip text-danger"></i> like</div>
                            <div class="h5" id="num_like"><?php echo $get_user['likes']; ?></div>
                        </li>
                        <li class="list-group-item">

                            <div class="h6 text-muted"> <i class="fas fa-wifi text-success"></i> Following</div>
                            <div class="h5" id="num_follow"><?php echo $get_user['follow']; ?></div>
                        </li>
                        <li class="list-group-item">
                            <div class="h6 text-muted"> <i class="fas fa-venus text-danger"></i> <i
                                    class="fas fa-mars-stroke text-primary"></i> Giới Tính</div>
                            <?php if($get_user['gender'] == 1){ ?>
                            <div class="h5">Nam</div>
                            <?php } else {  ?>
                            <div class="h5">Nữ</div>
                            <?php } ?>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8 gedf-main py-3">

                <!--- \\\\\\\Post-->
                <div class="card gedf-card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab"
                                    aria-controls="posts" aria-selected="true">Make
                                    a publication</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images"
                                    aria-selected="false" href="#images">Images</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel"
                                aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <label class="sr-only" for="message">post</label>
                                    <textarea class="form-control" id="message" rows="3"
                                        placeholder="What are you thinking?"></textarea>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                                <div class="form-group">
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="customFile">
                                        <label class="custom-file-label" for="customFile">Upload image</label>
                                    </div>
                                </div>
                                <div class="py-4"></div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-primary">share</button>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- Post /////-->

                <!--- \\\\\\\Post-->


                <div id="load_post_profile"></div>
                <div id="load_data_post_profile"></div>


            </div>

        </div>
    </div>
</div> <!-- /container -->
<?php } ?>