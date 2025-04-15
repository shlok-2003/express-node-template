/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Success {
    success: true;
    message: string;
    data?: Record<string, any>;
    [key: string]: any;
}

export interface Error {
    success: false;
    message: string;
    error?: any;
    data?: Record<string, any>;
    [key: string]: any;
}

export type ResBody = Success | Error;
