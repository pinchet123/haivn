$(document).ready(() => {
    $('form#login').submit(function(e) {
        e.preventDefault()
        var user = $('#user_login')
        var pass = $('#pass_login')
        var formData = new FormData()
        if (user.val() == "") {
            swall('Tên tài khoản không được bỏ trống', 'error')
        } else if (pass.val() == "") {
            swall('mật khẩu không được bỏ trống', 'error')
        } else {
            formData.append("user", user.val())
            formData.append("pass", pass.val())
            $.ajax({
                url: 'ajax/login.html',
                type: 'post',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: () => {
                    $('#btn-login').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...`)
                },
                success: (res) => {
                    if (res.status == 0) {
                        swall(res.messages, 'success')
                        loadpage()
                    } else if (res.status == 1) {
                        swall(res.messages, 'error')
                        loadpage()
                    }
                }
            })
        }
    })
    $('form#reg').submit(function(e) {
        e.preventDefault()
        var user = $('#user_reg')
        var pass = $('#pass_reg')
        var rp_pass = $('#rp_pass')
        var first_name = $('#first_name')
        var last_name = $('#last_name')
        var gender = $("input[name='gender']:checked").val()
        var formData = new FormData()
        if (user.val().trim() == "") {
            swall('Tên tài khoản không được bỏ trống', 'error')
        } else if (pass.val().trim() == "") {
            swall('mật khẩu không được bỏ trống', 'error')

        } else if (rp_pass.val().trim() != pass.val()) {
            swall('Mật khẩu không trùng', 'error')

        } else if (!gender) {
            swall('Vui lòng chọn giới tính', 'error')

        } else if (first_name.val().trim() == "" && last_name.val().trim()) {
            swall('Họ tên không được bỏ trống')
        } else if (user.val().trim().length < 6 && pass.val().trim().length < 6) {
            swall('Tên tài khoản không được bỏ trống', 'error')
        } else {
            gender = parseInt(gender);
            formData.append("user", user.val())
            formData.append("pass", pass.val())
            formData.append('first_name', first_name.val())
            formData.append('last_name', last_name.val())
            formData.append('rp_pass', rp_pass.val())
            formData.append('gender', gender);
            $.ajax({
                url: 'ajax/register.html',
                type: 'post',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: () => {
                    $('#btn-reg').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...`)
                },
                success: (res) => {
                    if (res.status == 0) {
                        swall(res.messages, 'success')
                        loadpage()
                    } else if (res.status == 1) {
                        swall(res.messages, 'error')
                        loadpage()
                    }
                }
            })
        }
    })
    $('#logout').click(() => {
        Swal.fire({
            title: 'Thông báo',
            text: "bạn có muốn đăng xuất",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có , tôi muốn đăng xuất!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: "ajax/logout.html",
                    dataType: 'json',
                    beforeSend: () => {
                        $('.swal2-confirm').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...`)
                    },
                    success: (res) => {
                        if (res.status == 0) {
                            swall(res.messages, 'success')
                            loadpage()
                        } else if (res.status == 1) {
                            swall(res.messages, 'error')
                            loadpage()
                        }
                    }
                })
            }
        })
    })
    $('#post').click(() => {
        $.ajax({
            url: 'ajax/post.html',
            type: 'post',
            dataType: 'json',
            beforeSend: () => {
                $(this).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...`)
            },
            success: (res) => {
                if (res.status == 0) {
                    $('#post_modal').modal('show')

                } else if (res.status == 1) {


                    swall('Bạn hãy đăng nhập để đăng bài', 'error')
                }
            }
        })
    })
    $('#save_profile').click(() => {
        var formData = new FormData()
        var files = $('#file')[0].files[0]
        var first_name = $('#first_name')
        var last_name = $('#last_name')
        var pass_profile = $('#pass_frofile')
        var rp_pass = $('#rp_pass_profile')
        var check = 0;
        if (files) {


        } else {
            check++;
        }
        if (first_name.val().trim() != "") {


        } else {
            check++
        }
        if (last_name.val().trim() != "") {} else {
            check++
        }
        if (pass_profile.val().trim() != rp_pass.val().trim()) {
            swall('Mật khẩu không trùng khớp', 'error')
        } else {

        }
        if (check >= 3) {
            swall('Bạn không có thay đổi nào', 'success');

        } else {
            formData.append('file', files)
            formData.append('first_name', first_name.val())
            formData.append('pass_profile', pass_profile.val())
            formData.append('rp_pass_profile', rp_pass.val())
            formData.append('last_name', last_name.val())

            $.ajax({
                url: 'ajax/changer_profile.html',
                type: 'post',
                data: formData,

                dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: () => {
                    $(this).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...`)
                },
                success: (res) => {
                    if (res.status == 0) {
                        swall(res.messages, 'success')
                        loadpage()
                    } else if (res.status == 1) {
                        swall(res.messages, 'error')
                        loadpage()
                    }
                }

            })
        }

    })
    $('#post_new').click(() => {
        var formData = new FormData()
        var content = $('#content').val()
        var files = $('#img')[0].files[0]
        formData.append('img', files);
        formData.append('content', content);
        if (content.trim() !== "" && !files) {
            Swal.fire({
                title: 'Thông báo',
                text: "Bạn đăng bài viết nhưng không dùng ảnh",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có , tôi muốn đăng bài!'
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        url: "ajax/new_post.html",
                        type: 'post',
                        data: formData,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        beforeSend: () => {
                            $(this).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...`)
                        },
                        success: (res) => {
                            if (res.status == 0) {
                                swall(res.messages, 'success')
                                loadpage()
                            } else if (res.status == 1) {
                                swall(res.messages, 'error')
                                loadpage()
                            }
                        }
                    })
                }
            })
        } else if (files && content.trim() == "") {
            Swal.fire({
                title: 'Thông báo',
                text: "Bạn đăng bài viết nhưng không có nội dung",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Có , tôi muốn đăng bài!'
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        url: "ajax/new_post.html",
                        type: 'post',
                        data: formData,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        beforeSend: () => {
                            $(this).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...`)
                        },
                        success: (res) => {
                            if (res.status == 0) {
                                swall(res.messages, 'success')
                                loadpage()
                            } else if (res.status == 1) {
                                swall(res.messages, 'error')
                                loadpage()
                            }
                        }
                    })
                }
            })

        } else if (files && content.trim() !== "") {

            $.ajax({
                url: "ajax/new_post.html",
                type: 'post',
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                beforeSend: () => {
                    $(this).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...`)
                },
                success: (res) => {
                    if (res.status == 0) {
                        swall(res.messages, 'success')
                        loadpage()
                    } else if (res.status == 1) {
                        swall(res.messages, 'error')
                        loadpage()
                    }
                }
            })


        } else if (content.trim() == "" && !files) {
            swall('Không có nội dung và ảnh không thể đăng bài', 'error')
        }

    })
    var limit = 5;
    var action = 'inactive'
    var start = 0
    var limits = 1000;
    var actions = 'inactives'
    var starts = 0

    function load_post(limit, start) {
        $.ajax({
            url: 'ajax/load_post.html',
            method: 'post',
            data: { limit: limit, start: start },
            cache: false,
            success: function(data) {
                $('#load_data').append(data)
                if (data == "") {
                    $('#load_data_messages').html(`<button class='form-control btn btn_warning'> Đang tải bài viết </button>`)
                    action = 'active'
                } else {
                    $('#load_data_messages').html(`<button class=' btn btn-danger form-control'> Hết Bài viết rồi</button>`)
                    action = 'inactive'
                }
            }
        })

    }
    function load_post_profile(limit, start) {
        var id_user = $('h1').attr('data');
        $.ajax({
            url: 'ajax/load_post_profile.html',
            method: 'post',
            data: { limit: limit, start: start , id_user : id_user },
            cache: false,
            success: function(data) {
                $('#load_post_profile').append(data)
                if (data == "") {
                    $('#load_data_post_profile').html(`<button class='form-control btn btn_warning'> Đang tải bài viết </button>`)
                    action = 'active'
                } else {
                    $('#load_data_post_profile').html(`<button class=' btn btn-danger form-control'> Hết Bài viết rồi</button>`)
                    action = 'inactive'
                }
            }
        })

    }

    if (action == 'inactive') {
        action = 'active'
        load_post(limit, start)
    }
  
    var url = window.location.href
    // alert(url);
    if(url.includes('profileview')){
        if (actions == 'inactives') {
            actions = 'actives'
            load_post_profile(limits, starts)
        }
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() > $('#load_data_post_profile').height() && action == 'inactive') {
                action = 'active'
                start = start + limit
                setTimeout(function() {
                    load_post(limit, start)
                }, 1000)
            }
            if ($(window).scrollTop() + $(window).height() > $('#load_post_profile').height() && action == 'inactives') {
                actions = 'actives'
                starts = starts + limits
                setTimeout(function() {
                    load_post_profile(limits, starts)
                }, 1000)
            } else {
                // actions = 'actives'
            }
    
        })
    }
    if(url.includes('comment')){
        if (actions == 'inactives') {
            actions = 'actives'
            load_comment(limits, starts)
        }
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() > $('#load_data').height() && action == 'inactive') {
                action = 'active'
                start = start + limit
                setTimeout(function() {
                    load_post(limit, start)
                }, 1000)
            }
            if ($(window).scrollTop() + $(window).height() > $('#load_comment').height() && action == 'inactives') {
                actions = 'actives'
                starts = starts + limits
                setTimeout(function() {
                    load_comment(limits, starts)
                }, 1000)
            } else {
                // actions = 'actives'
            }
    
        })
    }
    $(document).on('click', 'a.like', function() {
        $.ajax({
            url: 'ajax/post.html',
            type: 'post',
            dataType: 'json',
            beforeSend: () => {

            },
            success: (res) => {
                if (res.status == 0) {
                    var data = $(this).parent().parent()
                    var post = data.children().attr('data')
                    post = parseInt(post)

                    var id_thanhvien = $('a.id_thanhvien').attr('data')
                    $.ajax({
                        url: 'ajax/like.html',
                        type: 'post',
                        data: { post: post, id_thanhvien: id_thanhvien },
                        dataType: 'json',
                        success: (like) => {
                            if (like.status == 0) {
                                toast('success', like.messages)
                                $(this).html('&nbsp;' + like.num_likes)
                                if (like.check_like == 0) {
                                    $(this).addClass('text-danger')

                                } else if (like.check_like == 1) {
                                    $(this).removeClass('text-danger')

                                }


                            } else if (like.status == 1) {
                                swall(like.messages, 'error')

                            }
                        }
                    })

                } else if (res.status == 1) {


                    swall('Bạn hãy đăng nhập để like', 'error')
                }
            }
        })
    });


    function load_comment(limits, starts) {
        var id_post = $('h5.id').attr('data');
        $.ajax({
            url: 'ajax/load_commnet.html',
            method: 'post',
            data: { limit: limits, start: starts, id_post: id_post },
            cache: false,
            success: function(data) {
                $('#load_comment').html(data)
                if (data == "") {
                    $('#load_data_comment').html(`<button class='form-control btn btn_warning'> Đang tải bình luận </button>`)
                    actions = 'actives'
                } else {
                    $('#load_data_comment').html(`<button class=' btn btn-danger form-control'> Hết bình luận rồi</button>`)
                        // $('#load_data_comment').html('đang load commnet')
                    actions = 'inactives'
                }
            }
        })

    }

    function load_chat() {
        var oldscrollHeight = $("#box-chat").prop("scrollHeight") - 20; //Scroll height before the request
        $.ajax({
            url: 'ajax/load_chat.html',
            method: 'post',

            cache: false,
            success: function(data) {
                $('#box-chat').html(data)

                var newscrollHeight = $("#box-chat").prop("scrollHeight") - 20; //Scroll height after the request
                if (newscrollHeight > oldscrollHeight) {
                    $("#box-chat").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
                }
                if (data == "") {
                    $('#load_data_chat').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...`)

                } else {
                    $('#load_data_comment').html(`<button class=' btn btn-danger form-control'> Hết bình luận rồi</button>`)
                        // $('#load_data_comment').html('đang load commnet')
                }
            }
        })

    }

    function load_users_chat() {

        $.ajax({
            url: 'ajax/load_users_chat.html',
            method: 'post',

            cache: false,
            success: function(data) {
                $('.load_user').html(data)



            }
        })

    }

    function load_num_users_chat() {
        $.ajax({
            url: 'ajax/load_num_user_chat.html',
            type: 'post',
            dataType: 'json',
            beforeSend: () => {

            },
            success: (num) => {
                $('#num_chat').text(num.num_user);
                $('#num_mess').text(num.num_chat)
            }
        })
    }
    var setTime_users_chat = null
    var setTime_num_users_chat = null;
    var interval = null;
    var hex_number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    var hex_btn = document.getElementById('changer-color');

    function get_hex() {
        let hex_col = '#'
        for (let i = 0; i < 6; i++) {
            let random = Math.floor(Math.random() * hex_number.length)
            hex_col += hex_number[random]

        }


        if (typeof(Storage) !== "undefined") {
            // Store
            localStorage.setItem("color", hex_col);
            // Retrieve
            $('.color').css('backgroundColor', hex_col);
            $('.contacts_card').css('background', hex_col);
        } else {
            $('.color').css('backgroundColor', hex_col);
            $('.contacts_card').css('background', hex_col);
        }


    }








    function open_box() {
        var color = localStorage.getItem("color")
        $('.color').css('backgroundColor', color);
        $('.contacts_card').css('background', color);
        $(".modal-backdrop").removeClass('d-none')
        $('#box').css('transition', 'all 1s');
        $('#box').css('display', 'block');
        $('#box').css('opacity', '1');
        $('#box').css('height', '100%')
        $('#box').css('width', '100%')
        interval = setInterval(load_chat, 1000);
        setTime_num_users_chat = setInterval(load_num_users_chat, 1000)
        setTime_users_chat = setInterval(load_users_chat, 1000);
        $('#changer-color').click(() => {
            get_hex();
        })

        $.ajax({
            url: 'ajax/post.html',
            type: 'post',
            dataType: 'json',
            beforeSend: () => {

            },
            success: (res) => {
                if (res.status == 1) {

                } else if (res.status == 0) {
                    $.ajax({
                        url: 'ajax/add_user_chat.html',
                        type: 'post',
                        dataType: 'json',
                        beforeSend: () => {

                        },
                        success: (data) => {
                            if (data.status == 0) {
                                toast('success', data.messages);


                            }
                            if (data.status == 1) {
                                toast('error', data.messages);


                            }
                        }
                    })
                }
            }
        })
    }

    function close_box() {
        var h = 0
        var w = 0
        $('#box').css('display', 'none');
        $(".modal-backdrop").addClass('d-none')
        $('#box').css('height', h)
        $('#box').css('width', w)
        $('#box').css('opacity', '0');
        clearInterval(interval);
        clearInterval(setTime_num_users_chat);
        clearInterval(setTime_users_chat);
        $.ajax({
            url: 'ajax/post.html',
            type: 'post',
            dataType: 'json',
            beforeSend: () => {

            },
            success: (res) => {
                if (res.status == 1) {

                } else if (res.status == 0) {
                    $.ajax({
                        url: 'ajax/delete_user_chat.html',
                        type: 'post',
                        dataType: 'json',
                        beforeSend: () => {

                        },
                        success: (data) => {
                            if (data.status == 0) {
                                toast('success', data.messages);
                            }
                            if (data.status == 1) {
                                toast('error', data.messages);
                            }
                        }
                    })
                }
            }
        })
    }
    $('#open_chat').click(() => {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('open', true)
        } else {

        }
        open_box()






    })
    $('#btn-close-box').click(() => {
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('open', false)
        } else {

        }
        close_box()

    })
    var open = localStorage.getItem('open')
    if (open == 'true') {
        open_box()

    } else if (open == 'false') {

        close_box()
    }







    $('form#comment').submit((e) => {
        e.preventDefault()
        var input_comment = $('#input_comment').val()

        var post = $('h5.id').attr('data')

        post = parseInt(post)
        if (input_comment == "") {
            swall('Bình luận không được bỏ trống', 'error');
        } else {
            $.ajax({
                url: 'ajax/post.html',
                type: 'post.',
                dataType: 'json',
                beforeSend: () => {
                    $('#btn-comment').addClass('disabled')
                    $('#btn-comment').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...`)
                },
                success: (res) => {
                    if (res.status == 1) {
                        swall('xin mời đăng nhập', 'error')
                    } else if (res.status == 0) {
                        $.ajax({
                            url: 'ajax/new_comment.html',
                            type: 'post',
                            data: { commnet: input_comment, post: post },
                            dataType: 'json',
                            beforeSend: () => {
                                $('#btn-comment').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...`)
                            },
                            success: (data) => {
                                if (data.status == 0) {
                                    swall(data.messages, 'success')
                                    loadpage()
                                } else if (data.status == 1) {
                                    swall(data.messages, 'error')
                                    loadpage()
                                }
                            }
                        })
                    }
                }
            })
        }
    })
    $(document).on('click', 'a.delete_comment', function() {




        Swal.fire({
            title: 'Thông báo',
            text: "Bạn đang thực hiện xóa bình luận",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có , tôi muốn xóa!'
        }).then((result) => {
            var comment = $(this).find('p.content').text()
            if (result.value) {
                var comment = $(this).attr('data')
                var user_comment = $(this).parent().parent().find('.user_comment').text();
                var id_post = $('h5.id').attr('data');
                $.ajax({
                    url: "ajax/delete_comment.html",
                    type: 'post',
                    data: { comment: comment, user_comment: user_comment, id_post: id_post },
                    dataType: 'json',

                    beforeSend: () => {
                        $(this).removeClass('delete-comment')
                        $(this).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Loading...`)
                    },
                    success: (res) => {
                        if (res.status == 0) {
                            toast('success', res.messages)
                            loadpage()
                        } else if (res.status == 1) {
                            swall(res.messages, 'error')
                            loadpage()
                        }
                    }
                })
            }
        })

    })
    $('form#chat-bot').submit((e) => {
        e.preventDefault()
        var text = $('#text').val();
        var user = $('#text').attr('data');
        if (text == "") {
            swall('Bình luận không được bỏ trống', 'error');
        } else {
            $.ajax({
                url: 'ajax/post.html',
                type: 'post.',
                dataType: 'json',
                beforeSend: () => {
                    $('#btn-chat').addClass('disabled')
                    $('#btn-chat').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>`)
                },
                success: (res) => {
                    $('#btn-chat').removeClass('disabled')
                    $('#btn-chat').html(`<button class="input-group-text send_btn" type="submit"><i class="fas fa-location-arrow"></i></button>`)
                    if (res.status == 1) {
                        swall('xin mời đăng nhập', 'error')
                    } else if (res.status == 0) {
                        $.ajax({
                            url: 'ajax/chat_bot.html',
                            type: 'post',
                            data: { text: text, user: user },
                            dataType: 'json',
                            beforeSend: () => {
                                $('#btn-chat').addClass('disabled')
                                $('#btn-comment').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...`)
                            },
                            success: (data) => {
                                $('#btn-chat').removeClass('disabled')
                                $('#btn-chat').html(`<button class="input-group-text send_btn" type="submit"><i class="fas fa-location-arrow"></i></button>`)
                                if (data.status == 0) {
                                    toast('success', data.messages)

                                } else if (data.status == 1) {
                                    toast('error', data.messages)

                                }
                            }
                        })
                    }
                }
            })
        }
    })
    $(document).on('click', 'a.delete_chat', function() {
        var id_chat = $(this).attr('data')
        $.ajax({
            url: 'ajax/delete_chat.html',
            type: 'post',
            data: { id: id_chat },
            dataType: 'json',
            beforeSend: () => {

            },
            success: (res) => {
                if (res.status == 0) {
                    toast('success', res.messages)
                } else if (res.status == 1) {
                    toast('error', res.messages)
                }
            }
        })
    })
    $('.follow').click((e) =>{
        var user_follow = $('h1').attr('data')
        e.preventDefault();
        $.ajax({
            url : 'ajax/follow.html',
            type : 'post',
            data : {user_follow : user_follow},
            dataType : 'json',
            beforeSend : () => {

            },
            success : (res) => {
                if(res.status == 0){
                    toast('success' , res.messages)
                    $('#num_follow').text(res.num_follow)
                    if(res.check == 0){
                        $('.check_follow').addClass('text-success');
                        $('.follow').addClass('text-success');
                        $('.follow').html(`<i class="fas fa-wifi   check_follow"></i> Đã Theo dõi` );

                    }
                    else if(res.check == 1){
                        $('.check_follow').removeClass('text-success');
                        $('.follow').removeClass('text-success');
                        $('.follow').html(`<i class="fas fa-wifi   check_follow"></i> Theo dõi` );
                    }
                }
                else if(res.status == 1){
                    swall(res.messages , 'error')
                }
                
            }
        })
    })
    $('.like_profile').click((e) =>{
        var user_like = $('h1').attr('data')
        e.preventDefault();
        $.ajax({
            url : 'ajax/like_profile.html',
            type : 'post',
            data : {user_like : user_like},
            dataType : 'json',
            beforeSend : () => {

            },
            success : (res) => {
                if(res.status == 0){
                    toast('success' , res.messages)
                    $('#num_like').text(res.num_like)
                    if(res.check == 0){
                        $('.check_like').addClass('text-danger');
                        $('.like_profile').addClass('text-danger');
                        $('.like_profile').html(`<i class="fas fa-wifi   check_like"></i> Đã Like` );

                    }
                    else if(res.check == 1){
                        $('.check_follow').removeClass('text-danger');
                        $('.like_profile').removeClass('text-danger');
                        $('.like_profile').html(`<i class="fas fa-wifi   check_like"></i> Like` );
                    }
                }
                else if(res.status == 1){
                    swall(res.messages , 'error')
                }
                
            }
        })
    })
    $('#img_chat').change(() => {
        var formData = new FormData()
        
         var files = $('#img_chat')[0].files[0]
        
        formData.append('img_chat' , files)
        $.ajax({
            url : 'ajax/chat_bot.html',
            type : 'post',
            data : formData,
            dataType : 'json',
            processData: false,
            contentType: false,
            beforeSend : () => {

            },
            success : (res) => {
                if(res.status == 0){
                    toast('success' , res.messages)
                }
                else if(res.status == 1){
                    toast('error' , res.messages)
                }
            }

        })
    })



})