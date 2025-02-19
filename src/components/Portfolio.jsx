import React, { useState, useEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { SEO } from "./SEO";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useGitHubProjects } from "../hooks/useGitHubProjects";
import { useContactForm } from "../hooks/useContactForm";

// Componente de Loading
const LoadingFallback = () => (
  <div className="w-full h-full flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

// Lazy loading dos componentes com tratamento de erro
const ProjectCard = lazy(() => 
  import("./ProjectCard").then(module => ({ default: module.ProjectCard }))
);

const SkillCard = lazy(() => 
  import("./SkillCard").then(module => ({ default: module.SkillCard }))
);

// Animações
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Easter Egg - Konami Code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

export const Portfolio = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const { projects, loading, error, filter, availableFilters, setFilter } = useGitHubProjects('RonaldoChiavegatti');
  const { 
    formData, 
    errors, 
    isSubmitting, 
    submitStatus, 
    handleChange, 
    handleSubmit 
  } = useContactForm();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setShowEasterEgg(true);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  return (
    <>
      <SEO />
      <motion.div 
        className="min-h-screen w-full bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 scroll-smooth smooth-scroll"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn}
        transition={pageTransition}
      >
        {showEasterEgg && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
              className="text-6xl"
            >
              🎮
            </motion.div>
          </motion.div>
        )}

        <div id="top" className="w-full min-h-screen">
        {/* Header */}
          <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between py-4 md:py-6">
                <a 
                  href="#top" 
                  className="text-2xl md:text-3xl font-bold font-montserrat hover:text-purple-500 dark:hover:text-purple-600 transition-all"
                >
                  Ronaldo Chiavegatti
                </a>
              
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-neutral-800/50 dark:hover:bg-gray-100/50 transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="material-symbols-outlined">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>

              <div className={`
                md:flex items-center gap-6 lg:gap-8
                ${isMenuOpen 
                  ? 'absolute top-full left-0 right-0 flex flex-col items-center gap-4 py-4 bg-neutral-900/95 dark:bg-white/95 border-b border-neutral-700 dark:border-neutral-200' 
                  : 'hidden md:flex'
                }
              `}>
                  <a href="#about" onClick={() => setIsMenuOpen(false)} className="scroll-animate hover:text-purple-500 dark:hover:text-purple-600 transition-all hover:scale-105 py-2">Sobre</a>
                  <a href="#projects" onClick={() => setIsMenuOpen(false)} className="scroll-animate hover:text-purple-500 dark:hover:text-purple-600 transition-all hover:scale-105 py-2">Projetos</a>
                  <a href="#skills" onClick={() => setIsMenuOpen(false)} className="scroll-animate hover:text-purple-500 dark:hover:text-purple-600 transition-all hover:scale-105 py-2">Habilidades</a>
                  <a href="#contact" onClick={() => setIsMenuOpen(false)} className="scroll-animate hover:text-purple-500 dark:hover:text-purple-600 transition-all hover:scale-105 py-2">Contato</a>
                <button 
                  onClick={toggleTheme}
                  className="hover:text-purple-500 dark:hover:text-purple-600 transition-all hover:scale-105 p-2"
                >
                  <span className="material-symbols-outlined">
                    {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </header>

          <main className="w-full bg-gradient-to-br from-white via-gray-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
          {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
              {/* Fundo animado com gradiente */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 animate-gradient"></div>
              
              {/* Padrão de grid animado */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 relative">
                <div className="space-y-8 text-center">
                  {/* Texto de apresentação com efeito de digitação */}
                  <p className="text-purple-500 dark:text-purple-400 text-lg md:text-xl font-medium tracking-wide animate-fadeIn">
                    Desenvolvedor Full Stack & Analista de Dados
                  </p>
                  
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                      Olá, eu sou
                    </span>
                    <br />
                    <span className="mt-2 inline-block text-gray-900 dark:text-gray-100">
                      Ronaldo Chiavegatti
                    </span>
                </h2>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Transformando ideias em experiências digitais únicas e memoráveis
                </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a 
                  href="#projects" 
                      className="w-full sm:w-auto px-8 py-4 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
                    >
                      <span>Ver Projetos</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a 
                      href="#contact" 
                      className="w-full sm:w-auto px-8 py-4 text-lg border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <span>Contato</span>
                      <span className="material-symbols-outlined">mail</span>
                    </a>
                  </div>

                  {/* Indicador de scroll */}
                  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <span className="material-symbols-outlined text-purple-500 text-3xl">expand_more</span>
                  </div>
                </div>
            </div>
          </section>

          {/* About Section */}
            <section id="about" className="relative py-20">
              {/* Fundo com padrão sutil */}
              <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF6,#EC4899,#8B5CF6)] opacity-10 mix-blend-multiply dark:mix-blend-soft-light"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div 
                    data-aos="fade-right" 
                    data-aos-duration="1000" 
                    className="order-2 md:order-1"
                  >
                    {/* Container da foto */}
                    <div className="relative mx-auto max-w-md aspect-[4/5]">
                      <div className="w-full h-full rounded-xl overflow-hidden">
                        <LazyLoadImage
                          src="/profile.png"
                          alt="Ronaldo Chiavegatti - Desenvolvedor Full Stack" 
                          effect="blur"
                          className="w-full h-full object-cover object-center"
                          wrapperClassName="w-full h-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div 
                    data-aos="fade-left" 
                    data-aos-duration="1000" 
                    data-aos-delay="200" 
                    className="space-y-6 order-1 md:order-2"
                  >
                    <h2 className="text-4xl md:text-5xl font-bold font-poppins">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Sobre Mim
                      </span>
                    </h2>

                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                      <p className="text-lg leading-relaxed">
                        Sou desenvolvedor frontend e analista de dados em formação, apaixonado por tecnologia e inovação. Tenho experiência na criação e manutenção de sites, e-commerces e aplicações web, além de atuar no desenvolvimento de soluções automatizadas para otimização de processos. Como fundador da Venturea, uma agência de marketing digital, integro tecnologia e estratégia para impulsionar negócios no ambiente online.
                      </p>
                      <p className="text-lg leading-relaxed">
                        Atualmente, curso o 5º semestre de Análise e Desenvolvimento de Sistemas na Fatec Rio Preto, onde desenvolvi projetos voltados para e-commerce sustentável e automação com Arduino. Busco constantemente desafios que me permitam aprimorar minhas habilidades em desenvolvimento web, análise de dados e automações, sempre focado em eficiência e criatividade.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-6">
                      <a 
                        href="https://github.com/RonaldoChiavegatti" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20"
                      >
                        <i className="fa-brands fa-github text-xl group-hover:rotate-12 transition-transform"></i>
                      GitHub
                    </a>
                      <a 
                        href="https://linkedin.com/in/ronaldo-chiavegatti-sampaio-corrêa-4b858a225" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/20"
                      >
                        <i className="fa-brands fa-linkedin text-xl group-hover:rotate-12 transition-transform"></i>
                      LinkedIn
                    </a>
                      <a 
                        href="/Curriculo.pdf" 
                        className="group flex items-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <i className="fa-solid fa-file-pdf text-xl group-hover:rotate-12 transition-transform"></i>
                        Currículo
                      </a>
                    </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
            <section id="projects" className="relative py-20">
              {/* Fundo com padrão sutil */}
              <div className="absolute inset-0 bg-white dark:bg-neutral-900">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,#8B5CF6,#EC4899,#8B5CF6)] opacity-5 mix-blend-multiply dark:mix-blend-soft-light"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,.05)_1.5px,transparent_1.5px)] bg-[size:30px_30px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center space-y-4 mb-12">
                  <h2 
                    className="text-4xl md:text-5xl font-bold font-poppins"
                    data-aos="fade-up"
                  >
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Projetos
                    </span>
                  </h2>
                  <p 
                    className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    Explore minha coleção de projetos no GitHub. Use os filtros abaixo para navegar por tecnologia.
                  </p>
                      </div>

                {loading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <div className="relative w-16 h-16">
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 dark:border-purple-900 rounded-full"></div>
                      <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 rounded-full animate-spin border-t-transparent"></div>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 px-4 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">{error}</p>
                    <p className="text-red-500 dark:text-red-500 text-sm">Por favor, tente novamente mais tarde.</p>
                  </div>
                ) : (
                  <>
                    <div 
                      className="flex flex-wrap justify-center gap-3 mb-12"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      {availableFilters.map((filterOption) => (
                        <button
                          key={filterOption}
                          onClick={() => setFilter(filterOption)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            filter === filterOption
                              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                              : 'bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-neutral-700'
                          }`}
                        >
                          {filterOption === 'all' ? 'Todos' : filterOption}
                        </button>
                      ))}
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projects.map((project) => (
                        <Suspense key={project.id} fallback={
                          <div className="animate-pulse rounded-xl bg-gray-200 dark:bg-neutral-800 h-[300px]"></div>
                        }>
                          <ProjectCard project={project} />
                        </Suspense>
                      ))}
                    </div>

                    {projects.length === 0 && (
                      <div className="text-center py-12">
                        <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-neutral-800 mb-4">
                          <span className="material-symbols-outlined text-4xl text-gray-400">folder_off</span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">Nenhum projeto encontrado com o filtro selecionado.</p>
                      </div>
                    )}
                  </>
                )}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-20 bg-neutral-800/95 dark:bg-gray-300/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center space-y-4 mb-12">
                    <h2 
                      className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                      data-aos="fade-up"
                    >
                      Habilidades
                    </h2>
                    <p 
                      className="text-gray-300 dark:text-gray-600 text-lg max-w-2xl mx-auto"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      Tecnologias e ferramentas que utilizo para criar soluções inovadoras e experiências digitais impactantes.
                    </p>
                  </div>

                  <div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    {[
                      'HTML',
                      'CSS',
                      'JavaScript',
                      'React',
                      'Node.js',
                      'Python',
                      'Git',
                      'Docker',
                      'AWS',
                      'MongoDB',
                      'TypeScript',
                      'Redux'
                    ].map((skill) => (
                      <Suspense key={skill} fallback={<LoadingFallback />}>
                        <SkillCard skill={skill} />
                      </Suspense>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold font-poppins bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
                    data-aos="fade-up"
                  >
                    Contato
                  </h2>
                  <p 
                    className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    Tem um projeto em mente? Vamos conversar! Preencha o formulário abaixo ou entre em contato através das redes sociais.
                  </p>
                </div>

              <div className="grid md:grid-cols-2 gap-12">
                  <form 
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                  <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Nome
                      </label>
                    <input 
                      type="text" 
                      id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full p-4 bg-neutral-800/90 dark:bg-gray-200/90 border ${
                          errors.name ? 'border-red-500' : 'border-neutral-600 dark:border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-100 dark:text-gray-900`}
                      placeholder="Seu nome"
                    />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                      )}
                  </div>

                  <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                    <input 
                      type="email" 
                      id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-4 bg-neutral-800/90 dark:bg-gray-200/90 border ${
                          errors.email ? 'border-red-500' : 'border-neutral-600 dark:border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-100 dark:text-gray-900`}
                      placeholder="seu@email.com"
                    />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Assunto
                      </label>
                      <input 
                        type="text" 
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full p-4 bg-neutral-800/90 dark:bg-gray-200/90 border ${
                          errors.subject ? 'border-red-500' : 'border-neutral-600 dark:border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-100 dark:text-gray-900`}
                        placeholder="Assunto da mensagem"
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                      )}
                  </div>

                  <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Mensagem
                      </label>
                    <textarea 
                      id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                      rows="6"
                        className={`w-full p-4 bg-neutral-800/90 dark:bg-gray-200/90 border ${
                          errors.message ? 'border-red-500' : 'border-neutral-600 dark:border-gray-300'
                        } rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-gray-100 dark:text-gray-900 resize-none`}
                      placeholder="Sua mensagem..."
                    ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                      )}
                    </div>

                    {submitStatus && (
                      <div className={`p-4 rounded-lg ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-500/10 text-green-500' 
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {submitStatus.message}
                      </div>
                    )}

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all hover:scale-105 shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                          Enviando...
                  </div>
                      ) : (
                        'Enviar Mensagem'
                      )}
                  </button>
                </form>

                  <div 
                    className="space-y-8"
                    data-aos="fade-left"
                    data-aos-delay="300"
                  >
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        Vamos Conversar!
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Estou sempre aberto a novas oportunidades e colaborações. Entre em contato através das redes sociais ou preencha o formulário.
                    </p>
                  </div>

                    <div className="space-y-4">
                      <a 
                        href="https://linkedin.com/in/ronaldo-chiavegatti-sampaio-corrêa-4b858a225" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-neutral-800/90 dark:bg-gray-200/90 border border-neutral-600 dark:border-gray-300 rounded-lg hover:border-purple-500 transition-all group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-700/90 dark:bg-gray-300/90 text-purple-500 group-hover:scale-110 transition-transform">
                          <i className="fa-brands fa-linkedin-in text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-100 dark:text-gray-900">LinkedIn</h4>
                          <p className="text-sm text-gray-400 dark:text-gray-600">Conecte-se comigo</p>
                        </div>
                      </a>

                      <a 
                        href="https://github.com/RonaldoChiavegatti" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-neutral-800/90 dark:bg-gray-200/90 border border-neutral-600 dark:border-gray-300 rounded-lg hover:border-purple-500 transition-all group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-700/90 dark:bg-gray-300/90 text-purple-500 group-hover:scale-110 transition-transform">
                          <i className="fa-brands fa-github text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-100 dark:text-gray-900">GitHub</h4>
                          <p className="text-sm text-gray-400 dark:text-gray-600">Veja meus projetos</p>
                        </div>
                      </a>

                      <a 
                        href="mailto:seu-email@exemplo.com"
                        className="flex items-center gap-4 p-4 bg-neutral-800/90 dark:bg-gray-200/90 border border-neutral-600 dark:border-gray-300 rounded-lg hover:border-purple-500 transition-all group"
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-700/90 dark:bg-gray-300/90 text-purple-500 group-hover:scale-110 transition-transform">
                          <i className="fa-solid fa-envelope text-xl"></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-100 dark:text-gray-900">Email</h4>
                          <p className="text-sm text-gray-400 dark:text-gray-600">Entre em contato</p>
                        </div>
                      </a>
                    </div>
                  </div>
              </div>
            </div>
          </section>
        </main>

          <footer className="border-t border-gray-200 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Logo e Copyright */}
                <div className="text-center md:text-left space-y-4">
                  <h3 className="text-xl font-bold font-montserrat bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Ronaldo Chiavegatti
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600 text-sm">
                    © {new Date().getFullYear()} Todos os direitos reservados.
                  </p>
                </div>

                {/* Links Rápidos */}
                <div className="text-center space-y-4">
                  <h4 className="text-lg font-semibold text-gray-300 dark:text-gray-700">Links Rápidos</h4>
                  <nav className="flex flex-wrap justify-center gap-4 text-gray-400 dark:text-gray-600">
                    <a href="#about" className="hover:text-purple-500 dark:hover:text-purple-600 transition-colors">Sobre</a>
                    <a href="#projects" className="hover:text-purple-500 dark:hover:text-purple-600 transition-colors">Projetos</a>
                    <a href="#skills" className="hover:text-purple-500 dark:hover:text-purple-600 transition-colors">Habilidades</a>
                    <a href="#contact" className="hover:text-purple-500 dark:hover:text-purple-600 transition-colors">Contato</a>
                  </nav>
                </div>

                {/* Redes Sociais */}
                <div className="text-center md:text-right space-y-4">
                  <h4 className="text-lg font-semibold text-gray-300 dark:text-gray-700">Redes Sociais</h4>
                  <div className="flex justify-center md:justify-end gap-4">
                    <a 
                      href="https://github.com/RonaldoChiavegatti" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 dark:bg-gray-200 text-gray-300 dark:text-gray-700 hover:bg-purple-500 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white transition-all duration-300"
                    >
                      <i className="fa-brands fa-github text-xl"></i>
                    </a>
                    <a 
                      href="https://linkedin.com/in/ronaldo-chiavegatti-sampaio-corrêa-4b858a225" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 dark:bg-gray-200 text-gray-300 dark:text-gray-700 hover:bg-purple-500 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white transition-all duration-300"
                    >
                      <i className="fa-brands fa-linkedin-in text-xl"></i>
                    </a>
                    <a 
                      href="mailto:seu-email@exemplo.com"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 dark:bg-gray-200 text-gray-300 dark:text-gray-700 hover:bg-purple-500 dark:hover:bg-purple-500 hover:text-white dark:hover:text-white transition-all duration-300"
                    >
                      <i className="fa-solid fa-envelope text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Botão Voltar ao Topo */}
              <div className="flex justify-center mt-8">
                <a 
                  href="#top"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-purple-500/20"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </a>
            </div>
          </div>
        </footer>
      </div> 
      </motion.div>
    </>
  );
}; 