import Carousel from './Carousel.jsx';

const BlogPostCarousel = ({ posts }) => {
  return (
    <Carousel
      title="📝 Latest Blog Posts"
      items={posts}
      itemsPerView={3}
      autoScroll={true}
      autoScrollInterval={6000}
      renderItem={(post) => (
        <a href={`/blog/${post.slug}`} className="block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-xl group cursor-pointer">
          <div className="aspect-video overflow-hidden">
            {post.data.thumbnail ? (
              <img
                src={post.data.thumbnail}
                alt={post.data.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <div className="text-white text-3xl font-bold">
                  {post.data.title.charAt(0)}
                </div>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              {new Date(post.data.pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {post.data.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              {post.data.description}
            </p>
            
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.data.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </a>
      )}
    />
  );
};

export default BlogPostCarousel;
