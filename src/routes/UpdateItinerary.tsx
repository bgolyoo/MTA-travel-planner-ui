import { Button } from '@/components/ui/button.tsx';
import { ToastAction } from '@/components/ui/toast.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { Itinerary } from '@/interfaces/itinerary.ts';
import { ItineraryForm, ItineraryFormValues } from '@/routes/ItineraryForm.tsx';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function UpdateItinerary() {
  const { id } = useParams();

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/itineraries/${id}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
        return response.json();
      })
      .then((result) => {
        setItinerary(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  const { toast } = useToast();

  function onSubmit(data: ItineraryFormValues, id: number) {
    setLoading(false);
    fetch(`http://localhost:3000/itineraries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setLoading(false);
        toast({
          title: 'We\'ve updated your itinerary for you.',
          action: <Link to={`/${result.id}`}><ToastAction altText="View">View</ToastAction></Link>
        });
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: 'Uh-oh! There was an error updating your itinerary.',
          variant: 'destructive'
        });
      });
  }

  const actions = (
    <>
      <Link to="..">
        <Button variant="outline">Cancel</Button>
      </Link>
      <Button type="submit" disabled={loading}>Update</Button>
    </>
  );

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : itinerary ? (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Update Itinerary</h2>
      </div>
      <ItineraryForm
        submit={(data) => onSubmit(data, itinerary.id)}
        defaultValues={{
          name: itinerary.name,
          fromCity: itinerary.fromCity,
          toCity: itinerary.toCity,
          fromDate: new Date(itinerary.fromDate),
          toDate: new Date(itinerary.toDate),
          transportation: itinerary.transportation as 'bus' | 'train' | 'plane',
          hotel: itinerary.hotel
        }}
        actions={actions}/>
    </>
  ) : (<></>);

}
