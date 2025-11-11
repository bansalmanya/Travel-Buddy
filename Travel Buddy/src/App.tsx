import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editPostId, setEditPostId] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedPostId(null);
    setEditPostId(null);
  };

  const handleViewPost = (id: string) => {
    setSelectedPostId(id);
    setCurrentPage('post-detail');
  };

  const handleEditPost = (id: string) => {
    setEditPostId(id);
    setCurrentPage('edit-post');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onViewPost={handleViewPost} />;
      case 'post-detail':
        return selectedPostId ? (
          <PostDetailPage postId={selectedPostId} onBack={() => handleNavigate('home')} />
        ) : (
          <HomePage onViewPost={handleViewPost} />
        );
      case 'admin':
        return (
          <AdminDashboard
            onCreatePost={() => handleNavigate('create-post')}
            onEditPost={handleEditPost}
            onViewPost={handleViewPost}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onLoginSuccess={() => handleNavigate('home')} />;
      case 'create-post':
        return <CreatePostPage onBack={() => handleNavigate('home')} />;
      case 'edit-post':
        return editPostId ? (
          <CreatePostPage onBack={() => handleNavigate('admin')} editPostId={editPostId} />
        ) : (
          <HomePage onViewPost={handleViewPost} />
        );
      default:
        return <HomePage onViewPost={handleViewPost} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        {renderPage()}
      </div>
    </AuthProvider>
  );
}

export default App;