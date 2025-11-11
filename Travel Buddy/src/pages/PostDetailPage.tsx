import { useState, useEffect } from 'react';
import { Calendar, User, Heart, MessageCircle, Share2, Tag, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PostDetailPageProps {
  postId: string;
  onBack: () => void;
}

export default function PostDetailPage({ postId, onBack }: PostDetailPageProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const { user, token, isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch(${import.meta.env.VITE_MONGODB_API_URL}/posts/${postId});
      const data = await response.json();
      setPost(data);

      if (user) {
        setIsLiked(data.likes.includes(user.id));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like posts');
      return;
    }

    try {
      const response = await fetch(${import.meta.env.VITE_MONGODB_API_URL}/posts/${postId}/like, {
        method: 'POST',
        headers: {
          'Authorization': Bearer ${token}
        }
      });

      const data = await response.json();
      setIsLiked(data.isLiked);
      setPost({ ...post, likes: Array(data.likes).fill('') });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert('Please login to comment');
      return;
    }

    if (!comment.trim()) return;

    try {
      const response = await fetch(${import.meta.env.VITE_MONGODB_API_URL}/posts/${postId}/comment, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer ${token}
        },
        body: JSON.stringify({ content: comment })
      });

      if (response.ok) {
        setComment('');
        fetchPost();
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post?.title;

    const shareUrls: { [key: string]: string } = {
      twitter: https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)},
      facebook: https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)},
      linkedin: https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-xl text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to posts</span>
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.featuredImage && (
            <div className="h-96 overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center justify-between mb-6 pb-6 border-b">
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center space-x-2">
                  <User size={20} />
                  <span>{post.author.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={20} />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${
                    isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                  } transition-colors`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                  <span>{post.likes.length}</span>
                </button>

                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle size={20} />
                  <span>{post.comments.length}</span>
                </div>

                <div className="relative group">
                  <button className="text-gray-600 hover:text-blue-600">
                    <Share2 size={20} />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50"
                    >
                      Share on LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    <Tag size={14} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="prose max-w-none mb-8">
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
            </div>

            {post.videoUrl && (
              <div className="mb-8">
                <video controls className="w-full rounded-lg">
                  <source src={post.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {post.images && post.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {post.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={Gallery ${index + 1}}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Comments ({post.comments.length})
            </h2>

            {isAuthenticated ? (
              <form onSubmit={handleComment} className="mb-8">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post Comment
                </button>
              </form>
            ) : (
              <p className="mb-8 text-gray-600">Please login to comment</p>
            )}

            <div className="space-y-4">
              {post.comments.map((comment: any) => (
                <div key={comment._id} className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{comment.username}</span>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}