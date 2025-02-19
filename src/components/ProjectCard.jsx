import React from 'react';

const languageColors = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-red-500',
  HTML: 'bg-orange-500',
  CSS: 'bg-blue-400',
  PHP: 'bg-purple-500',
  Ruby: 'bg-red-600',
  'C#': 'bg-green-600',
  Go: 'bg-blue-300',
};

export const ProjectCard = ({ project }) => {
  return (
    <div 
      data-aos="fade-up"
      className="bg-neutral-800/95 dark:bg-gray-200/95 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-gray-100 dark:text-gray-800 group-hover:text-purple-500 dark:group-hover:text-purple-600 transition-colors">
            {project.name}
          </h3>
          <a 
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-purple-500 dark:hover:text-purple-600 transition-colors"
          >
            <i className="fa-brands fa-github text-2xl"></i>
          </a>
        </div>

        <p className="text-gray-300 dark:text-gray-600 line-clamp-3 min-h-[4.5rem]">
          {project.description || 'Nenhuma descrição disponível.'}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.languages.map((language) => (
            <span
              key={language}
              className={`px-3 py-1 rounded-full text-sm text-white ${
                languageColors[language] || 'bg-gray-500'
              }`}
            >
              {language}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 text-sm text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            <i className="fa-regular fa-star"></i>
            {project.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <i className="fa-solid fa-code-fork"></i>
            {project.forks_count}
          </span>
          <span className="flex items-center gap-1">
            <i className="fa-regular fa-eye"></i>
            {project.watchers_count}
          </span>
        </div>
      </div>
    </div>
  );
}; 