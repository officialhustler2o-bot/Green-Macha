document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("js-ready");

    var navbar = document.querySelector(".navbar");
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    var navLinks = nav ? nav.querySelectorAll("a") : [];
    var form = document.getElementById("contact-form");
    var formNote = document.getElementById("form-note");

    function closeMenu() {
        if (!navbar || !toggle) {
            return;
        }
        navbar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
        navbar.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Close menu");
    }

    if (toggle && navbar) {
        toggle.addEventListener("click", function () {
            if (navbar.classList.contains("is-open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.14,
            rootMargin: "0px 0px -40px 0px"
        });

        document.querySelectorAll(".reveal").forEach(function (el) {
            observer.observe(el);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    if (form && formNote) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                formNote.textContent = "Please complete your name, email, and message.";
                return;
            }

            form.reset();
            formNote.textContent = "Thank you. This form is a preview and is not sending messages yet.";
        });
    }

    console.log("Green Macha website loaded successfully!");
});
