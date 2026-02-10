<?php

if (! defined('ABSPATH')) {
    exit;
}

class Faal_Slider
{
    public static function init(): void
    {
        add_action('wp_enqueue_scripts', [__CLASS__, 'enqueue_assets']);
        add_shortcode('faal_slider', [__CLASS__, 'render_shortcode']);
    }

    public static function enqueue_assets(): void
    {
        wp_register_style(
            'faal-slider',
            plugins_url('../assets/css/slider.css', __FILE__),
            [],
            '1.0.0'
        );

        wp_register_script(
            'faal-slider',
            plugins_url('../assets/js/slider.js', __FILE__),
            [],
            '1.0.0',
            true
        );
    }

    public static function render_shortcode(array $atts = []): string
    {
        $atts = shortcode_atts(
            [
                'autoplay' => 'true',
                'interval' => '5000',
            ],
            $atts,
            'faal_slider'
        );

        wp_enqueue_style('faal-slider');
        wp_enqueue_script('faal-slider');

        $slides = self::get_demo_slides();

        ob_start();
        ?>
        <section
            class="faal-slider"
            data-faal-slider
            data-autoplay="<?php echo esc_attr($atts['autoplay']); ?>"
            data-interval="<?php echo esc_attr($atts['interval']); ?>"
            aria-roledescription="carousel"
            aria-label="<?php esc_attr_e('Faal slider', 'faal-slider'); ?>"
        >
            <div class="faal-slider__viewport" data-faal-slider-viewport>
                <div class="faal-slider__track" data-faal-slider-track>
                    <?php foreach ($slides as $index => $slide) : ?>
                        <article
                            class="faal-slider__slide<?php echo $index === 0 ? ' is-active' : ''; ?>"
                            data-faal-slide
                            aria-hidden="<?php echo $index === 0 ? 'false' : 'true'; ?>"
                        >
                            <div class="faal-slider__content">
                                <p class="faal-slider__eyebrow"><?php echo esc_html($slide['eyebrow']); ?></p>
                                <h2 class="faal-slider__title"><?php echo esc_html($slide['title']); ?></h2>
                                <p class="faal-slider__description"><?php echo esc_html($slide['description']); ?></p>
                                <?php if (! empty($slide['button_text']) && ! empty($slide['button_url'])) : ?>
                                    <a class="faal-slider__button" href="<?php echo esc_url($slide['button_url']); ?>">
                                        <?php echo esc_html($slide['button_text']); ?>
                                    </a>
                                <?php endif; ?>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="faal-slider__controls">
                <button class="faal-slider__nav" data-faal-prev type="button" aria-label="<?php esc_attr_e('Previous slide', 'faal-slider'); ?>">&#8592;</button>
                <div class="faal-slider__dots" data-faal-dots role="tablist" aria-label="<?php esc_attr_e('Slide navigation', 'faal-slider'); ?>"></div>
                <button class="faal-slider__nav" data-faal-next type="button" aria-label="<?php esc_attr_e('Next slide', 'faal-slider'); ?>">&#8594;</button>
            </div>
        </section>
        <?php

        return (string) ob_get_clean();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private static function get_demo_slides(): array
    {
        return [
            [
                'eyebrow' => __('Faal App', 'faal-slider'),
                'title' => __('Modern WordPress Slider', 'faal-slider'),
                'description' => __('Figma tasarımını piksel hassasiyetinde hayata geçirmek için hızlı bir başlangıç bileşeni.', 'faal-slider'),
                'button_text' => __('İncele', 'faal-slider'),
                'button_url' => '#',
            ],
            [
                'eyebrow' => __('Performans', 'faal-slider'),
                'title' => __('Erişilebilir ve hafif yapı', 'faal-slider'),
                'description' => __('Klavye navigasyonu, aria etiketleri ve otomatik oynatma kontrolü ile üretim hazır bir slider.', 'faal-slider'),
                'button_text' => __('Detaylar', 'faal-slider'),
                'button_url' => '#',
            ],
            [
                'eyebrow' => __('Responsive', 'faal-slider'),
                'title' => __('Tüm cihazlarda uyumlu', 'faal-slider'),
                'description' => __('Mobil, tablet ve masaüstü kırılımlarında dengeli görünüm için optimize edildi.', 'faal-slider'),
                'button_text' => __('Başla', 'faal-slider'),
                'button_url' => '#',
            ],
        ];
    }
}
