import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Layout from '../components/layout/Layout';
import { portfolioProjects, categories, statuses, platforms } from '../data/portfolioData';



const PortfolioPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Update search term from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return portfolioProjects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
      const matchesPlatform = selectedPlatform === 'All' || project.platform === selectedPlatform;

      return matchesSearch && matchesCategory && matchesStatus && matchesPlatform;
    });
  }, [searchTerm, selectedCategory, selectedStatus, selectedPlatform]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark-950 pt-20">
        {/* Hero Section */}
        <motion.section 
          className="py-16 bg-gradient-to-b from-dark-900 to-dark-950"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <ChartBarIcon className="w-4 h-4 text-accent" />
                <span className="text-gray-300 text-sm font-medium">Portfolio Showcase</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display">
                Our Gaming
                <span className="block gradient-text-primary font-gaming">Portfolio</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explora los proyectos innovadores que hemos ayudado a crear y lanzar al mercado gaming.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Search Bar */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="search-bar w-full">
                  <div className="flex items-center px-6 py-4">
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Busca proyectos, tecnologías, géneros..."
                      className="ml-4 flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                    />
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`ml-4 p-2 rounded-lg transition-colors ${
                        showFilters ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <FunnelIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  className="glass-card p-6 rounded-2xl"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category} value={category} className="bg-dark-900">
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Estado</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status} className="bg-dark-900">
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Platform Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Plataforma</label>
                      <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {platforms.map(platform => (
                          <option key={platform} value={platform} className="bg-dark-900">
                            {platform}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {filteredProjects.length} Proyecto{filteredProjects.length !== 1 ? 's' : ''} Encontrado{filteredProjects.length !== 1 ? 's' : ''}
                </h2>
                {searchTerm && (
                  <p className="text-gray-400 mt-1">
                    Resultados para "{searchTerm}"
                  </p>
                )}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="glass-card rounded-3xl overflow-hidden group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  {/* Project Header */}
                  <div className="h-48 bg-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Live' ? 'bg-green-500/20 text-green-300' :
                        project.status === 'Growing' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                        {project.platform}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <img 
                        src={project.image} 
                        alt={`${project.title} mascot`}
                        className="w-16 h-16 object-contain opacity-80"
                      />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white font-tech tracking-wide">{project.title}</h3>
                      <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-lg font-medium">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center">
                        <UserGroupIcon className="w-4 h-4 text-primary mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Players</div>
                        <div className="text-sm font-semibold text-white">{project.stats.players}</div>
                      </div>
                      <div className="text-center">
                        <ChartBarIcon className="w-4 h-4 text-accent mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Revenue</div>
                        <div className="text-sm font-semibold text-white">{project.stats.revenue}</div>
                      </div>
                      <div className="text-center">
                        <ClockIcon className="w-4 h-4 text-secondary mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Rating</div>
                        <div className="text-sm font-semibold text-white">{project.stats.rating}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded-lg border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Launch Date */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        Launched: {project.launchDate}
                      </div>
                      <motion.button
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                  <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No se encontraron proyectos</h3>
                <p className="text-gray-400 mb-6">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                    setSelectedPlatform('All');
                    setSearchParams({});
                  }}
                  className="btn-ghost px-6 py-3 rounded-xl font-semibold"
                >
                  Limpiar Filtros
                </button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PortfolioPage;