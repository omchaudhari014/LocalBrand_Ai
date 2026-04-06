import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Generate from './pages/Generate';
import { auth } from './firebase/config';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
      alert('Failed to log out. Please try again.');
    }
  };
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-300">
        <header className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50 backdrop-blur-md bg-opacity-70 dark:bg-opacity-70">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">LocalBrandAI</h1>
            {user && (
              <nav className="space-x-4 flex items-center">
                <Link to="/" className="hover:text-blue-500 font-medium transition-colors">Dashboard</Link>
                <Link to="/generate" className="hover:text-blue-500 font-medium transition-colors">Create AI Ad</Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md border border-gray-200 dark:border-gray-700 hover:text-blue-500 font-medium transition-colors"
                >
                  Logout
                </button>
              </nav>
            )}
          </div>
        </header>

        <main className="flex-grow flex items-stretch">
          {isAuthLoading ? (
            <div className="flex-1 flex justify-center items-center text-gray-600 dark:text-gray-300">
              Checking authentication...
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
              <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
              <Route path="/generate" element={user ? <Generate /> : <Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
