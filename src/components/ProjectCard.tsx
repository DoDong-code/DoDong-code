import React from 'react';
import { motion } from 'motion/react';
import type { Project } from '../constants';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
  key?: React.Key;
}

export default function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      onClick={() => onClick(project)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-brand-gray rounded-2xl">
        <motion.img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-xs uppercase tracking-[0.3em] font-medium border border-white/30 px-6 py-3 backdrop-blur-sm">
            View Project
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium tracking-tight">{project.title}</h3>
          <p className="text-sm text-white/40 mt-1 uppercase tracking-wider">{project.category}</p>
        </div>
        <span className="text-xs font-mono text-white/20">{project.year}</span>
      </div>
    </motion.div>
  );
}
