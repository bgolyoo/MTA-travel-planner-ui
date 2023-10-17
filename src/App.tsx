import { Toaster } from '@/components/ui/toaster.tsx';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col">
        <div className="border-b flex h-16 items-center">
          <nav className="container flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Itineraries
            </Link>
          </nav>
        </div>
        <div className="container flex-1 space-y-4 p-8 pt-6">
          <Outlet/>
          <Toaster />
        </div>
      </div>
    </>
  );
}

export default App;
