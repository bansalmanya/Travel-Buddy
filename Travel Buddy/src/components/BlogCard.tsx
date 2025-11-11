import { Calendar, User, Heart, MessageCircle, Tag } from 'lucide-react';

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage?: string;
  author: {
    username: string;
    avatar?: string;
  };
  createdAt: string;
  likes: string[];
  comments: any[];
  tags: string[];
  categories: string[];
}

interface BlogCardProps {
  post: BlogPost;
  onViewPost: (id: string) => void;
}

export default function BlogCard({ post, onViewPost }: BlogCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {post.featuredImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            <User size={16} />
            <span>{post.author.username}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={16} />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={() => onViewPost(post._id)}>
          {post.title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs"
              >
                <Tag size={12} />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={() => onViewPost(post._id)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Read More →
          </button>

          <div className="flex items-center space-x-4 text-gray-600 text-sm">
            <div className="flex items-center space-x-1">
              <Heart size={16} />
              <span>{post.likes.length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle size={16} />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}