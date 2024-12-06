export type MachineType = {
  code: string;
  name: string;
  description?: string;
  division: string;
  materialNumbers: string[];
  handpieces?: Handpiece[];
  picture: string;
  userManual?: string;
  schemaVersion?: string;
  uuid: string;
  createdAt: string;
  modifiedAt: string;
};

export type Handpiece = {
  handpieceName: string;
  order: number;
  colorRgb: string;
  pictureUrl: string;
};
