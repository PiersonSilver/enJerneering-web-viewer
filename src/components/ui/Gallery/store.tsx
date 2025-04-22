import Slider from "react-slick";
import {
  PropsWithChildren,
  createContext,
  createRef,
  useContext,
  useEffect,
  useRef,
} from "react";
import { GalleryContextValues } from "./type";
import { create, StoreApi } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import fastCompare from "react-fast-compare";
import { subscribeWithSelector } from "zustand/middleware";

const GalleryContext = createContext<StoreApi<GalleryContextValues> | null>(
  null
);

const createGalleryStore = () => {
  return create(
    subscribeWithSelector<GalleryContextValues>((set, get) => ({
      isOpen: false,
      media: [],
      sliderRef: createRef<Slider>(),
      initialedRef: createRef<boolean>(),
      activeIndex: 0,
      openGallery: (activeIndex, media) => {
        set({ activeIndex, media, isOpen: true });
      },
      closeGallery: () => {
        set({ activeIndex: 0, media: [], isOpen: false });
      },
      getActiveMedia: () => {
        const { activeIndex, media } = get();

        return media[activeIndex];
      },
      setActiveIndex: (index) => {
        set({ activeIndex: index });
      },
    }))
  );
};

const GalleryProvider = ({ children }: PropsWithChildren) => {
  const store = useRef<ReturnType<typeof createGalleryStore> | null>(null);

  if (!store.current) {
    store.current = createGalleryStore();
  }

  useEffect(() => {
    if (!store.current) return;

    const unSub = store.current.subscribe(
      ({ isOpen, activeIndex }) => ({
        isOpen,
        activeIndex,
      }),
      ({ isOpen, activeIndex }, prevState) => {
        const hasOpened = isOpen && isOpen === prevState.isOpen;
        const { sliderRef } = store.current?.getState() ?? {};

        if (!hasOpened && isOpen && sliderRef) {
          sliderRef.current?.slickGoTo(activeIndex);
        }
      }
    );

    return () => {
      unSub();
    };
  }, []);

  return (
    <GalleryContext.Provider value={store.current}>
      {children}
    </GalleryContext.Provider>
  );
};

function useGallery(): GalleryContextValues;
function useGallery<T>(selector: (state: GalleryContextValues) => T): T;
function useGallery<T>(selector?: (state: GalleryContextValues) => T) {
  const store = useContext(GalleryContext);

  if (!store) {
    throw new Error("useGallery must be used within GalleryProvider");
  }

  return useStoreWithEqualityFn(store, selector!, fastCompare);
}

export { GalleryProvider, useGallery };
