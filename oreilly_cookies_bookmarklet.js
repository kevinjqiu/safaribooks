(function () {
    var allowed = {
        "_vwo_uuid_v2": true,
        "csrftoken": true,
        "_abck": true,
        "orm-jwt": true,
        "orm-rt": true,
        "bm_so": true,
        "bm_sz": true,
        "bm_lso": true,
        "bm_s": true,
        "bm_ss": true,
        "akaalb_LearningALB": true
    };

    function parseCookies() {
        var cookies = {};
        var parts = document.cookie ? document.cookie.split(/;\s*/) : [];
        for (var i = 0; i < parts.length; i += 1) {
            var part = parts[i];
            var separator = part.indexOf("=");
            if (separator === -1) {
                continue;
            }

            var name = decodeURIComponent(part.slice(0, separator));
            if (!allowed[name]) {
                continue;
            }

            cookies[name] = decodeURIComponent(part.slice(separator + 1));
        }

        return cookies;
    }

    function showFallback(text) {
        window.prompt("Copy this JSON into cookies.json", text);
    }

    if (!/(^|\.)oreilly\.com$/.test(window.location.hostname)) {
        window.alert("Open this bookmarklet on learning.oreilly.com or oreilly.com after logging in.");
        return;
    }

    var cookies = parseCookies();
    var text = JSON.stringify(cookies, null, 2);
    var missingJwt = !cookies["orm-jwt"];
    var successMessage = missingJwt
        ? "Copied cookies JSON, but orm-jwt was not visible in document.cookie. If this does not work, use retrieve_cookies.py instead."
        : "Copied cookies JSON to the clipboard.";

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
            window.alert(successMessage);
        }).catch(function () {
            showFallback(text);
        });
        return;
    }

    showFallback(text);
}());
