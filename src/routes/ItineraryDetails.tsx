import { Button } from '@/components/ui/button.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { Itinerary } from '@/interfaces/itinerary.ts';
import { cn } from '@/lib/utils.ts';
import { format } from 'date-fns';
import { Bus, ChevronLeft, Plane, Train } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function ItineraryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  function deleteItinerary(id: number) {
    fetch(`http://localhost:3000/itineraries/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message);
          });
        }
      })
      .then(() => {
        navigate('/');
        toast({
          title: 'We\'ve deleted your itinerary for you.',
        });
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: 'Uh-oh! There was an error deleting your itinerary.',
          variant: 'destructive'
        });
        setError(err);
        setLoading(false);
      });
  }

  return (
    <>
      <Link to="..">
        <Button variant="outline"><ChevronLeft/> Back to list</Button>
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : itinerary ? (

        <>
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{itinerary.name}</h2>
          </div>
          <div className="grid gap-6">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <div>Departure from</div>
                <div className="font-normal leading-snug text-muted-foreground">
                  {itinerary.fromCity}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <div>Arriving at</div>
                <div className="font-normal leading-snug text-muted-foreground">
                  {itinerary.toCity}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <div>Starting at</div>
                <div className="font-normal leading-snug text-muted-foreground">
                  {format(new Date(itinerary.fromDate), 'PPP')}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <div>Ending at</div>
                <div className="font-normal leading-snug text-muted-foreground">
                  {format(new Date(itinerary.toDate), 'PPP')}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <div>Transportation method</div>
                <div className="font-normal leading-snug text-muted-foreground flex space-x-2">
                  <div>
                    <div
                      className={cn('flex justify-center items-center rounded-md border-2 border-muted bg-popover p-1 aspect-square', itinerary.transportation === 'bus' ? 'border-primary' : '')}>
                      <Bus size="50"/>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Bus</span>
                  </div>
                  <div>
                    <div
                      className={cn('flex justify-center items-center rounded-md border-2 border-muted bg-popover p-1 aspect-square', itinerary.transportation === 'train' ? 'border-primary' : '')}>
                      <Train size="50"/>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Train</span>
                  </div>
                  <div>
                    <div
                      className={cn('flex justify-center items-center rounded-md border-2 border-muted bg-popover p-1 aspect-square', itinerary.transportation === 'plane' ? 'border-primary' : '')}>
                      <Plane size="50"/>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Plane</span>
                  </div>

                </div>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-2">
              <div className="flex flex-col space-y-1">
                <div>Hotel</div>
                <div className="font-normal leading-snug text-muted-foreground">
                  {itinerary.hotel}
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Link to={`/${itinerary.id}/update`}>
                <Button variant="default">Update</Button>
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Itinerary</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this itinerary? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="destructive" type="submit"
                              onClick={() => deleteItinerary(itinerary.id)}>Delete</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </>

      ) : (<></>)
      }
    </>
  );
}
