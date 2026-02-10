import { HeroSlider } from './HeroSlider';
import type { HeroSlide } from './types';

export const demoSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'Faal Finans',
    title: 'Paranızı Otopilot’a Bırakın, Keyfinize Bakın',
    highlightWords: ['Otopilot’a', 'Keyfinize'],
    description:
      'Yapay zekâ destekli yatırım asistanı, hedeflerinize göre portföyünüzü otomatik dengeler. Siz günlük hayatınıza odaklanırken sistem sizin için çalışır.',
    cta: { label: 'Erken Erişime Katıl', href: '/erken-erisim', variant: 'solid' },
    visual: { type: 'image', src: '/images/hero/fintech-phone-1.jpg', alt: 'Fintech mobil uygulama ekranı' },
    theme: {
      gradientFrom: '#123328',
      gradientTo: '#071510',
      accent: '#53e3ab',
      text: '#f2f8f6',
      buttonBg: '#53e3ab',
      buttonText: '#04271f',
      navBg: '#0c1f18',
      glow: '#43d39f',
    },
  },
  {
    id: 'slide-2',
    eyebrow: 'Akıllı Risk Yönetimi',
    title: 'Volatiliteyi Görür, Panik Satışı Engeller',
    highlightWords: ['Volatiliteyi', 'Engeller'],
    description:
      'Gerçek zamanlı risk metriği ile piyasa dalgalanmalarını izler, portföyü hedef risk aralığında tutarak duygusal kararları azaltır.',
    cta: { label: 'Nasıl Çalışıyor?', href: '/nasil-calisiyor', variant: 'outline' },
    visual: { type: 'image', src: '/images/hero/fintech-dashboard-2.jpg', alt: 'Risk analizi dashboard ekranı' },
    theme: {
      gradientFrom: '#102f26',
      gradientTo: '#06120f',
      accent: '#66f2ba',
      text: '#f3f9f7',
      buttonBg: '#66f2ba',
      buttonText: '#05261e',
      navBg: '#0b1c16',
      glow: '#58dfac',
    },
  },
  {
    id: 'slide-3',
    eyebrow: 'Kişiselleştirilmiş',
    title: 'Hedefinize Özel Strateji, Tek Panelde Net Görünüm',
    highlightWords: ['Özel', 'Net'],
    description:
      'Ev, eğitim veya emeklilik gibi her hedef için ayrı yatırım kuralı oluşturun. Tüm performansı tek bir premium panelden anlık takip edin.',
    cta: { label: 'Demo Talep Et', href: '/demo', variant: 'solid' },
    visual: {
      type: 'video',
      src: '/videos/hero/portfolio-flow.mp4',
      poster: '/images/hero/portfolio-poster.jpg',
      muted: true,
      loop: true,
    },
    theme: {
      gradientFrom: '#15382e',
      gradientTo: '#071610',
      accent: '#7df5c7',
      text: '#effcf6',
      buttonBg: '#7df5c7',
      buttonText: '#04271f',
      navBg: '#0c2018',
      glow: '#69e6b9',
    },
  },
  {
    id: 'slide-4',
    eyebrow: 'Şeffaf Ücret',
    title: 'Gizli Maliyet Yok, Her Hamle Anlaşılır',
    highlightWords: ['Gizli', 'Anlaşılır'],
    description:
      'İşlem ücretleri, dağılım ve getiri katkısı kalem kalem görünür. Finansal kararlarınızı net verilerle güvenle alın.',
    cta: { label: 'Ücret Modelini İncele', href: '/ucretler', variant: 'outline' },
    visual: { type: 'image', src: '/images/hero/fintech-fees-4.jpg', alt: 'Şeffaf ücret tablosu ekranı' },
    theme: {
      gradientFrom: '#143127',
      gradientTo: '#07130f',
      accent: '#5beab1',
      text: '#f3fbf8',
      buttonBg: '#5beab1',
      buttonText: '#04241d',
      navBg: '#0b1c16',
      glow: '#48dba1',
    },
  },
  {
    id: 'slide-5',
    eyebrow: 'Premium Deneyim',
    title: 'Yatırımınız İçin Stripe Düzeyinde Akıcı Arayüz',
    highlightWords: ['Premium', 'Akıcı'],
    description:
      'Minimal, hızlı ve odaklı tasarım sayesinde finansal verilerinizi karmaşa olmadan yönetin. Tüm deneyim mobilde de aynı kaliteyi sunar.',
    cta: { label: 'Hemen Başla', href: '/kayit', variant: 'solid' },
    visual: { type: 'image', src: '/images/hero/fintech-mobile-5.jpg', alt: 'Premium mobil yatırım arayüzü' },
    theme: {
      gradientFrom: '#163a2f',
      gradientTo: '#06130f',
      accent: '#70f0bf',
      text: '#f5fbf9',
      buttonBg: '#70f0bf',
      buttonText: '#032118',
      navBg: '#0a1c16',
      glow: '#57dba8',
    },
  },
];

export default function HeroSliderExample() {
  return (
    <main className="min-h-screen bg-[#040b09] p-4 md:p-8">
      <HeroSlider slides={demoSlides} autoPlay intervalMs={5500} showNav helperText="Aşağı Kaydır" />
    </main>
  );
}
