import App from '@/App.tsx';
import { CreateItinerary } from '@/routes/CreateItinerary.tsx';
import ErrorPage from '@/routes/ErrorPage.tsx';
import { Itineraries } from '@/routes/Itineraries.tsx';
import { ItineraryDetails } from '@/routes/ItineraryDetails.tsx';
import { UpdateItinerary } from '@/routes/UpdateItinerary.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Itineraries/>
      },
      {
        path: '/create',
        element: <CreateItinerary/>
      },
      {
        path: '/:id/update',
        element: <UpdateItinerary/>
      },
      {
        path: '/:id',
        element: <ItineraryDetails/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
