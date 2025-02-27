
$(document).ready(function () {
    let expanded = false;
    $('#ins').on("click", function () {
        if (expanded == false) {
            $('#ins').css({
                "height": '15vh'
            })
            expanded = true;
        } else {
            $('#ins').css({
                "height": '5vh'
            })

            expanded = false;
        }

    })
})
