(function(b, a) {
    var c = function(l) {
        if (!(this instanceof c)) {
            return new c(l)
        }
        var n = this;
        var i = {
            radius: "50%",
            theme_color: "rgba(31,45,61,.11)",
            theme_content_color: "#fff",
            font_size: "18px",
            width_height: "80px",
            margin_screen_x: "30px",
            margin_screen_y: "30px",
            margin_li: "10px",
            animation: "slide-in",
            position: "right-bottom",
            icon_css_path: "",
            btn_config: [{}]
        };
        var g = i;
        var r = a.querySelector(":root");
        var j;
        var o;
        n._init = function() {
            if (!s()) {
                return
            }
            r.style.setProperty("--fm-margin-li", g.margin_li);
            r.style.setProperty("--fm-width-height", g.width_height);
            r.style.setProperty("--fm-theme-color", g.theme_color);
            r.style.setProperty("--fm-theme-content-color", g.theme_content_color);
            r.style.setProperty("--fm-font-size", g.font_size);
            r.style.setProperty("--fm-border-radius", g.radius);
            r.style.setProperty("--fm-margin-screen-x", g.margin_screen_x);
            r.style.setProperty("--fm-margin-screen-y", g.margin_screen_y);
            r.style.setProperty("", g.width_height);
            h();
            j = a.getElementsByClassName("fm-ul")[0];
            o = a.getElementsByClassName("fm-ul-component")[0].children;
            j.classList.add("fm-" + g.animation);
            p(g.position);
            k();
            setTimeout(function() {
                j.style.opacity = 1
            }, 251)
        }
        ;
        n._show = function() {
            j.style.visibility = "visible";
            j.style.opacity = 1
        }
        ;
        n._hide = function() {
            j.style.opacity = 0;
            setTimeout(function() {
                j.style.visibility = "hidden"
            }, 1000)
        }
        ;
        function h() {
            if (typeof g.btn_config == "object" && g.btn_config != null) {
                var u = g.btn_config;
                var w = '<li class="fm-li-main"><div class="fm-li-content"><div class="fm-content"><span><i class="' + u[0].icon + '"></i></span></div></div></li>';
                var x = '<ul class="fm-ul-component">';
                for (var t = 1; t < u.length; t++) {
                    x += '<li class="fm-li"><div class="fm-li-content"><div class="fm-li-title"><span class="fm-li-title-text">' + u[t].title + '</span></div><div class="fm-content"><span><i class="' + u[t].icon + '"></i></span></div></div></li>'
                }
                x += "</ul>";
                var v = a.createElement("ul");
                v.classList.add("fm-ul");
                v.style.opacity = 0;
                v.innerHTML = w + x;
                a.body.appendChild(v)
            }
        }
        function p(t) {
            m(t);
            var v = parseInt(g.margin_li) + parseInt(g.width_height);
            for (var u = 0; u < g.num; u++) {
                if (g.animation == "slide-in" || g.animation == "spring-in") {
                    if (t.indexOf("right") != -1) {
                        o[u].style.right = g.margin_screen_x
                    } else {
                        o[u].style.left = g.margin_screen_x
                    }
                    if (t.indexOf("bottom") != -1) {
                        o[u].style.bottom = g.margin_screen_y;
                        r.style.setProperty("--fm-destination-nth-" + (u + 1) + "-y", (-v * (u + 1)) + "px")
                    } else {
                        o[u].style.top = g.margin_screen_y;
                        r.style.setProperty("--fm-destination-nth-" + (u + 1) + "-y", (v * (u + 1)) + "px")
                    }
                } else {
                    if (g.animation == "zoom-in") {
                        var w = parseInt(g.margin_screen_y);
                        if (t.indexOf("right") != -1) {
                            o[u].style.right = g.margin_screen_x
                        } else {
                            o[u].style.left = g.margin_screen_x
                        }
                        if (t.indexOf("bottom") != -1) {
                            o[u].style.bottom = w + (v * (u + 1)) + "px"
                        } else {
                            o[u].style.top = w + (v * (u + 1)) + "px"
                        }
                    }
                }
            }
        }
        function m(t) {
            if (t.indexOf("right") != -1) {
                j.style.right = g.margin_screen_x
            } else {
                j.style.left = g.margin_screen_x
            }
            if (t.indexOf("bottom") != -1) {
                j.style.bottom = g.margin_screen_y
            } else {
                j.style.top = g.margin_screen_y
            }
            var u = a.getElementsByClassName("fm-li-title");
            var w = parseInt(g.width_height) + parseInt(g.margin_li) + 14;
            for (var v = 0; v < u.length; v++) {
                if (t.indexOf("right") != -1) {
                    u[v].style.right = w + "px";
                    u[v].classList.add("fm-title-right")
                } else {
                    u[v].style.left = w + "px";
                    u[v].classList.add("fm-title-left")
                }
            }
        }
        function k() {
            var u = a.getElementsByClassName("fm-li-main")[0];
            u.addEventListener("mouseenter", f);
            u.addEventListener("mouseleave", function(v) {
                d(j)
            });
            for (var t = 0; t < o.length; t++) {
                o[t].addEventListener("mouseenter", f);
                o[t].addEventListener("mouseleave", d);
                o[t].addEventListener("click", g.btn_config[t + 1].click)
            }
        }
        function f() {
            j.setAttribute("data-fm-state", "open")
        }
        function d() {
            // j.setAttribute("data-fm-state", "close")
        }
        function s() {
            var t = true;
            if (l instanceof Object) {
                if (l.btn_config == null || typeof l.btn_config != "object" || l.btn_config.length > 5) {
                    t = false
                }
                g = e({}, i, l);
                g.num = g.btn_config.length - 1
            } else {
                if (typeof (l) == "string") {} else {
                    t = false
                }
            }
            return t
        }
        function e() {
            var v = arguments.length;
            var x = arguments[0] || {};
            if (typeof x != "object" && typeof x != "function") {
                x = {}
            }
            if (v == 1) {
                x = this;
                u--
            }
            for (var u = 1; u < v; u++) {
                var w = arguments[u];
                for (var t in w) {
                    if (Object.prototype.hasOwnProperty.call(w, t)) {
                        x[t] = w[t]
                    }
                }
            }
            return x
        }
        n._init();
        return {
            show: n._show,
            hide: n._hide
        }
    };
    b.FloatModule = c
}(window, document));