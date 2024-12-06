export enum MediaModule {
  TREASURE_TROVE = "TREASURE_TROVE",
  SUPPORT_DESK = "SUPPORT_DESK",
}

export enum MediaStatesFilterValues {
  ALL = "All",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum ItemPictureType {
  ICON = "ICON",
  SMALL = "SMALL",
  LARGE = "LARGE",
}

export enum ItemPicturePurpose {
  LIST_VIEW_CARD = "LIST_VIEW_CARD",
  VERTICAL_FEED = "VERTICAL_FEED",
}

export enum MediaItemsType {
  GALLERY = "GALLERY",
  VIDEO = "VIDEO",
  ARTICLE = "ARTICLE",
  PDF = "PDF",
  WORD = "WORD",
  STEP_BY_STEP = "STEP_BY_STEP",
  EVENT = "EVENT",
}

export const mediaItemsTypesLabels = {
  [MediaItemsType.GALLERY]: "Gallery",
  [MediaItemsType.VIDEO]: "Video",
  [MediaItemsType.ARTICLE]: "Article",
  [MediaItemsType.PDF]: "Pdf",
  [MediaItemsType.WORD]: "Word",
  [MediaItemsType.STEP_BY_STEP]: "Step-By-Step",
  [MediaItemsType.EVENT]: "Event",
};

export const mediaItemsTypesOptions = Object.entries(mediaItemsTypesLabels).map(([id, label]) => ({
  id,
  label,
}));

export enum MediaItemsTypesFilterValues {
  ALL = "All",
  GALLERY = MediaItemsType.GALLERY,
  VIDEO = MediaItemsType.VIDEO,
  ARTICLE = MediaItemsType.ARTICLE,
  PDF = MediaItemsType.PDF,
  WORD = MediaItemsType.WORD,
  STEP_BY_STEP = MediaItemsType.STEP_BY_STEP,
  EVENT = MediaItemsType.EVENT,
}

export enum MediaItemState {
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export enum MediaElements {
  IMAGES = "IMAGES",
  TEXT = "TEXT",
  VIDEO = "VIDEO",
  LINK = "LINK",
}

export enum EventTypes {
  IN_PERSON = "IN_PERSON",
  ONLINE = "ONLINE",
}
