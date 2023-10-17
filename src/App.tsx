import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="md:hidden">
        <img
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <img
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="min-h-screen w-full flex flex-col">
        <div className="border-b flex h-16 items-center">
          <nav className="container flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Itineraries
            </Link>
            <Link
              to="/create"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Create Itinerary
            </Link>
            <Link
              to="/1/update"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Update Itinerary
            </Link>
            <Link
              to="/1"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Itinerary
            </Link>
          </nav>
        </div>
        <div className="container flex-1 space-y-4 p-8 pt-6">
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default App;
