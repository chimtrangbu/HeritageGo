$(".toggle-password").click(function () {
        $(this).toggleClass("fa-unlock fa-unlock-alt");
        var input = $($(this).attr("toggle"));
        if (input.attr("type") === "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });