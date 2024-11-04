export interface PaginationResult<T> {
    data: T[];
    total: number;
    totalPages?: number;
    page: number;
    limit: number;
    nextPageUrl?: string | null;
    prevPageUrl?: string | null;
  }  