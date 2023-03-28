import { ConfigProvider, Layout } from 'antd';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { appRouter } from './router/router';
import { RootStoreProvider } from './store/RootStoreProvider';

import './App.scss';
import './styles/global.scss';

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#db4c3f',
                },
            }}
        >
            <Layout className='layout'>
                <RootStoreProvider>
                    <RouterProvider router={appRouter} />
                </RootStoreProvider>
            </Layout>
        </ConfigProvider>
    );
}

export default App;
