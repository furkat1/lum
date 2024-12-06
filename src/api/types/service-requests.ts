export type GetOpenRequestsRequest = { accountIds: string[] } | { userIds: string[] };
export type GetOpenRequestsResponse = {
  byAccount: {
    [accountId: string]: number;
  };
  byUser: {
    [userId: string]: number;
  };
};
