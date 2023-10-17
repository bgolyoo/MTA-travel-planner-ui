import { Button } from '@/components/ui/button.tsx';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Itinerary } from '@/interfaces/itinerary.ts';
import { format } from 'date-fns';
import { Bus, Plane, Train } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Itineraries() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
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
        setItineraries(result);
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
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>From City</TableHead>
                <TableHead>To City</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Transportation</TableHead>
                <TableHead className="text-right space-x-2 w-[200px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itineraries.map((itinerary) => (
                <TableRow key={itinerary.id}>
                  <TableCell className="font-medium">{itinerary.name}</TableCell>
                  <TableCell>
                    <span className="flex space-x-2">
                    <span>{format(new Date(itinerary.fromDate), 'PPP')}</span>
                    <span>-</span>
                    <span>{format(new Date(itinerary.toDate), 'PPP')}</span>
                    </span>
                  </TableCell>
                  <TableCell>{itinerary.fromCity}</TableCell>
                  <TableCell>{itinerary.toCity}</TableCell>
                  <TableCell>{itinerary.hotel}</TableCell>
                  <TableCell>{
                    {
                      ['bus']: (<div className="flex items-center space-x-2"><Bus size="25"/> <span>Bus</span></div>),
                      ['train']: (
                        <div className="flex items-center space-x-2"><Train size="25"/> <span>Train</span></div>),
                      ['plane']: (
                        <div className="flex items-center space-x-2"><Plane size="25"/> <span>Plane</span></div>)
                    }[itinerary.transportation]
                  }</TableCell>
                  <TableCell className="text-right space-x-2 w-[200px]">
                    <Link to={`/${itinerary.id}`}>
                      <Button variant="outline">View</Button>
                    </Link>
                    <Link to={`/${itinerary.id}/update`}>
                      <Button variant="outline">Update</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
