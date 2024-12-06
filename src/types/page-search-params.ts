export type PageParams = {
  searchParams: SearchParams;
};

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
