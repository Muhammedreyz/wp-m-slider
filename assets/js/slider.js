(function () {
    var sliders = document.querySelectorAll('[data-faal-slider]');

    sliders.forEach(function (slider) {
        var track = slider.querySelector('[data-faal-slider-track]');
        var slides = slider.querySelectorAll('[data-faal-slide]');
        var dotsContainer = slider.querySelector('[data-faal-dots]');
        var nextButton = slider.querySelector('[data-faal-next]');
        var prevButton = slider.querySelector('[data-faal-prev]');
        var progressBar = slider.querySelector('[data-faal-progress]');
        var currentEl = slider.querySelector('[data-faal-current]');
        var totalEl = slider.querySelector('[data-faal-total]');

        var autoplay = slider.dataset.autoplay !== 'false';
        var interval = parseInt(slider.dataset.interval || '5000', 10);
        var index = 0;
        var timer = null;
        var progressRaf = null;
        var startTime = null;

        if (!track || slides.length === 0 || !dotsContainer || !nextButton || !prevButton) {
            return;
        }

        function formatNumber(value) {
            return String(value).padStart(2, '0');
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

        function updateProgressByTime(time) {
            if (!progressBar || !autoplay) {
                return;
            }

            if (startTime === null) {
                startTime = time;
            }

            var elapsed = time - startTime;
            var ratio = Math.min(elapsed / interval, 1);
            progressBar.style.width = ratio * 100 + '%';
            progressRaf = window.requestAnimationFrame(updateProgressByTime);
        }

        function resetProgress() {
            if (progressBar) {
                progressBar.style.width = '0%';
            }
            startTime = null;
        }

        function updateSlides() {
            track.style.transform = 'translateX(-' + index * 100 + '%)';

            slides.forEach(function (slide, slideIndex) {
                var isActive = slideIndex === index;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
            });

            if (currentEl) {
                currentEl.textContent = formatNumber(index + 1);
            }

            if (totalEl) {
                totalEl.textContent = formatNumber(slides.length);
            }

            renderDots();
            resetProgress();
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
            if (!autoplay || slides.length < 2) {
                return;
            }

            stopAutoplay();
            timer = window.setInterval(next, interval);
            progressRaf = window.requestAnimationFrame(updateProgressByTime);
        }

        function stopAutoplay() {
            if (timer) {
                window.clearInterval(timer);
                timer = null;
            }

            if (progressRaf) {
                window.cancelAnimationFrame(progressRaf);
                progressRaf = null;
            }
        }

        function restartAutoplay() {
            resetProgress();
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

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                stopAutoplay();
                return;
            }
            restartAutoplay();
        });

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
