import React from 'react';

export default function BlogCard({ post, index, totalPosts }) {
  const formattedDate = new Date(post.data.pubDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className="post-card group" data-tags={JSON.stringify(post.data.tags || [])}>
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Thumbnail */}
        <div className="md:col-span-1">
          {post.data.thumbnail ? (
            <div className="aspect-video rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <img 
                src={post.data.thumbnail} 
                alt={post.data.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <div className="text-white text-4xl font-bold">
                {post.data.title.charAt(0)}
              </div>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <time className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {formattedDate}
            </time>
            {post.data.readingTime && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{post.data.readingTime}</span>
              </>
            )}
            {post.data.featured && (
              <>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <span className="text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded-full">
                  Featured
                </span>
              </>
            )}
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <a href={`/blog/${post.slug}`} className="hover:underline">
              {post.data.title}
            </a>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {post.data.description}
          </p>
          
          {/* Tags */}
          {post.data.tags && post.data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.data.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          
          <a 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
          >
            Read more
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      
      {index < totalPosts - 1 && (
        <hr className="mt-12 border-gray-200 dark:border-gray-700" />
      )}
    </article>
  );
}
