export interface IServerURL {
    DEV: string,
    PRODUCTION: string
}

export const ServerURL: IServerURL = {
    DEV: 'http://localhost:5001/',
    PRODUCTION: 'https://crew-cooperating.herokuapp.com/'
}
