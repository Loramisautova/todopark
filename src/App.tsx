import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.scss';
import { Layout, ConfigProvider } from 'antd';

import './styles/global.scss';

import { MainPage } from './pages/MainPage';
import { InboxPage } from './pages/InboxPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainPage />,
        // errorElement: <ErrorPage />,
    },
    {
        path: '/inbox',
        element: <InboxPage />,
    }
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
              <RouterProvider router={router} />
          </Layout>
      </ConfigProvider>
  );
}

export default App;
