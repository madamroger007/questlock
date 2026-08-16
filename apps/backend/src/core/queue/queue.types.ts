export type AuthQueueJob =
    | {
        type: 'auth.login';
        payload: {
            userId: string;
            email: string;
        };
    }
    | {
        type: 'auth.login.success';
        payload: {
            userId: string;
            email: string;
        };
    }
    | {
        type: 'auth.logout';
        payload: {
            userId: string;
        };
    }
    | {
        type: 'auth.password.reset';
        payload: {
            userId: string;
        };
    };