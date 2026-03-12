import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowLeft } from 'lucide-react';
import type { Project } from '../constants';
import { useEffect } from 'react';
import { translations, type Language } from '../i18n';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: Language;
}

export default function ProjectModal({ project, onClose, lang }: ProjectModalProps) {
  const t = translations[lang].project;
  
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col overflow-y-auto scrollbar-hide pt-20"
        >
          {/* Floating Back Button */}
          <div className="fixed top-24 left-4 md:left-8 z-[120] pointer-events-none">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={onClose}
              className="pointer-events-auto flex items-center space-x-4 text-white/40 hover:text-white transition-all group bg-black/50 backdrop-blur-md p-2 pr-6 rounded-full border border-white/10 hover:border-white/40"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowLeft size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{t.back}</span>
            </motion.button>
          </div>

          {/* Content */}
          <div className="max-w-[1600px] mx-auto px-4 py-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 mb-32">
              <div className="lg:col-span-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8"
                >
                  {project.title}
                </motion.h1>
                <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">{t.category}</h4>
                  <p className="text-sm font-bold uppercase tracking-wider">{project.category}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">{t.year}</h4>
                  <p className="text-sm font-bold uppercase tracking-wider">{project.year}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2">{t.role}</h4>
                  <p className="text-sm font-bold uppercase tracking-wider">{t.roleValue}</p>
                </div>
              </div>
            </div>

            {/* 20 Image Containers - No width/height limit */}
            <div className="flex flex-col space-y-12 md:space-y-24">
              {project.video && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full bg-brand-gray/20 overflow-hidden rounded-2xl"
                >
                  <video 
                    src={project.video} 
                    controls 
                    autoPlay 
                    muted 
                    loop 
                    className="w-full h-auto block"
                  />
                </motion.div>
              )}
              {project.detailImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="w-full bg-brand-gray/20 overflow-hidden rounded-2xl"
                >
                  <img 
                    src={img} 
                    alt={`${project.title} detail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-contain block"
                  />
                </motion.div>
              ))}
            </div>

            {/* Footer Contact */}
            <div className="mt-40 py-40 border-t border-white/10 text-center">
              <h3 className="text-xs uppercase tracking-[0.4em] text-white/40 font-medium mb-12">{t.next}</h3>
              <button 
                onClick={onClose}
                className="text-4xl md:text-7xl font-black tracking-tighter uppercase hover:text-white/60 transition-colors"
              >
                {t.explore}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
