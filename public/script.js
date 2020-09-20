console.log("script connected");
$(function () {
    $(document).scroll(function () {
        var $nav = $("#MainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
});
