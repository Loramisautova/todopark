type AppRoute = {
    path: string;
};

export const APP_ROUTES: Record<string, AppRoute> = {
    default: {
        path: '/',
    },
    inbox: {
        path: '/inbox',
    },
    upcoming: {
        path: '/upcoming',
    },
    todo: {
        path: 'todo/:id'
    },
};
