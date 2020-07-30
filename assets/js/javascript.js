mybutton = document.getElementById("myBtn");
let progress = document.getElementById('progress')
let total_height = document.body.scrollHeight - window.innerHeight
window.onscroll = function() {
    scrollFunction()

    let progress_height = (window.pageYOffset / total_height) * 200
    progress.style.height = progress_height + "%"
}




function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {


        mybutton.style.display = "block";
        document.getElementById('open_chat').style.right = '80px';
        document.getElementsByClassName('navbar')[0].classList.add('fixed-top');
    } else {
        mybutton.style.display = "none";
        document.getElementById('open_chat').style.right = '40px';
        document.getElementsByClassName('navbar')[0].classList.remove('fixed-top');
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
var chatbox = document.getElementById("text"),
    shiftPressed = false,
    enterPressed = false
check_submit = false
    // listen for the user to press a key
chatbox.addEventListener("keydown", function(e) {
    // check if the shift key was pressed and say if it was
    if (e.shiftKey) shiftPressed = true;
    // check if the enter key was pressed
    if (e.keyCode == 13) {
        // prevent the enter key from putting in a new line. If shift it pressed, it will be manually added later
        e.preventDefault();
        // say that the enter key was pressed
        enterPressed = true;
    }
});
// listen for the user to let go of a key
chatbox.addEventListener("keyup", function(e) {
    // check if the shift key or enter key was released
    if (e.shiftKey || e.keyCode == 13) {
        // check if the enter key was pressed, and if it wasn't, then reset the shift pressed value because it was only shift that was pressed
        if (!enterPressed) shiftPressed = false;
        // enter was pressed, so move on
        else {
            // make sure that shift wasn't pressed along with enter
            if (!shiftPressed) {
                // get the input from the chatbox and define if the chatbox should be cleared
                var input = chatbox.value;

                // prevent the enter key from being typed into the chatbox
                e.preventDefault();

                // run you custom code here!
                // alert("You submitted this:\n" + input);
                document.getElementById('btn-chat').click();

                // check_submit = true;
                // clear the chatbox
                chatbox.value = "";

                // reset the value
                enterPressed = false;
                // shift and enter was pressed, so move on
            } else {
                // shift + enter was pressed, so put in a new line
                chatbox.value += "\n";
                document.getElementById('btn-chat').click();
                // reset the values and let the enter key get pressed
                enterPressed = false, shiftPressed = false;
            }
        }
    }

});
document.getElementById('send_file').onclick = function(){
    document.getElementById('img_chat').style.display = 'block'
    document.getElementById('img_chat').click()
    document.getElementById('fix').style.width = '7%';
}

// alert(localStorage.getItem('open'));