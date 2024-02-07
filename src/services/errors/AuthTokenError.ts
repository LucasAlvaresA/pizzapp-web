export class AuthTokenError extends Error {
    constructor() {
        super("Eror with authentication token.");
    }
}
