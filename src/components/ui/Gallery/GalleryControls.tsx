import { twJoin } from "tailwind-merge";
import { downloadAsset } from "@utils/file";
import { Button } from "@internalComponents/Button";
import {
  AngleLeftIcon,
  AngleRightIcon,
  CloseIcon,
  DownloadIcon,
} from "../../../../src/assets/icons";
import { useGallery } from "./store";
import { tv } from "tailwind-variants";

const controlClassName = tv({
  base: "!bg-black/30 brightness-75 hover:brightness-100 backdrop-blur-xl text-neutral-50",
});

export const GalleryControls = () => {
  const [closeGallery, getActiveMedia] = useGallery((state) => [
    state.closeGallery,
    state.getActiveMedia,
  ]);

  const onDownloadMedia = async () => {
    const asset = getActiveMedia();
    downloadAsset(asset.url, asset.name);
  };

  return (
    <div className="flex item-center justify-end gap-3 p-8 absolute top-0 left-0 w-full z-10">
      <Button
        icon={<DownloadIcon width="1.25rem" height="1.25rem" />}
        onClick={onDownloadMedia}
        size="md"
        variant="soft"
        className={controlClassName()}
      />

      <Button
        onClick={closeGallery}
        icon={<CloseIcon width="1.25rem" height="1.25rem" />}
        size="md"
        variant="soft"
        className={controlClassName()}
      />
    </div>
  );
};

export const SliderControls = () => {
  const [sliderRef, activeIndex, media] = useGallery((state) => [
    state.sliderRef,
    state.activeIndex,
    state.media,
  ]);

  const arrowBtnClass = "absolute top-1/2 -translate-y-1/2";
  const isPrevDisabled = activeIndex <= 0;
  const isNextDisabled = activeIndex >= media.length - 1;

  const onPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const onNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <>
      <Button
        className={twJoin(
          "w-14 h-14 left-8 hidden md:flex disabled:opacity-45",
          controlClassName(),
          arrowBtnClass
        )}
        onClick={onPrev}
        disabled={isPrevDisabled}
        icon={<AngleLeftIcon width="1.5rem" height="1.5rem" />}
        variant="soft"
      ></Button>
      <Button
        className={twJoin(
          "w-14 h-14 right-8 hidden md:flex disabled:opacity-45",
          controlClassName(),
          arrowBtnClass
        )}
        onClick={onNext}
        disabled={isNextDisabled}
        icon={<AngleRightIcon width="1.5rem" height="1.5rem" />}
        variant="soft"
      />
    </>
  );
};
