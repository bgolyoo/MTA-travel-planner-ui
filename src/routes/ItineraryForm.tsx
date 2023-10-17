import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { cn } from '@/lib/utils.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { addWeeks, format } from 'date-fns';
import { Bus, CalendarIcon, ChevronDownIcon, Plane, Train } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const usCities: [string, ...string[]] = [
  'Atlanta, Georgia',
  'Los Angeles, California',
  'Chicago, Illinois',
  'Dallas/Fort Worth, Texas',
  'Denver, Colorado',
  'New York, New York',
  'San Francisco, California',
  'Las Vegas, Nevada',
  'Miami, Florida',
  'Orlando, Florida',
  'Seattle, Washington',
  'Houston, Texas',
  'Boston, Massachusetts',
  'Phoenix, Arizona',
  'Philadelphia, Pennsylvania',
  'Minneapolis-Saint Paul, Minnesota',
  'Charlotte, North Carolina',
  'Detroit, Michigan',
  'Washington, D.C.',
  'San Diego, California'
];

export const hotels: string[] = [
  'Dreamscape Inn',
  'Mystic Haven Hotel & Spa',
  'Whispering Pines Lodge',
  'Starlight Suites',
  'Golden Sands Resort',
  'Eternal Charm Hotel',
  'Sapphire Skies Lodge',
  'Tranquil Oasis Resort',
  'Enchanted Woods Inn',
  'Azure Horizon Hotel',
  'Secret Garden Retreat',
  'Moonlit Mirage Lodge',
  'Crystal Waters Resort',
  'Silver Moon Hotel',
  'Emerald Isle Inn',
  'Rainbow Retreat Lodge',
  'Aurora Borealis Hotel',
  'Harmony Haven Resort',
  'Sunset Serenity Inn',
  'Whimsical Wonderland Hotel'
];


const itineraryFormSchema = z.object({
  name: z.string({ required_error: 'Please enter a name.' })
    .min(2, 'Name should be at least 2 characters long.')
    .max(50, 'Name should be less then 50 characters long.'),
  fromCity: z.enum(usCities, { required_error: 'Please select a city.' }),
  toCity: z.enum(usCities, { required_error: 'Please select a city.' }),
  fromDate: z.date({ required_error: 'Please select a date.' }),
  toDate: z.date({ required_error: 'Please select a date.' }),
  transportation: z.enum(['bus', 'train', 'plane'], { required_error: 'Please select a transportation method.' }),
  hotel: z.string({ required_error: 'Please select a hotel.' })
});

export type ItineraryFormValues = z.infer<typeof itineraryFormSchema>

export function ItineraryForm({ defaultValues, actions, submit }: {
  actions?: React.ReactNode,
  defaultValues: Partial<ItineraryFormValues>,
  submit: (val: ItineraryFormValues) => void
}) {

  const form = useForm<ItineraryFormValues>({
    resolver: zodResolver(itineraryFormSchema),
    defaultValues
  });

  function onSubmit(data: ItineraryFormValues) {
    submit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="w-[300px]" placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="fromCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Departure from</FormLabel>
                <div className="relative w-max">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-[300px] appearance-none bg-transparent font-normal'
                      )}
                      {...field}
                    >
                      {usCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50"/>
                </div>
                <FormDescription></FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arriving at</FormLabel>
                <div className="relative w-max">
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-[300px] appearance-none bg-transparent font-normal'
                      )}
                      {...field}
                    >
                      {usCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </FormControl>
                  <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50"/>
                </div>
                <FormDescription></FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Starting at</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[300px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        date && form.setValue('toDate', addWeeks(date, 1));
                      }}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ending at</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[300px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(form.getValues('fromDate'))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="transportation"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Transportation method</FormLabel>
              <FormDescription/>
              <FormMessage/>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-md grid-cols-3 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="bus" className="sr-only"/>
                    </FormControl>
                    <div
                      className="flex justify-center items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground aspect-square">
                      <Bus size="50"/>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Bus</span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="train" className="sr-only"/>
                    </FormControl>
                    <div
                      className="flex justify-center items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground aspect-square">
                      <Train size="50"/>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Train</span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                    <FormControl>
                      <RadioGroupItem value="plane" className="sr-only"/>
                    </FormControl>
                    <div
                      className="flex justify-center items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground aspect-square">
                      <Plane size="50"/>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">Plane</span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hotel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel</FormLabel>
              <div className="relative w-max">
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[300px] appearance-none bg-transparent font-normal'
                    )}
                    {...field}
                  >
                    {hotels.map((hotel) => (
                      <option key={hotel} value={hotel}>{hotel}</option>
                    ))}
                  </select>
                </FormControl>
                <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50"/>
              </div>
              <FormDescription></FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />

        {actions ? (
          <div className="flex space-x-4">
            {actions}
          </div>
        ) : (<></>)
        }
      </form>
    </Form>
  );
}
