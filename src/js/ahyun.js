$(document).ready(function () {
    $("#footer-image").click(function (event) {
        event.preventDefault(); // 기본 동작 방지 (필요한 경우)
        $("html, body").animate({ scrollTop: 0 }, 100, "swing"); // 800ms 동안 부드럽게 올라감
    });
});