(function () {
    var sliders = document.querySelectorAll('[data-faal-slider]');

    sliders.forEach(function (slider) {
        var track = slider.querySelector('[data-faal-slider-track]');
        var slides = slider.querySelectorAll('[data-faal-slide]');
        var dotsContainer = slider.querySelector('[data-faal-dots]');
        var nextButton = slider.querySelector('[data-faal-next]');
        var prevButton = slider.querySelector('[data-faal-prev]');
        var autoplay = slider.dataset.autoplay !== 'false';
        var interval = parseInt(slider.dataset.interval, 10) || 5000;
        var index = 0;
        var timer = null;

        if (!track || slides.length === 0 || !dotsContainer || !nextButton || !prevButton) {
            return;
        }

        function renderDots() {
            dotsContainer.innerHTML = '';

            slides.forEach(function (_, dotIndex) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'faal-slider__dot' + (dotIndex === index ? ' is-active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (dotIndex + 1));
                dot.addEventListener('click', function () {
                    goTo(dotIndex);
                    restartAutoplay();
                });
                dotsContainer.appendChild(dot);
            });
        }

        function updateSlides() {
            track.style.transform = 'translateX(-' + index * 100 + '%)';

            slides.forEach(function (slide, slideIndex) {
                var isActive = slideIndex === index;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });

            renderDots();
        }

        function goTo(newIndex) {
            if (newIndex < 0) {
                index = slides.length - 1;
            } else if (newIndex >= slides.length) {
                index = 0;
            } else {
                index = newIndex;
            }

            updateSlides();
        }

        function next() {
            goTo(index + 1);
        }

        function prev() {
            goTo(index - 1);
        }

        function startAutoplay() {
            if (!autoplay) {
                return;
            }

            stopAutoplay();
            timer = window.setInterval(next, interval);
        }

        function stopAutoplay() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }
        }

        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        nextButton.addEventListener('click', function () {
            next();
            restartAutoplay();
        });

        prevButton.addEventListener('click', function () {
            prev();
            restartAutoplay();
        });

        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        slider.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight') {
                next();
                restartAutoplay();
            }

            if (event.key === 'ArrowLeft') {
                prev();
                restartAutoplay();
            }
        });

        updateSlides();
        startAutoplay();
    });
})();
