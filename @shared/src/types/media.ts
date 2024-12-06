import {
  EventTypes,
  ItemPicturePurpose,
  ItemPictureType,
  MediaElements,
  MediaItemState,
  MediaItemsType,
  MediaItemsTypesFilterValues,
  MediaModule,
  MediaStatesFilterValues,
} from "constants/media";

import { MultiLanguageText, PaginatedRequest, PaginatedResponse } from "./common";

export type Topic = {
  id: string;
  name?: MultiLanguageText;
  order?: number;
  iconUrl?: string;
  topics?: Omit<Topic, "topics">[];
  newLabelActive?: boolean;
  latestActiveFromDate?: string;
  module?: string;
};

export type MediaItem = {
  uuid: string;
  createdAt: string;
  modifiedAt: string;
  itemOrder: number;
  itemPageTitle?: MultiLanguageText;
  itemPageText?: MultiLanguageText;
  itemPageLink?: MultiLanguageText;
  itemPageLinkUrl?: string;
  listViewTitle?: MultiLanguageText;
  listViewText: MultiLanguageText;
  listViewTag?: string;
  parentTopicUuid: string;
  pictures: ItemPicture[];
  activeFromDate: string;
  activeToDate?: string;
  segmentId: string;
  countryCodeFilterPopulated: boolean;
  countryCodeList: string[];
  machineTypeFilterPopulated: boolean;
  machineTypeList?: string[];
  allowDownload: boolean;
  allowShare: boolean;
  verticalFeedTitle?: MultiLanguageText;
  verticalFeedText?: MultiLanguageText;
  publishVerticalFeed: boolean;
  publishFeedFromDate?: string;
  publishFeedToDate?: string;
  data: MediaItemData;
  friendlyId: number;
  publishedVersion: number;
  state: MediaItemState;
  modifiedBy: string;
  modifiedByName: string;
  targetType?: string;
  likeCount?: number;
  searchable?: string;
};

export type MediaItemData =
  | GalleryData
  | VideoData
  | ArticleData
  | PdfData
  | WordData
  | EventData
  | StepByStepData;

export type GalleryData = {
  itemType: MediaItemsType.GALLERY;
  galleryImages: string[];
};

export type VideoData = {
  itemType: MediaItemsType.VIDEO;
  videoUrl: string;
};

export type MediaElementBase = {
  uuid: string;
};

export type ImagesElement = {
  elementType: MediaElements.IMAGES;
  elementImages: string[];
};

export type TextElement = {
  elementType: MediaElements.TEXT;
  elementText: MultiLanguageText;
};

export type VideoElement = {
  elementType: MediaElements.VIDEO;
  elementVideo: string;
};

export type LinkElement = {
  elementType: MediaElements.LINK;
  elementLink: MultiLanguageText;
  elementLinkUrl: string;
};

type ConcreteElement = TextElement | ImagesElement | VideoElement | LinkElement;

export type MediaElement = MediaElementBase & ConcreteElement;

export type ArticleChapterData = {
  uuid: string;
  chapterNumber: number;
  chapterTitle: MultiLanguageText;
  chapterText: MultiLanguageText;
  chapterElements: MediaElement[];
};

export type ArticleData = {
  itemType: MediaItemsType.ARTICLE;
  articleChapters: ArticleChapterData[];
};

export type PdfData = {
  itemType: MediaItemsType.PDF;
  pdfUrl: string;
};

export type WordData = {
  itemType: MediaItemsType.WORD;
  wordUrl: string;
  previewImage: string;
};

export type EventData = {
  itemType: MediaItemsType.EVENT;
  eventType: EventTypes;
  eventImages: string[];
  eventVideo?: string;
};

export type StepByStepData = {
  itemType: MediaItemsType.STEP_BY_STEP;
  stepsData: StepData[];
};

export type StepData = {
  uuid: string;
  stepNumber: number;
  stepTitle: MultiLanguageText;
  stepElements: MediaElement[];
};

export type Tag = {
  uuid: string;
  name: MultiLanguageText;
};

export type ItemPicture = {
  url: string;
  purpose: ItemPicturePurpose;
  type: ItemPictureType;
};

// API Types
export type GetTopicsResponse = {
  moduleName: MediaModule;
  topics: Topic[];
}[];

export type GetMediaItemsRequest = PaginatedRequest & {
  itemType?: MediaItemsTypesFilterValues;
  countryCode?: string;
  state?: MediaStatesFilterValues;
  topicId?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  query?: string;
  signal?: AbortSignal;
  parentModuleName?: MediaModule;
};

export type GetMediaItemsResponse = PaginatedResponse<MediaItem>;

export type GetMediaItemResponse = MediaItem;
export type GetModuleTagsResponse = {
  moduleName: MediaModule;
  tags: Tag[];
};

export type GalleryScrollAnimationConfig = {
  scrollClassName: string;
  className: string;
  startPx: number;
  endPx: number;
  scrollPx: number;
  time: number;
};
