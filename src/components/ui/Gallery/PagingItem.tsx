import { MediaItem } from "./type";
import Image from "next/image";

type PagingItemMediaProps = {
  media: MediaItem;
};

export const PagingItemMedia = ({ media }: PagingItemMediaProps) => {
  return (
    <div className="w-10 md:w-14 cursor-pointer rounded-lg overflow-hidden transition-all ring-white ring-offset-black">
      <Image
        className="object-cover w-full aspect-square select-none"
        src={media.url}
        width={20}
        height={20}
        alt={media.name}
      />
    </div>
  );
};
