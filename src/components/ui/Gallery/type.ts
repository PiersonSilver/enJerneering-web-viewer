import { UploadedFile } from "@schema/file";
import Slider from "react-slick";

export type MediaItem = UploadedFile;

export type GalleryContextData = {
  isOpen: boolean;
  media: MediaItem[];
  sliderRef: React.RefObject<Slider>;
  initialedRef: React.RefObject<boolean>;
  activeIndex: number;
};

export type openGalleryFn = (activeIndex: number, media: MediaItem[]) => void;
export type closeGalleryFn = () => void;
export type getActiveMediaFn = () => MediaItem;
export type setActiveIndexFn = (index: number) => void;

export type GalleryContextActions = {
  openGallery: openGalleryFn;
  closeGallery: closeGalleryFn;
  getActiveMedia: getActiveMediaFn;
  setActiveIndex: setActiveIndexFn;
};

export type GalleryContextValues = GalleryContextData & GalleryContextActions;
