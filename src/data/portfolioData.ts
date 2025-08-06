export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  platform: string;
  status: 'Live' | 'Growing' | 'Development';
  category: string;
  tags: string[];
  image: string;
  stats: {
    players: string;
    revenue: string;
    rating: string | number;
  };
  launchDate: string;
  featured?: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: "Galactic Miners",
    description: "Un juego de estrategia y construcción en el espacio donde los jugadores exploran galaxias, extraen recursos y construyen imperios interestelares. Featuring multiplayer masivo y economía player-driven.",
    shortDescription: "Estrategia espacial con construcción de imperios y economía player-driven",
    platform: "PC/Steam",
    status: "Live",
    category: "Strategy",
    tags: ["Space", "Mining", "Strategy", "Multiplayer", "Economy"],
    image: "/steve_thinking.png",
    stats: {
      players: "15K+",
      revenue: "$2.3M",
      rating: 4.8
    },
    launchDate: "2023-08",
    featured: true
  },
  {
    id: 2,
    title: "Pixel Legends",
    description: "RPG retro con mecánicas modernas, featuring un sistema de crafting profundo y combate estratégico por turnos. Incluye más de 200 items únicos y 50+ dungeons procedurales.",
    shortDescription: "RPG retro con crafting profundo y combate táctico por turnos",
    platform: "Mobile",
    status: "Growing",
    category: "RPG",
    tags: ["Pixel Art", "RPG", "Mobile", "Crafting", "Turn-based"],
    image: "/steve_with_a_alert_icon.png",
    stats: {
      players: "8.2K",
      revenue: "$850K",
      rating: 4.6
    },
    launchDate: "2023-11",
    featured: true
  },
  {
    id: 3,
    title: "Neon Racers",
    description: "Juego de carreras futurista con elementos de personalización extrema y física realista en circuitos cyberpunk. Features 20+ vehículos únicos y sistema de tuning avanzado.",
    shortDescription: "Carreras cyberpunk con personalización extrema y física realista",
    platform: "Console",
    status: "Development",
    category: "Racing",
    tags: ["Cyberpunk", "Racing", "Neon", "Physics", "Customization"],
    image: "/steve_showing_with_is_hands.png",
    stats: {
      players: "Soon",
      revenue: "TBA",
      rating: "N/A"
    },
    launchDate: "2024-Q2",
    featured: true
  },
  {
    id: 4,
    title: "Mystic Realms",
    description: "MMORPG de fantasía con mundo abierto, sistema de magia único y mecánicas de guild warfare épicas. Incluye 8 clases jugables y más de 1000 hechizos únicos.",
    shortDescription: "MMORPG de fantasía con sistema de magia único y guild warfare",
    platform: "PC/Mobile",
    status: "Live",
    category: "MMORPG",
    tags: ["Fantasy", "Open World", "Magic", "Guild Wars", "Classes"],
    image: "/steve_thinking.png",
    stats: {
      players: "25K+",
      revenue: "$4.1M",
      rating: 4.9
    },
    launchDate: "2023-03",
    featured: false
  },
  {
    id: 5,
    title: "Code Breakers",
    description: "Puzzle game educativo que enseña programación a través de desafíos interactivos y mecánicas de hacking. Covering Python, JavaScript, y conceptos de ciberseguridad.",
    shortDescription: "Puzzle educativo que enseña programación y hacking ético",
    platform: "Web/Educational",
    status: "Growing",
    category: "Educational",
    tags: ["Programming", "Puzzle", "Education", "Hacking", "Python"],
    image: "/steve_with_a_alert_icon.png",
    stats: {
      players: "12K",
      revenue: "$650K",
      rating: 4.7
    },
    launchDate: "2023-09",
    featured: false
  },
  {
    id: 6,
    title: "Arena Champions",
    description: "Battle royale táctico con elementos MOBA, featuring 100 jugadores en combates estratégicos intensos. Includes unique champion abilities y ranked competitive play.",
    shortDescription: "Battle royale táctico con elementos MOBA y habilidades únicas",
    platform: "PC/Console",
    status: "Development",
    category: "Battle Royale",
    tags: ["Battle Royale", "MOBA", "Tactical", "100 Players", "Competitive"],
    image: "/steve_showing_with_is_hands.png",
    stats: {
      players: "Beta Soon",
      revenue: "TBA",
      rating: "N/A"
    },
    launchDate: "2024-Q3",
    featured: false
  },
  {
    id: 7,
    title: "Crystal Defenders",
    description: "Tower defense con mecánicas RPG donde players controlan heroes únicos mientras defienden cristales mágicos. Features co-op multiplayer y progression system profundo.",
    shortDescription: "Tower defense con heroes RPG y elementos cooperativos",
    platform: "Mobile/PC",
    status: "Live",
    category: "Tower Defense",
    tags: ["Tower Defense", "RPG", "Co-op", "Heroes", "Magic"],
    image: "/steve_thinking.png",
    stats: {
      players: "18K",
      revenue: "$1.2M",
      rating: 4.5
    },
    launchDate: "2023-06",
    featured: false
  },
  {
    id: 8,
    title: "Void Explorers",
    description: "Roguelike espacial con narrativa procedural donde cada run cuenta una historia única. Features ship customization y discovery of ancient alien artifacts.",
    shortDescription: "Roguelike espacial con narrativa procedural y artefactos alienígenas",
    platform: "PC/Steam",
    status: "Growing",
    category: "Roguelike",
    tags: ["Roguelike", "Space", "Procedural", "Narrative", "Exploration"],
    image: "/steve_with_a_alert_icon.png",
    stats: {
      players: "6.8K",
      revenue: "$420K",
      rating: 4.4
    },
    launchDate: "2023-12",
    featured: false
  },
  {
    id: 9,
    title: "Farming Legends",
    description: "Simulador de granja con elementos de gestión de recursos y construcción de comunidad. Players pueden crear granjas únicas y comerciar con otros jugadores globalmente.",
    shortDescription: "Simulador de granja con gestión de recursos y trading global",
    platform: "Mobile/Switch",
    status: "Development",
    category: "Simulation",
    tags: ["Farming", "Simulation", "Trading", "Community", "Resource Management"],
    image: "/steve_showing_with_is_hands.png",
    stats: {
      players: "Coming Soon",
      revenue: "TBA",
      rating: "N/A"
    },
    launchDate: "2024-Q1",
    featured: false
  }
];

