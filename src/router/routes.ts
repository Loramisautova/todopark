export const APP_ROUTES = {
    root: {
        path: '/',
        todo: {
            path: '/todos/:id'
        },
    },
    inbox: {
        path: '/inbox',
        todo: {
            path: ':id'
        },
    },
    upcoming: {
        path: '/upcoming',
    },
} as const;
