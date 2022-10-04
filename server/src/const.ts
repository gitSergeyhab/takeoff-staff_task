export const AUTH_TOKEN = 'auth-token';
export const NO_SECRET_KEY = 'no-secret';

export enum StatusCode {
    ServerError = 500,
    NotFoundError = 404,
    BadRequest = 400,
    NotAuthError = 401,
    Ok = 200,
    Added = 201,
    Deleted = 204,
}