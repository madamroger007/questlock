import { ContentfulStatusCode } from 'hono/utils/http-status';

export class AppError extends Error {
    constructor(
        public override message: string,
        public statusCode: ContentfulStatusCode = 400
    ) {
        super(message);
        this.name = 'AppError';
    }
}