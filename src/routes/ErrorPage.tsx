import { ChevronLeft } from 'lucide-react';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
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
        <div className="container flex-1 flex flex-col space-y-4 p-8 pt-6">
          <h1 className="text-3xl font-bold tracking-tight">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <Link to={'/'} className="">
            <span className="flex space-x-2">
              <ChevronLeft/>Go back to the homepage
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
