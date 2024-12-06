export type PaginatedResponse<T> = {
  totalItemCount: number;
  items: T[];
};
