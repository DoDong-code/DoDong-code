export interface Project {
  id: string;
  title: string;
  category: '3D' | 'Motion' | 'UI' | 'AI';
  image: string;
  year: string;
  description: string;
  detailImages: string[];
  video?: string;
}

const MOCK_DETAIL_IMAGES = Array.from({ length: 20 }, (_, i) => 
  `https://picsum.photos/seed/${Math.random()}/1200/${800 + Math.floor(Math.random() * 800)}`
);

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cybernetic Sculptures',
    category: '3D',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
    description: 'An exploration of digital form and organic complexity in a virtual space.',
    detailImages: MOCK_DETAIL_IMAGES,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-liquid-3444-large.mp4'
  },
  {
    id: '2',
    title: 'Fluid Dynamics',
    category: 'Motion',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
    year: '2023',
    description: 'Capturing the essence of movement through procedural liquid simulations.',
    detailImages: MOCK_DETAIL_IMAGES,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-of-a-swimming-pool-4694-large.mp4'
  },
  {
    id: '3',
    title: 'Neumorphic Interface',
    category: 'UI',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
    description: 'Redefining digital surfaces with soft shadows and tactile feedback.',
    detailImages: MOCK_DETAIL_IMAGES,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-white-clouds-in-a-blue-sky-2311-large.mp4'
  },
  {
    id: '4',
    title: 'Neural Landscapes',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
    year: '2024',
    description: 'Generating infinite worlds using advanced neural network architectures.',
    detailImages: MOCK_DETAIL_IMAGES,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-out-of-focus-2314-large.mp4'
  },
  {
    id: '5',
    title: 'Ethereal Structures',
    category: '3D',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    year: '2024',
    description: 'Architectural concepts that defy gravity and traditional material constraints.',
    detailImages: MOCK_DETAIL_IMAGES,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-curvy-lines-of-light-on-a-black-background-3446-large.mp4'
  },
  {
    id: '6',
    title: 'Kinetic Typography',
    category: 'Motion',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1974&auto=format&fit=crop',
    year: '2023',
    description: 'Where language meets motion to create expressive visual narratives.',
    detailImages: MOCK_DETAIL_IMAGES,
    video: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-3447-large.mp4'
  }
];
