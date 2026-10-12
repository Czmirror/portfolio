document.addEventListener('DOMContentLoaded', function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('js');
    if (!prefersReducedMotion) {
        document.documentElement.classList.add('motion-ok');
    }

    const slideInElements = document.querySelectorAll('.slide-in');
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    function checkSlideIn() {
        if (prefersReducedMotion) {
            slideInElements.forEach(element => element.classList.add('visible'));
            return;
        }

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
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) {
                return;
            }

            e.preventDefault();
            target.classList.add('visible');
            target.querySelectorAll('.slide-in').forEach(element => element.classList.add('visible'));

            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
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
