/* -----------------------------------------------------------------------------
   Core Client types
   ----------------------------------------------------------------------------- */

export interface RequestOptions {
  start?: number
  limit?: number
  params?: Object
}

export interface IClient {
  http_get(api: string, path: string, opt?: RequestOptions)
}

export class PagedResponse<T> {
  values: T[]
  size: number
  limit: number
  start: number
  nextPageStart: number
  isLastPage: boolean

  private client: IClient
  private base_path: string

  constructor(c: { new(client: IClient, data: any):T }, client: IClient, base_path: string, data: any) {
    this.client = client
    this.size = data.size
    this.limit = data.limit
    this.start = data.start
    this.nextPageStart = data.nextPageStart
    this.isLastPage = data.isLastPage
    this.values = data.values.map(v => new c(client, v))
  }

  /**
   * Get the next page of results.
   *
   * @return Promise<PagedResponse<T>>
   */
  nextPage() {
    // TODO
  }
}
