import React from 'react';

const skillsData = {
  HTML: {
    icon: 'fa-html5',
    color: 'text-orange-500',
    brand: true
  },
  CSS: {
    icon: 'fa-css3-alt',
    color: 'text-blue-500',
    brand: true
  },
  JavaScript: {
    icon: 'fa-js',
    color: 'text-yellow-400',
    brand: true
  },
  React: {
    icon: 'fa-react',
    color: 'text-cyan-400',
    brand: true
  },
  'Node.js': {
    icon: 'fa-node-js',
    color: 'text-green-500',
    brand: true
  },
  Python: {
    icon: 'fa-python',
    color: 'text-blue-500',
    brand: true
  },
  Git: {
    icon: 'fa-git-alt',
    color: 'text-orange-600',
    brand: true
  },
  Docker: {
    icon: 'fa-docker',
    color: 'text-blue-500',
    brand: true
  },
  AWS: {
    icon: 'fa-aws',
    color: 'text-orange-500',
    brand: true
  },
  MongoDB: {
    icon: 'database',
    color: 'text-green-500',
    brand: false
  },
  TypeScript: {
    icon: 'code',
    color: 'text-blue-600',
    brand: false
  },
  Redux: {
    icon: 'data_object',
    color: 'text-purple-500',
    brand: false
  }
};

export const SkillCard = ({ skill }) => {
  const skillInfo = skillsData[skill];

  return (
    <div 
      data-aos="zoom-in"
      data-aos-duration="500"
      className="group flex flex-col items-center gap-4 p-6 bg-neutral-800/90 dark:bg-gray-200/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105"
    >
      {skillInfo.brand ? (
        <i className={`fa-brands ${skillInfo.icon} text-4xl ${skillInfo.color} group-hover:scale-110 transition-transform duration-300`}></i>
      ) : (
        <span className={`material-symbols-outlined text-4xl ${skillInfo.color} group-hover:scale-110 transition-transform duration-300`}>
          {skillInfo.icon}
        </span>
      )}
      <span className="font-medium text-center text-gray-300 dark:text-gray-700 group-hover:text-purple-400 dark:group-hover:text-purple-600 transition-colors">
        {skill}
      </span>
    </div>
  );
}; 