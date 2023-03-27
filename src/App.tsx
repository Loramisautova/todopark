import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import { Layout, ConfigProvider } from 'antd';

import './styles/global.scss';

import { MainPage } from './pages/MainPage';
import { InboxPage } from './pages/InboxPage';

import { TodoLayout } from './layout';
import { GlobalProvider } from './GlobalProvider';

import { APP_ROUTES } from './router/routes';

const router = createBrowserRouter([
    {
        path: '/',
        element: <TodoLayout />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: APP_ROUTES.default.path,
                element: <MainPage />
            },
            {
                path: APP_ROUTES.inbox.path,
                element: <InboxPage />
            }
        ]
    },
]);

function App() {
  return (
      <ConfigProvider
          theme={{
              token: {
                  colorPrimary: '#db4c3f',
              },
          }}
      >
          <Layout className="layout">
              <GlobalProvider>
                  <RouterProvider router={router} />
              </GlobalProvider>
          </Layout>
      </ConfigProvider>
  );
}

export default App;
