var count = 1;

$('.setting').click(function() {

    $('.thietlap').css('display', 'block');



})
$('#save').click(() => {
    $('.thietlap').css('display', 'none');
})
$('#input').click(() => {
    var stt = $('#input').attr('data')
    count++;
    if (count % 2 == 0) {
        stt = "on"
    } else {
        stt = "off"
    }
    if (stt == 'on') {
        $('.img-post').css('height', '200px');
    } else {
        $('.img-post').css('height', 'auto');
    }
})

function toast(icon, text) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        type: icon,
        title: text

    })
}
function in_array(needle, haystack){
    var found = 0;
    for (var i=0, len=haystack.length;i<len;i++) {
        if (haystack[i] == needle) return i;
            found++;
    }
    return -1;
}
$('body').css('opacity', '0.5')
setTimeout(function() {
    $('body').addClass('loaded');
    $('body').css('opacity', '1')
}, 500);


$('#action_menu_btn').click(function() {
    $('.action_menu').toggle();
});

function swall(text, icon) {
    Swal.fire(
        'Thông báo!',
        text,
        icon
    )
}

function dele(text, url, data) {
    return Swal.fire({
        title: 'Bạn có chắc',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                    url: url,
                    type: 'post',
                    data: { data },
                    dataType: 'json',

                })
                // swal("xóa thành công", 'success');
        }
    })
}

function loadpage() {
    setTimeout(function() {
        window.location.reload()
    }, 2000)
}

function wrong(text, icon) {
    Swal.fire({
        icon: icon,
        title: 'Thông báo',
        text: text

    })
}

function move_url(url) {
    setTimeout(function() {
        window.location.href = url;
    }, 2000)
}
var readURL = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.avatar').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


$(".file-upload").on('change', function() {
    readURL(this);
});
var x = window.innerWidth;
if (x <= 767) {
    $('.box').addClass('order-1')
    $('.users').addClass('order-2')
}
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
    event.preventDefault();
    $(this).ekkoLightbox();
    $('.modal-dialog').css('maxWidth', '100vh')
        // $('.modal-dialog').css('height', '100vh')
});