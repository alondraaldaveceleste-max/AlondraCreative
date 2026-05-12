import { useState, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  Menu, 
  X, 
  Mail, 
  CheckCircle2,
  Globe,
  Layout,
  Code,
  Smartphone,
  ExternalLink,
  Instagram,
  ArrowUp
} from 'lucide-react';

// --- Types ---
type Page = 'inicio' | 'servicios' | 'portafolio' | 'precios' | 'sobre-mi' | 'contacto' | 'beauty-studio' | 'coffee-shop' | 'fashion-store';
type Lang = 'es' | 'en' | 'pt';

// --- Translations ---
const translations = {
  es: {
    nav: { inicio: 'Inicio', servicios: 'Servicios', portafolio: 'Portafolio', precios: 'Precios', sobreMi: 'Sobre Mí', contacto: 'Contacto' },
    hero: { title: 'Modern and responsive websites for businesses', subtitle: 'Diseños que impulsan tu marca al siguiente nivel.', cta: 'Ver proyectos' },
    services: { 
      title: 'Servicios', 
      s1: { title: 'Landing Pages', desc: 'Páginas de alta conversión para tus productos.' },
      s2: { title: 'Diseño Web Moderno', desc: 'Estética limpia y profesional para tu negocio.' },
      s3: { title: 'Responsive Design', desc: 'Optimizado con HTML, CSS & JavaScript para todo dispositivo.' }
    },
    portfolio: { 
      title: 'Portafolio', 
      btn: 'Ver Portafolio',
      p1: 'Beauty Studio', 
      p2: 'Coffee Shop Website', 
      p3: 'Fashion Store',
      back: 'Volver al Portafolio',
      details: {
        'beauty-studio': { title: 'Beauty Studio', desc: 'Un diseño elegante y minimalista para un estudio de belleza moderno. Enfocado en la calma y el profesionalismo.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000' },
        'coffee-shop': { title: 'Coffee Shop Website', desc: 'Web cálida y acogedora para una cafetería artesanal. Incluye menú dinámico y contacto directo.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000' },
        'fashion-store': { title: 'Fashion Store', desc: 'Tienda de moda con estilo contemporáneo. Galería de productos optimizada para móviles.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000' }
      }
    },
    pricing: { 
      title: 'Precios',
      basic: { name: 'Básico', price: '15', features: ['1 sección moderna', 'Diseño responsive', 'Botón de contacto', 'Colores personalizados', 'Entrega rápida'] },
      std: { name: 'Estándar', price: '45', features: ['Hasta 4 secciones', 'Diseño moderno y elegante', 'Animaciones suaves', 'Modo claro y oscuro', 'Responsive para celular', 'SEO básico'] },
      premium: { name: 'Premium', price: '90', features: ['Varias secciones', 'Diseño premium', 'Galería de imágenes', 'Animaciones avanzadas', 'Formulario de contacto', 'Optimización móvil', 'Personalización completa'] },
      extras: { title: 'Extras', e1: 'Entrega rápida ($10)', e2: 'Animaciones extra ($15)', e3: 'Más página ($20)', e4: 'Dark mode ($10)' },
      cta: 'Contactar'
    },
    about: { title: 'Sobre Mí', bio: 'Hi! I\'m Alondra, a beginner web designer passionate about creating modern and responsive websites. I enjoy building creative and user-friendly designs.' },
    contact: { title: 'Contacto', email: 'jeffloxmax@gmail.com', fiverr: '@alojeff' }
  },
  en: {
    nav: { inicio: 'Home', servicios: 'Services', portafolio: 'Portfolio', precios: 'Pricing', sobreMi: 'About Me', contacto: 'Contact' },
    hero: { title: 'Modern and responsive websites for businesses', subtitle: 'Creative designs that take your brand to the next level.', cta: 'View projects' },
    services: { 
      title: 'Services', 
      s1: { title: 'Landing Pages', desc: 'High-converting pages for your products.' },
      s2: { title: 'Modern Web Design', desc: 'Clean and professional aesthetics for your business.' },
      s3: { title: 'Responsive Design', desc: 'HTML, CSS & JavaScript optimized for any device.' }
    },
    portfolio: { 
      title: 'Portfolio', 
      btn: 'View Portfolio',
      p1: 'Beauty Studio', 
      p2: 'Coffee Shop Website', 
      p3: 'Fashion Store',
      back: 'Back to Portfolio',
      details: {
        'beauty-studio': { title: 'Beauty Studio', desc: 'An elegant and minimalist design for a modern beauty studio. Focused on calm and professionalism.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000' },
        'coffee-shop': { title: 'Coffee Shop Website', desc: 'Warm and cozy web for a craft coffee shop. Includes dynamic menu and direct contact.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000' },
        'fashion-store': { title: 'Fashion Store', desc: 'Fashion store with contemporary style. Product gallery optimized for mobile.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000' }
      }
    },
    pricing: { 
      title: 'Pricing',
      basic: { name: 'Basic', price: '15', features: ['1 modern section', 'Responsive design', 'Contact button', 'Custom colors', 'Fast delivery'] },
      std: { name: 'Standard', price: '45', features: ['Up to 4 sections', 'Modern & elegant design', 'Smooth animations', 'Light & Dark mode', 'Mobile responsive', 'Basic SEO'] },
      premium: { name: 'Premium', price: '90', features: ['Multiple sections', 'Premium design', 'Image gallery', 'Advanced animations', 'Contact form', 'Mobile optimization', 'Full customization'] },
      extras: { title: 'Extras', e1: 'Fast delivery ($10)', e2: 'Extra animations ($15)', e3: 'Extra page ($20)', e4: 'Dark mode ($10)' },
      cta: 'Contact'
    },
    about: { title: 'About Me', bio: 'Hi! I\'m Alondra, a beginner web designer passionate about creating modern and responsive websites. I enjoy building creative and user-friendly designs.' },
    contact: { title: 'Contact', email: 'jeffloxmax@gmail.com', fiverr: '@alojeff' }
  },
  pt: {
    nav: { inicio: 'Início', servicios: 'Serviços', portafolio: 'Portfólio', precios: 'Preços', sobreMi: 'Sobre Mim', contacto: 'Contato' },
    hero: { title: 'Websites modernos e responsivos para empresas', subtitle: 'Designs criativos que elevam sua marca.', cta: 'Ver projetos' },
    services: { 
      title: 'Serviços', 
      s1: { title: 'Landing Pages', desc: 'Páginas de alta conversão para seus produtos.' },
      s2: { title: 'Design Web Moderno', desc: 'Estética limpa e profissional para seu negócio.' },
      s3: { title: 'Design Responsivo', desc: 'Otimizado com HTML, CSS e JavaScript para qualquer dispositivo.' }
    },
    portfolio: { 
      title: 'Portfólio', 
      btn: 'Ver Portfólio',
      p1: 'Beauty Studio', 
      p2: 'Coffee Shop Website', 
      p3: 'Fashion Store',
      back: 'Voltar ao Portfólio',
      details: {
        'beauty-studio': { title: 'Beauty Studio', desc: 'Um design elegante e minimalista para um estúdio de beleza moderno. Focado na calma e no profissionalismo.', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2000' },
        'coffee-shop': { title: 'Coffee Shop Website', desc: 'Web quente e aconchegante para uma cafeteria artesanal. Inclui menu dinâmico e contato direto.', image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000' },
        'fashion-store': { title: 'Fashion Store', desc: 'Loja de moda com estilo contemporâneo. Galeria de produtos otimizada para dispositivos móveis.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000' }
      }
    },
    pricing: { 
      title: 'Preços',
      basic: { name: 'Básico', price: '15', features: ['1 seção moderna', 'Design responsivo', 'Botão de contato', 'Cores personalizadas', 'Entrega rápida'] },
      std: { name: 'Padrão', price: '45', features: ['Até 4 seções', 'Design moderno e elegante', 'Animações suaves', 'Modo claro e escuro', 'Responsivo para celular', 'SEO básico'] },
      premium: { name: 'Premium', price: '90', features: ['Várias seções', 'Design premium', 'Galeria de imagens', 'Animações avançadas', 'Formulário de contato', 'Otimização móvel', 'Personalização completa'] },
      extras: { title: 'Extras', e1: 'Entrega rápida ($10)', e2: 'Animações extras ($15)', e3: 'Página extra ($20)', e4: 'Modo escuro ($10)' },
      cta: 'Contatar'
    },
    about: { title: 'Sobre Mim', bio: 'Oi! Eu sou a Alondra, uma web designer iniciante apaixonada por criar sites modernos e responsivos. Eu gosto de construir designs criativos e amigáveis ao usuário.' },
    contact: { title: 'Contato', email: 'jeffloxmax@gmail.com', fiverr: '@alojeff' }
  }
};

// --- Components ---

const Navbar = ({ currentPage, setPage, lang, setLang }: { currentPage: Page, setPage: (p: Page) => void, lang: Lang, setLang: (l: Lang) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems = [
    { id: 'inicio', label: t.inicio },
    { id: 'servicios', label: t.servicios },
    { id: 'portafolio', label: t.portafolio },
    { id: 'precios', label: t.precios },
    { id: 'sobre-mi', label: t.sobreMi },
    { id: 'contacto', label: t.contacto },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDFCFA]/95 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setPage('inicio')}
        >
          <div className="w-10 h-10 bg-[#E67E5F] rounded-full flex items-center justify-center text-white font-black group-hover:rotate-[360deg] transition-all duration-700">AC</div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A]">Alondra<span className="text-[#E67E5F]">Creative</span></span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`text-sm font-medium transition-colors hover:text-[#E67E5F] ${
                currentPage === item.id ? 'text-[#E67E5F] underline underline-offset-8 decoration-2' : 'text-[#1A1A1A]/70'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="flex items-center gap-2 border-l border-black/10 pl-6 ml-2">
            {(['es', 'en', 'pt'] as Lang[]).map(l => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`text-[10px] font-black uppercase px-2 py-1 rounded transition-colors ${lang === l ? 'bg-[#E67E5F] text-white' : 'text-[#1A1A1A]/30 hover:text-[#1A1A1A]'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <button className="lg:hidden p-2 text-[#1A1A1A]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-[#FDFCFA] border-b border-black/10 lg:hidden flex flex-col p-8 gap-6 shadow-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); setIsOpen(false); }}
                className={`text-xl font-serif text-left ${currentPage === item.id ? 'text-[#E67E5F] font-bold' : 'text-[#1A1A1A]'}`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex gap-6 pt-6 border-t border-black/10">
              {(['es', 'en', 'pt'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`text-sm font-black uppercase ${lang === l ? 'text-[#E67E5F]' : 'text-[#1A1A1A]/40'}`}>{l}</button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onNext, lang }: { onNext: () => void, lang: Lang }) => (
  <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2000" 
        alt="Modern Tech Background" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 max-w-5xl px-6"
    >
      <h1 className="text-5xl md:text-[5rem] font-serif font-bold text-white leading-tight mb-8">
        {translations[lang].hero.title}
      </h1>
      <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto mb-14 leading-relaxed">
        {translations[lang].hero.subtitle}
      </p>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-[#E67E5F] text-white px-12 py-6 rounded-full font-bold text-xl transition-all shadow-2xl flex items-center justify-center gap-3 mx-auto"
        onClick={onNext}
      >
        {translations[lang].hero.cta} <ArrowRight className="w-6 h-6" />
      </motion.button>
    </motion.div>
  </section>
);

const Services = ({ lang }: { lang: Lang }) => {
  const t = translations[lang].services;
  return (
    <section id="servicios" className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-serif font-bold mb-20 text-center">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: Layout, title: t.s1.title, desc: t.s1.desc, color: 'bg-[#E67E5F]/10 text-[#E67E5F]' },
            { icon: Code, title: t.s2.title, desc: t.s2.desc, color: 'bg-[#4B6B5E]/10 text-[#4B6B5E]' },
            { icon: Smartphone, title: t.s3.title, desc: t.s3.desc, color: 'bg-amber-100 text-amber-700' }
          ].map((s, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="p-12 rounded-[3rem] bg-[#FDFCFA] border border-black/5 hover:border-[#E67E5F]/30 transition-all group"
            >
              <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                <s.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-6">{s.title}</h3>
              <p className="text-[#1A1A1A]/60 leading-relaxed text-lg">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = ({ lang, setPage }: { lang: Lang, setPage: (p: Page) => void }) => {
  const t = translations[lang].portfolio;
  const projects = [
    { id: 'beauty-studio' as const, title: t.p1, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800' },
    { id: 'coffee-shop' as const, title: t.p2, img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800' },
    { id: 'fashion-store' as const, title: t.p3, img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' }
  ];

  return (
    <section id="portafolio" className="py-32 px-6 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-24 text-center">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((p, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10 }}
              className="group relative h-[600px] overflow-hidden rounded-[3rem] cursor-pointer"
              onClick={() => setPage(p.id)}
            >
              <img src={p.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" alt={p.title} />
              <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <h3 className="text-4xl font-serif font-bold mb-8">{p.title}</h3>
                <button 
                  className="w-fit bg-white text-black px-10 py-4 rounded-full font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                  onClick={(e) => { e.stopPropagation(); setPage(p.id); }}
                >
                  {t.btn} <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectDetail = ({ lang, projectId, onBack }: { lang: Lang, projectId: 'beauty-studio' | 'coffee-shop' | 'fashion-store', onBack: () => void }) => {
  const project = translations[lang].portfolio.details[projectId];
  const t = translations[lang].portfolio;

  return (
    <section className="min-h-screen py-32 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#E67E5F] font-bold mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft className="w-5 h-5" /> {t.back}
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-6xl md:text-8xl font-serif font-bold mb-10 text-[#1A1A1A]">{project.title}</h2>
          <div className="aspect-video w-full rounded-[3rem] overflow-hidden mb-16 shadow-2xl">
            <img src={project.image} className="w-full h-full object-cover" alt={project.title} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-serif font-bold mb-6">Sobre el Proyecto</h3>
              <p className="text-xl text-[#1A1A1A]/70 leading-relaxed">{project.desc}</p>
            </div>
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest opacity-30 mb-4">Servicios</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-[#FDFCFA] border border-black/5 rounded-full text-sm font-medium">UX/UI</span>
                  <span className="px-4 py-2 bg-[#FDFCFA] border border-black/5 rounded-full text-sm font-medium">Frontend</span>
                  <span className="px-4 py-2 bg-[#FDFCFA] border border-black/5 rounded-full text-sm font-medium">Responsive</span>
                </div>
              </div>
              <a 
                href="mailto:jeffloxmax@gmail.com"
                className="block w-full bg-[#E67E5F] text-white py-5 rounded-2xl text-center font-bold hover:scale-110 hover:shadow-[0_20px_50px_rgba(230,126,95,0.3)] transition-all duration-300 active:scale-95"
              >
                Solicitar similar
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Pricing = ({ lang, setPage }: { lang: Lang, setPage: (p: Page) => void }) => {
  const t = translations[lang].pricing;
  return (
    <section id="precios" className="py-32 px-6 bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-serif font-bold mb-24 text-center">{t.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            { info: t.basic, pop: false, color: 'bg-white' },
            { info: t.std, pop: true, color: 'bg-[#4B6B5E] text-white' },
            { info: t.premium, pop: false, color: 'bg-white' }
          ].map((plan, i) => (
            <div key={i} className={`p-14 rounded-[3.5rem] border border-black/5 relative overflow-hidden flex flex-col shadow-xl ${plan.color}`}>
              {plan.pop && <div className="absolute top-0 right-0 bg-[#E67E5F] px-8 py-2 text-xs text-white font-black uppercase tracking-widest rounded-bl-3xl">Popular</div>}
              <h3 className="text-3xl font-serif font-bold mb-6">{plan.info.name}</h3>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-6xl font-bold">${plan.info.price}</span>
              </div>
              <ul className="space-y-5 mb-14 flex-1">
                {plan.info.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-lg">
                    <CheckCircle2 className={`w-6 h-6 shrink-0 ${plan.pop ? 'text-[#E67E5F]' : 'text-[#4B6B5E]'}`} /> 
                    <span className="opacity-80">{f}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setPage('contacto')}
                className={`w-full py-5 rounded-2xl text-center font-bold text-xl transition-all ${plan.pop ? 'bg-white text-[#4B6B5E] hover:bg-[#E67E5F] hover:text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#E67E5F]'}`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="p-14 rounded-[3rem] bg-white border border-black/10 shadow-2xl">
          <h3 className="text-3xl font-serif font-bold mb-10 text-center">{t.extras.title}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[t.extras.e1, t.extras.e2, t.extras.e3, t.extras.e4].map((extra, idx) => (
              <div key={idx} className="text-center p-8 bg-[#FDFCFA] rounded-3xl border border-black/5">
                <p className="font-bold text-lg text-[#E67E5F]">{extra}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ lang }: { lang: Lang }) => {
  const t = translations[lang].about;
  return (
    <section id="sobre-mi" className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 items-center">
        <div className="md:w-1/2">
          <div className="aspect-square rounded-[4rem] overflow-hidden rotate-2 border-[16px] border-[#FDFCFA] shadow-2xl">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Alondra" />
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-6xl font-serif font-bold mb-10 leading-tight">{t.title}</h2>
          <p className="text-2xl text-[#1A1A1A]/70 leading-relaxed font-light">{t.bio}</p>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Lang }) => {
  const t = translations[lang].contact;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(t.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct Gmail web compose link
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.email}&su=Consulta sobre proyecto web`;

  return (
    <section id="contacto" className="py-32 px-6 bg-[#FDFCFA]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/2">
          <h2 className="text-7xl font-serif font-bold mb-12">{t.title}</h2>
          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group">
              <div className="flex gap-8 items-center">
                <div className="w-16 h-16 bg-[#E67E5F]/10 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-[#E67E5F]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-1">Email</p>
                  <p className="text-2xl font-bold">{t.email}</p>
                </div>
              </div>
              <button 
                onClick={copyEmail}
                className="bg-[#FDFCFA] hover:bg-[#E67E5F] hover:text-white border border-black/5 px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 group/btn"
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 border-2 border-current rounded-sm flex items-center justify-center text-[10px]">C</div>}
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>

            <a 
              href="https://www.fiverr.com/alojeff" 
              target="_blank" 
              rel="noreferrer"
              className="flex gap-8 items-center bg-white p-10 rounded-[3rem] shadow-sm border border-black/5 hover:border-[#E67E5F] hover:shadow-xl hover:shadow-[#E67E5F]/5 transition-all group"
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white font-black group-hover:bg-[#E67E5F] group-hover:rotate-[360deg] transition-all duration-700">fi</div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-1">Fiverr</p>
                <p className="text-2xl font-bold group-hover:text-[#E67E5F] transition-colors">{t.fiverr}</p>
              </div>
            </a>
          </div>
        </div>
        
        <div className="lg:w-1/2 bg-[#1A1A1A] p-16 rounded-[4rem] text-white flex flex-col justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#E67E5F]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-4xl font-serif font-bold mb-10 relative z-10">¿Listo para escalar?</h3>
          <p className="text-white/60 text-xl mb-12 relative z-10">Usa el botón de abajo para abrir Gmail directamente o copiar mi correo.</p>
          
          <div className="flex flex-col gap-4 relative z-10">
            <a 
              href={gmailUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#E67E5F] text-white py-7 rounded-2xl font-bold text-2xl transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(230,126,95,0.4)] active:scale-95 flex items-center justify-center gap-3"
            >
              <Mail className="w-8 h-8" /> Abrir en Gmail
            </a>
            <button 
              onClick={copyEmail}
              className="py-4 text-white/40 hover:text-white transition-colors flex items-center justify-center gap-2 font-bold"
            >
              O simplemente copiar: {t.email}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setPage, lang }: { setPage: (p: Page) => void, lang: Lang }) => {
  const t = translations[lang];
  
  return (
    <footer className="bg-[#1A1A1A] text-white py-24 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E67E5F]/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group w-fit" 
              onClick={() => setPage('inicio')}
            >
              <div className="w-12 h-12 bg-[#E67E5F] rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform">AC</div>
              <span className="font-serif text-2xl font-bold tracking-tight">Alondra<span className="text-[#E67E5F]">Creative</span></span>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-xs">
              {lang === 'es' ? 'Creando experiencias digitales que no solo se ven bien, sino que funcionan.' : 'Creating digital experiences that don\'t just look good, they work.'}
            </p>
            <div className="flex gap-4">
              <a href="https://www.fiverr.com/alojeff" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E67E5F] hover:border-[#E67E5F] hover:scale-125 transition-all">
                <span className="font-black text-xs">fi</span>
              </a>
              <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#E67E5F] hover:border-[#E67E5F] hover:scale-125 transition-all">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-white/30">{lang === 'es' ? 'Explorar' : 'Explore'}</h4>
            <ul className="space-y-5">
              {(['inicio', 'servicios', 'portafolio', 'precios', 'sobre-mi'] as Page[]).map((id) => (
                <li key={id}>
                  <button 
                    onClick={() => setPage(id)}
                    className="text-white/60 hover:text-[#E67E5F] transition-colors text-lg capitalize"
                  >
                    {t.nav[id as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Shortcut */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-white/30">{lang === 'es' ? 'Servicios' : 'Services'}</h4>
            <ul className="space-y-5">
              <li><button onClick={() => setPage('servicios')} className="text-white/60 hover:text-[#E67E5F] transition-colors text-lg text-left">{t.services.s1.title}</button></li>
              <li><button onClick={() => setPage('servicios')} className="text-white/60 hover:text-[#E67E5F] transition-colors text-lg text-left">{t.services.s2.title}</button></li>
              <li><button onClick={() => setPage('servicios')} className="text-white/60 hover:text-[#E67E5F] transition-colors text-lg text-left">{t.services.s3.title}</button></li>
            </ul>
          </div>

          {/* Contact Shortcut */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-white/30">{lang === 'es' ? 'Contacto' : 'Contact'}</h4>
            <div className="space-y-8">
              <a href="mailto:jeffloxmax@gmail.com" className="group block">
                <p className="text-xs font-bold uppercase opacity-30 group-hover:text-[#E67E5F] group-hover:opacity-100 transition-all mb-2">Email</p>
                <p className="text-xl font-medium group-hover:translate-x-2 transition-transform underline underline-offset-4 decoration-white/10 group-hover:decoration-[#E67E5F]">{t.contact.email}</p>
              </a>
              <button 
                onClick={() => setPage('contacto')}
                className="inline-flex items-center gap-2 text-[#E67E5F] font-bold group"
              >
                {lang === 'es' ? '¿Empezamos un proyecto?' : 'Start a project?'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em]">
            © 2026 Alondra Creative — {lang === 'es' ? 'Hecho con pasión' : 'Made with passion'}
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
          >
            <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'es' ? 'Volver arriba' : 'Back to top'}</span>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:-translate-y-2 transition-transform">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [page, setPage] = useState<Page>('inicio');
  const [lang, setLang] = useState<Lang>('es');

  const renderPage = () => {
    switch (page) {
      case 'inicio': return <Hero lang={lang} onNext={() => setPage('portafolio')} />;
      case 'servicios': return <Services lang={lang} />;
      case 'portafolio': return <Portfolio lang={lang} setPage={setPage} />;
      case 'precios': return <Pricing lang={lang} setPage={setPage} />;
      case 'sobre-mi': return <About lang={lang} />;
      case 'contacto': return <Contact lang={lang} />;
      case 'beauty-studio':
      case 'coffee-shop':
      case 'fashion-store':
        return <ProjectDetail lang={lang} projectId={page} onBack={() => setPage('portafolio')} />;
      default: return <Hero lang={lang} onNext={() => setPage('portafolio')} />;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="min-h-screen selection:bg-[#E67E5F]/30 text-[#1A1A1A] font-sans bg-[#FDFCFA]">
      <Navbar currentPage={page} setPage={setPage} lang={lang} setLang={setLang} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setPage={setPage} lang={lang} />
    </div>
  );
}
