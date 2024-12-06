import { ProductPicturePurpose } from "@/constants/products";
import { ProductPicture } from "@/types/products";

export const getLobbyImg = (pictures?: ProductPicture[]) => {
  if (!pictures) return null;

  const lobbyImg = pictures.find(
    (picture) => picture.purpose === ProductPicturePurpose.STORE_LOBBY,
  );

  return lobbyImg?.url || null;
};
