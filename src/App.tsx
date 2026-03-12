/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import { PROJECTS, type Project } from './constants';
import { ArrowRight, Instagram, Twitter, Linkedin, Box, Layers, Monitor, Cpu, LayoutGrid, MessageCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { translations, type Language } from './i18n';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<'All' | '3D' | 'Motion' | 'UI' | 'AI'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showWeChatQR, setShowWeChatQR] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const categories = [
    { id: 'All', label: t.categories.All, icon: LayoutGrid },
    { id: '3D', label: t.categories['3D'], icon: Box },
    { id: 'Motion', label: t.categories.Motion, icon: Layers },
    { id: 'UI', label: t.categories.UI, icon: Monitor },
    { id: 'AI', label: t.categories.AI, icon: Cpu },
  ] as const;

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen selection:bg-white selection:text-black relative">
      {/* Cool Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-blob" />
        <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-blue-900/20 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] bg-emerald-900/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <Navbar 
        onNavigate={() => setSelectedProject(null)} 
        lang={lang}
        setLang={setLang}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-4 max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-white/40 font-medium mb-8 block">
              Creative Portfolio
            </span>
            <h1 className={`text-5xl md:text-[8.5rem] font-black uppercase mb-16 ${lang === 'en' ? 'tracking-tight leading-[1.05]' : 'tracking-normal leading-[1.2]'}`}>
              {lang === 'en' ? (
                <>
                  WELCOME TO <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">DODONG</span> <br />
                  DESIGN SPACE
                </>
              ) : (
                <>
                  欢迎来到 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white/20">DODONG</span> <br />
                  设计空间
                </>
              )}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mt-12 md:mt-20">
              <p className={`text-lg text-white/60 max-w-md leading-relaxed ${lang === 'zh' ? 'tracking-wide' : ''}`}>
                {t.hero.subtitle}
              </p>
              <motion.a
                href="#work"
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4 group"
              >
                <span className="text-sm uppercase tracking-widest font-semibold">{t.nav.work}</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <ArrowRight size={18} />
                </div>
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* Work Grid */}
        <section id="work" className="py-24 md:py-32 px-4 max-w-[1600px] mx-auto">
          <div className="mb-24">
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 font-medium mb-12">{lang === 'en' ? 'Selected Works' : '精选作品'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border transition-all duration-500 overflow-hidden group ${
                    activeCategory === cat.id 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:bg-white/10'
                  }`}
                >
                  <cat.icon className={`mb-4 transition-transform duration-500 ${activeCategory === cat.id ? 'scale-110' : 'group-hover:scale-110'}`} size={24} />
                  <span className="text-xs uppercase tracking-widest font-bold">{cat.label}</span>
                  {activeCategory === cat.id && (
                    <motion.div 
                      layoutId="active-bg"
                      className="absolute inset-0 bg-white -z-10"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-12">
            <span className="text-xs font-mono text-white/20 uppercase tracking-widest">
              Filtered by: {activeCategory}
            </span>
            <span className="text-xs font-mono text-white/20">Showing {filteredProjects.length} Projects</span>
          </div>
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index} 
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          lang={lang}
        />

        {/* About Section */}
        <section id="about" className="py-32 md:py-48 px-4 bg-brand-gray/30">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square bg-brand-gray overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
            
            <div>
              <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 font-medium mb-12">{t.about.title}</h2>
              <p className={`text-3xl md:text-4xl font-light mb-10 ${lang === 'en' ? 'leading-snug' : 'leading-relaxed tracking-wide'}`}>
                {lang === 'en' ? (
                  <>We believe in the power of <span className="font-serif italic">restraint</span>. Every pixel, every line, and every interaction is intentional.</>
                ) : (
                  <>{t.about.p1}</>
                )}
              </p>
              <p className={`text-lg text-white/60 mb-16 ${lang === 'en' ? 'leading-relaxed' : 'leading-loose tracking-wide'}`}>
                {t.about.p2}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{t.about.services}</h4>
                  <ul className="text-sm space-y-2 text-white/80">
                    <li>{lang === 'en' ? 'Art Direction' : '艺术指导'}</li>
                    <li>{lang === 'en' ? 'UI/UX Design' : 'UI/UX 设计'}</li>
                    <li>{lang === 'en' ? 'Brand Strategy' : '品牌策略'}</li>
                    <li>{lang === 'en' ? 'Motion Design' : '动态设计'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4">{t.about.awards}</h4>
                  <ul className="text-sm space-y-2 text-white/80">
                    <li>Awwwards SOTD</li>
                    <li>FWA of the Month</li>
                    <li>CSS Design Awards</li>
                    <li>Behance Featured</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 md:py-48 px-4 max-w-[1600px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 font-medium mb-12">{t.contact.title}</h2>
            <a 
              href="mailto:hello@aura.design" 
              className="text-4xl md:text-7xl font-light tracking-tighter hover:text-white/60 transition-colors"
            >
              hello@aura.design
            </a>
            
            <div className="mt-24 flex justify-center space-x-12">
              {[
                { icon: ExternalLink, label: lang === 'en' ? 'Zcool' : '站酷', href: '#' },
                { icon: ExternalLink, label: 'Behance', href: '#' },
                { icon: MessageCircle, label: lang === 'en' ? 'WeChat' : '微信', isWeChat: true }
              ].map((social) => (
                <div key={social.label} className="relative">
                  {social.isWeChat ? (
                    <>
                      <button 
                        onClick={() => setShowWeChatQR(!showWeChatQR)}
                        className="group flex flex-col items-center space-y-4"
                      >
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                          <social.icon size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                          {social.label}
                        </span>
                      </button>
                      <AnimatePresence>
                        {showWeChatQR && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 p-3 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 w-40"
                          >
                            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-2">
                              <img 
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=WeChatID" 
                                alt="WeChat QR" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-[10px] text-black font-bold uppercase tracking-wider text-center">{t.contact.scan}</p>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <a 
                      href={social.href} 
                      className="group flex flex-col items-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                        <social.icon size={20} />
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                        {social.label}
                      </span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 px-4 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/20 uppercase tracking-widest">
            © 2024 Aura Design Studio. All rights reserved.
          </p>
          <div className="flex space-x-8 text-xs text-white/20 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
