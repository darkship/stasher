export interface RequestOptions {
    start?: number;
    limit?: number;
}
export interface IClient {
    http_get(api: string, path: string, opt?: RequestOptions): any;
}
export interface ValueConstructorFn<T> {
    (client: IClient, data: any): T;
}
export declare class PagedResponse<T> {
    values: T[];
    size: number;
    limit: number;
    start: number;
    nextPageStart: number;
    isLastPage: boolean;
    opt: RequestOptions;
    private client;
    private base_path;
    private field;
    private ctor;
    constructor(ctor: ValueConstructorFn<T>, client: IClient, base_path: string, data: any, field?: string, opt?: RequestOptions);
    /**
     * Get the next page of results.
     *
     * @return Promise<PagedResponse<T>>
     */
    nextPage(): any;
}
export declare class DefaultPagedResponse extends PagedResponse<any> {
    constructor(client: IClient, base_path: string, data: any, field?: string, opt?: RequestOptions);
}
