import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { TodoLayout } from '../layout';
import { InboxPage } from '../pages/InboxPage';
import { MainPage } from '../pages/MainPage';

import { APP_ROUTES } from './routes';

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <TodoLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: APP_ROUTES.default.path,
                element: <MainPage />,
            },
            {
                path: APP_ROUTES.inbox.path,
                element: <InboxPage />,
            },
        ],
    },
]);
