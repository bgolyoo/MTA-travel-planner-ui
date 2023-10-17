import { Button } from '@/components/ui/button.tsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Itineraries() {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/itineraries')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Itineraries</h2>
        <Link to="/create">
          <Button variant="default">Create Itinerary</Button>
        </Link>
      </div>

      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>

      <Button variant="outline">Button</Button>
    </>
  );
}
