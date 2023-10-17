import { Button } from '@/components/ui/button.tsx';
import { ToastAction } from '@/components/ui/toast.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { hotels, ItineraryForm, ItineraryFormValues, usCities } from '@/routes/ItineraryForm.tsx';
import { addWeeks } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const defaultValues: Partial<ItineraryFormValues> = {
  name: '',
  fromCity: usCities[0],
  toCity: usCities[1],
  fromDate: new Date(),
  toDate: addWeeks(new Date(), 1),
  transportation: 'plane',
  hotel: hotels[0]
};

export function CreateItinerary() {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  function onSubmit(data: ItineraryFormValues) {
    setLoading(false);
    fetch('http://localhost:3000/itineraries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((result) => {
        setLoading(false);
        toast({
          title: 'We\'ve created your itinerary for you.',
          action: <Link to={`/${result.id}`}><ToastAction altText="View">View</ToastAction></Link>
        });
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: 'Uh-oh! There was an error creating your itinerary.',
          variant: 'destructive'
        });
      });
  }

  const actions = (
    <>
      <Link to="..">
        <Button variant="outline">Cancel</Button>
      </Link>
      <Button type="submit" disabled={loading}>Create</Button>
    </>
  );

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create Itinerary</h2>
      </div>

      <ItineraryForm submit={onSubmit} defaultValues={defaultValues} actions={actions}></ItineraryForm>
    </>
  );
}
