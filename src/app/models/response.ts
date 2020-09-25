export interface SWAPIResponse<T> {
    count: number;
    next?: any;
    previous?: any;
    results: T[];
}
