// index.htmlの読み込み後、ページ内リンク、表示アニメーション、モバイルナビゲーションを初期化します。
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
            // offsetTopは親要素基準なので使わず、入れ子も同じ画面座標で判定します。
            // 復元位置より上の要素も表示し、リロード後に透明なまま残さないようにします。
            if (element.getBoundingClientRect().top < window.innerHeight) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkSlideIn, { passive: true });
    window.addEventListener('resize', checkSlideIn);
    window.addEventListener('load', checkSlideIn);
    window.addEventListener('pageshow', checkSlideIn);
    checkSlideIn(); // 初期表示時にもチェックを行う

    let navigationFrame = null;

    function stopNavigationScroll() {
        if (navigationFrame !== null) {
            window.cancelAnimationFrame(navigationFrame);
            navigationFrame = null;
        }
    }

    function scrollToSection(target) {
        const start = window.scrollY;
        const margin = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const destination = Math.max(0, Math.min(maxScroll, start + target.getBoundingClientRect().top - margin));
        const distance = destination - start;
        const duration = Math.min(1000, Math.max(700, Math.abs(distance) * 0.18));
        const startTime = window.performance.now();

        function step(now) {
            const progress = Math.max(0, Math.min(1, (now - startTime) / duration));
            const eased = progress * progress * (3 - 2 * progress);
            window.scrollTo({ top: start + distance * eased, behavior: 'instant' });

            if (progress < 1) {
                navigationFrame = window.requestAnimationFrame(step);
                return;
            }

            navigationFrame = null;
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
        }

        navigationFrame = window.requestAnimationFrame(step);
    }

    // 読み手の操作が入ったら、進行中のナビゲーションスクロールを止めます。
    for (const eventName of ['wheel', 'touchstart', 'keydown', 'popstate']) {
        window.addEventListener(eventName, stopNavigationScroll, { passive: true });
    }

    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
            }
            const hash = anchor.getAttribute('href');
            const target = document.getElementById(hash.slice(1));
            if (!target) {
                return;
            }

            stopNavigationScroll();
            target.classList.add('visible');
            target.querySelectorAll('.slide-in').forEach(element => element.classList.add('visible'));

            navbarBurgers.forEach(burger => {
                if (burger.getAttribute('aria-expanded') === 'true') {
                    burger.click();
                }
            });

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return;
            }
            event.preventDefault();
            if (window.location.hash !== hash) {
                window.history.pushState(null, '', hash);
            }
            scrollToSection(target);
        });
    });

    // Toggle the navbar menu on mobile
    if (navbarBurgers.length > 0) {
        navbarBurgers.forEach(function (el) {
            el.addEventListener('click', function () {
                const target = document.getElementById(el.dataset.target);
                if (!target) {
                    return;
                }

                const isExpanded = el.classList.toggle('is-active');
                target.classList.toggle('is-active', isExpanded);
                el.setAttribute('aria-expanded', String(isExpanded));
            });
        });
    }
});
