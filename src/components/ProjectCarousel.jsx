import Carousel from './Carousel.jsx';

const ProjectCarousel = ({ projects }) => {
  return (
    <Carousel
      title="🚀 Featured Projects"
      items={projects}
      itemsPerView={3}
      autoScroll={false}
      renderItem={(project) => (
        <a href={project.link} className="block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl group cursor-pointer">
          <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-4xl group-hover:scale-110 transition-transform duration-300">
              {project.title === "Magical Mercury Website" ? "🌐" :
               project.title === "PII Detection Toolkit" ? "🔍" :
               project.title === "AI Chat Assistant" ? "🤖" : "📋"}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                project.status === 'Live' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                project.status === 'Open Source' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
              }`}>
                {project.status}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {project.tech.slice(0, 3).map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </a>
      )}
    />
  );
};

export default ProjectCarousel;
