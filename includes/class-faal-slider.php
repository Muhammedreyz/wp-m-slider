<?php

if (! defined('ABSPATH')) {
    exit;
}

class Faal_Slider
{
    private const OPTION_SLIDES = 'faal_slider_slides';
    private const ADMIN_PAGE_SLUG = 'faal-slider';

    public static function init(): void
    {
        add_action('wp_enqueue_scripts', [__CLASS__, 'enqueue_assets']);
        add_action('admin_menu', [__CLASS__, 'register_admin_menu']);
        add_action('admin_init', [__CLASS__, 'register_settings']);
        add_action('admin_enqueue_scripts', [__CLASS__, 'enqueue_admin_assets']);

        add_shortcode('faal_slider', [__CLASS__, 'render_shortcode']);
    }

    public static function enqueue_assets(): void
    {
        wp_register_style('faal-slider', plugins_url('../assets/css/slider.css', __FILE__), [], '1.1.0');

        wp_register_script('faal-slider', plugins_url('../assets/js/slider.js', __FILE__), [], '1.1.0', true);
    }

    public static function enqueue_admin_assets(string $hook): void
    {
        if ($hook !== 'toplevel_page_' . self::ADMIN_PAGE_SLUG) {
            return;
        }

        wp_enqueue_style('faal-slider-admin', plugins_url('../assets/css/admin.css', __FILE__), [], '1.1.0');
        wp_enqueue_script('faal-slider-admin', plugins_url('../assets/js/admin.js', __FILE__), [], '1.1.0', true);
    }

    public static function register_admin_menu(): void
    {
        add_menu_page(
            __('Faal Slider', 'faal-slider'),
            __('Faal Slider', 'faal-slider'),
            'manage_options',
            self::ADMIN_PAGE_SLUG,
            [__CLASS__, 'render_admin_page'],
            'dashicons-images-alt2',
            58
        );
    }

    public static function register_settings(): void
    {
        register_setting(
            'faal_slider_group',
            self::OPTION_SLIDES,
            [
                'type' => 'array',
                'sanitize_callback' => [__CLASS__, 'sanitize_slides_option'],
                'default' => self::get_default_slides(),
            ]
        );
    }

    /**
     * @param mixed $value
     * @return array<int, array<string, string>>
     */
    public static function sanitize_slides_option($value): array
    {
        if (! is_array($value)) {
            return self::get_default_slides();
        }

        $sanitized = [];

        foreach ($value as $slide) {
            if (! is_array($slide)) {
                continue;
            }

            $title = sanitize_text_field($slide['title'] ?? '');
            $description = sanitize_textarea_field($slide['description'] ?? '');

            if ($title === '' || $description === '') {
                continue;
            }

            $sanitized[] = [
                'eyebrow' => sanitize_text_field($slide['eyebrow'] ?? ''),
                'title' => $title,
                'description' => $description,
                'button_text' => sanitize_text_field($slide['button_text'] ?? ''),
                'button_url' => esc_url_raw($slide['button_url'] ?? ''),
            ];
        }

        return $sanitized ?: self::get_default_slides();
    }

    public static function render_admin_page(): void
    {
        if (! current_user_can('manage_options')) {
            return;
        }

        $slides = self::get_slides();
        ?>
        <div class="wrap faal-slider-admin">
            <h1><?php esc_html_e('Faal Slider Yönetimi', 'faal-slider'); ?></h1>
            <p><?php esc_html_e('Slider içeriklerini buradan ekleyip çıkarabilirsiniz. Ön yüzde göstermek için sayfaya [faal_slider] shortcode ekleyin.', 'faal-slider'); ?></p>

            <form action="options.php" method="post">
                <?php settings_fields('faal_slider_group'); ?>

                <div id="faal-slider-rows" class="faal-slider-admin__rows">
                    <?php foreach ($slides as $index => $slide) : ?>
                        <?php self::render_slide_fields($index, $slide); ?>
                    <?php endforeach; ?>
                </div>

                <p>
                    <button type="button" class="button button-secondary" id="faal-slider-add-row">
                        <?php esc_html_e('Yeni Slide Ekle', 'faal-slider'); ?>
                    </button>
                </p>

                <?php submit_button(__('Değişiklikleri Kaydet', 'faal-slider')); ?>
            </form>

            <template id="faal-slider-template">
                <?php self::render_slide_fields(999999, [
                    'eyebrow' => '',
                    'title' => '',
                    'description' => '',
                    'button_text' => '',
                    'button_url' => '',
                ]); ?>
            </template>
        </div>
        <?php
    }

    /**
     * @param array<string, string> $slide
     */
    private static function render_slide_fields(int $index, array $slide): void
    {
        ?>
        <fieldset class="faal-slider-admin__card" data-slide-row>
            <legend><?php echo esc_html(sprintf(__('Slide #%d', 'faal-slider'), $index + 1)); ?></legend>

            <label>
                <?php esc_html_e('Üst Başlık (Eyebrow)', 'faal-slider'); ?>
                <input type="text" name="<?php echo esc_attr(self::OPTION_SLIDES . '[' . $index . '][eyebrow]'); ?>" value="<?php echo esc_attr($slide['eyebrow'] ?? ''); ?>" class="regular-text" />
            </label>

            <label>
                <?php esc_html_e('Başlık', 'faal-slider'); ?>
                <input type="text" name="<?php echo esc_attr(self::OPTION_SLIDES . '[' . $index . '][title]'); ?>" value="<?php echo esc_attr($slide['title'] ?? ''); ?>" class="regular-text" required />
            </label>

            <label>
                <?php esc_html_e('Açıklama', 'faal-slider'); ?>
                <textarea name="<?php echo esc_attr(self::OPTION_SLIDES . '[' . $index . '][description]'); ?>" rows="3" class="large-text" required><?php echo esc_textarea($slide['description'] ?? ''); ?></textarea>
            </label>

            <div class="faal-slider-admin__row-grid">
                <label>
                    <?php esc_html_e('Buton Metni', 'faal-slider'); ?>
                    <input type="text" name="<?php echo esc_attr(self::OPTION_SLIDES . '[' . $index . '][button_text]'); ?>" value="<?php echo esc_attr($slide['button_text'] ?? ''); ?>" class="regular-text" />
                </label>

                <label>
                    <?php esc_html_e('Buton Linki', 'faal-slider'); ?>
                    <input type="url" name="<?php echo esc_attr(self::OPTION_SLIDES . '[' . $index . '][button_url]'); ?>" value="<?php echo esc_attr($slide['button_url'] ?? ''); ?>" class="regular-text" />
                </label>
            </div>

            <p>
                <button type="button" class="button-link-delete" data-remove-row>
                    <?php esc_html_e('Bu Slide\'ı Sil', 'faal-slider'); ?>
                </button>
            </p>
        </fieldset>
        <?php
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

        $slides = self::get_slides();

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
                                <?php if (! empty($slide['eyebrow'])) : ?>
                                    <p class="faal-slider__eyebrow"><?php echo esc_html($slide['eyebrow']); ?></p>
                                <?php endif; ?>
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
    private static function get_slides(): array
    {
        $saved = get_option(self::OPTION_SLIDES, []);

        if (! is_array($saved) || empty($saved)) {
            return self::get_default_slides();
        }

        $slides = self::sanitize_slides_option($saved);

        return $slides ?: self::get_default_slides();
    }

    /**
     * @return array<int, array<string, string>>
     */
    private static function get_default_slides(): array
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
