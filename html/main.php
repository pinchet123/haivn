<?php
    if(isset($_REQUEST['views'])){
        $page = $_REQUEST['views'] . '.php';
        include "page/".$page;
    }
    else {
?>
<?php
    
    // $num_post = $db->num_row("SELECT * FROM  `post` WHERE 'active' = 0");
    // $query = $db->query("SELECT * FROM  `post` WHERE 'active' = 0");
?>
<main class="container">

    <div class="row">
        <div class="col-12 col-sm-12 col-md-12 col-xl-12 col-lg-12">
            <h5 class="title py-2">Ảnh mới nhất</h5>
            <div class="alert alert-warning" role="alert">
             Tham Gia chat live cùng cộng đồng nhé
                <br> Chú ý : Web đang phát triển
                
            </div>
           <div id="load_data"></div>
           <div id="load_data_messages"></div>
        </div>
        <div class="col-12 col-sm-12 col-md-4 col-xl-4 col-lg-4">
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">

                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">thiết lập nhanh</h5>

                        </div>
                        <div class="modal-body">
                            <div class="row ">
                                <div class="col">
                                    tự động thu gọn ảnh
                                </div>
                                <div class="col">
                                    <label class="switch">
                                        <input type="checkbox" data="off" id="input">
                                        <span></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">

                            <button type="button" class="btn btn-primary" data-dismiss="modal" id="save">Save
                                changes</button>
                        </div>
                    </div>
                </div>
            </div>
           
            
        </div>


    </div>

</main>
<?php } ?>