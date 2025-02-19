import { useState, useEffect } from 'react';

export const useGitHubProjects = (username) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          'Accept': 'application/vnd.github.v3+json',
          ...(process.env.REACT_APP_GITHUB_TOKEN && {
            'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
          })
        };

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`,
          { headers }
        );
        
        if (!response.ok) {
          throw new Error(
            response.status === 403 
              ? 'Limite de requisições excedido. Por favor, configure o token do GitHub.'
              : response.status === 404
              ? 'Usuário não encontrado.'
              : 'Falha ao buscar projetos do GitHub.'
          );
        }

        const data = await response.json();
        
        // Buscar linguagens para cada repositório com tratamento de erro individual
        const projectsWithLanguages = await Promise.all(
          data.map(async (repo) => {
            try {
              const languagesResponse = await fetch(repo.languages_url, { headers });
              const languages = languagesResponse.ok 
                ? await languagesResponse.json() 
                : {};
              
              return {
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                watchers_count: repo.watchers_count,
                languages: Object.keys(languages),
                created_at: repo.created_at,
                updated_at: repo.updated_at
              };
            } catch (err) {
              console.error(`Erro ao buscar linguagens para ${repo.name}:`, err);
              return {
                ...repo,
                languages: []
              };
            }
          })
        );

        // Filtrar projetos que não são forks e ordenar por data de atualização
        const filteredProjects = projectsWithLanguages
          .filter(project => !project.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        setProjects(filteredProjects);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar projetos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProjects();
    }
  }, [username]);

  // Filtrar projetos por linguagem
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.languages.includes(filter));

  // Obter lista única de linguagens disponíveis
  const availableFilters = ['all', ...new Set(projects.flatMap(project => project.languages))].filter(Boolean);

  return {
    projects: filteredProjects,
    loading,
    error,
    filter,
    setFilter,
    availableFilters,
  };
}; 