// Helper functions
export const getFeaturedProjects = (): PortfolioProject[] => {
  return portfolioProjects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): PortfolioProject[] => {
  if (category === 'All') return portfolioProjects;
  return portfolioProjects.filter(project => project.category === category);
};

export const getProjectsByStatus = (status: string): PortfolioProject[] => {
  if (status === 'All') return portfolioProjects;
  return portfolioProjects.filter(project => project.status === status);
};

export const searchProjects = (searchTerm: string): PortfolioProject[] => {
  const term = searchTerm.toLowerCase();
  return portfolioProjects.filter(project => 
    project.title.toLowerCase().includes(term) ||
    project.description.toLowerCase().includes(term) ||
    project.tags.some(tag => tag.toLowerCase().includes(term)) ||
    project.category.toLowerCase().includes(term)
  );
};

export const categories = ['All', 'Strategy', 'RPG', 'Racing', 'MMORPG', 'Educational', 'Battle Royale', 'Tower Defense', 'Roguelike', 'Simulation'];
export const statuses = ['All', 'Live', 'Growing', 'Development'];
export const platforms = ['All', 'PC/Steam', 'Mobile', 'Console', 'PC/Mobile', 'Web/Educational', 'PC/Console', 'Mobile/PC', 'Mobile/Switch'];