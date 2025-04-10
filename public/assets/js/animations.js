document.addEventListener('DOMContentLoaded', function () {
    const slideInElements = document.querySelectorAll('.slide-in');
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    function checkSlideIn() {
        slideInElements.forEach(element => {
            const slideInAt = (window.scrollY + window.innerHeight) - element.clientHeight / 2;
            const elementBottom = element.offsetTop + element.clientHeight;
            const isHalfShown = slideInAt > element.offsetTop;
            const isNotScrolledPast = window.scrollY < elementBottom;

            if (isHalfShown && isNotScrolledPast) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkSlideIn);
    checkSlideIn(); // 初期表示時にもチェックを行う

    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Toggle the navbar menu on mobile
    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(function (el) {
            el.addEventListener('click', function () {
                const target = document.getElementById(el.dataset.target);
                el.classList.toggle('is-active');
                target.classList.toggle('is-active');
            });
        });
    }
});
