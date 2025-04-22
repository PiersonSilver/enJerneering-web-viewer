import Image from "next/image";
import { MediaItem } from "./type";

type GalleryItemProps = {
  media: MediaItem;
};

export const GalleryItem = ({ media }: GalleryItemProps) => {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <Image
        src={media.url}
        alt={media.url}
        fill
        sizes=""
        className="object-contain w-auto h-auto max-h-full"
      />
    </div>
  );
};
