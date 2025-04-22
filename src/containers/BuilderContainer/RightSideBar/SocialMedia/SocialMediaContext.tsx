import { useDialog } from "@/_stores/dialogStore";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { StoreApi, create } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import fastDeepEqualFn from "react-fast-compare";
import { Social } from "@components/Footer/types/FooterData";
import { produce } from "immer";
import { SocialMediaDialogPayload } from "../../../../dialogs/builder/SocialMediaDialog";

type SocialMediaProps = {
  socials: Social[];
  onChange: (socials: Social[]) => void;
};

interface SocialMediaContextValues extends SocialMediaProps {
  onRemoveSocial: (socialId: string) => void;
  onUpdateSocial: (socialMedia: Social) => void;
  onAddSocial: () => void;
}

const SocialSettingContext =
  createContext<StoreApi<SocialMediaContextValues> | null>(null);

const SocialMediaContextProvider = ({
  socials,
  onChange,
  children,
}: PropsWithChildren<SocialMediaProps>) => {
  const store = useRef<StoreApi<SocialMediaContextValues> | null>(null);
  const { open } = useDialog<SocialMediaDialogPayload>("socialMediaItems");

  const onRemoveSocial = (socialId: string) => {
    const socials = store.current?.getState().socials ?? [];
    const newSocials = socials.filter((social) => social.id !== socialId);

    onChange(newSocials);
  };

  const onApplySettings = (socialMedia: Social) => {
    const socials = store.current?.getState().socials ?? [];

    onChange(
      produce(socials, (draft) => {
        const socialIndex = draft.findIndex(
          (social) => social.id === socialMedia.id
        );

        if (socialIndex !== -1) {
          draft.splice(socialIndex, 1, socialMedia);
        }
      })
    );
  };

  const addSocialMedia = (socialMedia: Social) => {
    const socials = store.current?.getState().socials ?? [];

    onChange([...socials, socialMedia]);
  };

  const onUpdateSocial = (social: Social) => {
    open({
      id: "socialMediaItems",
      data: {
        social,
        mode: "update",
        onChange: onApplySettings,
      },
    });
  };

  const onAddSocial = () => {
    open({
      id: "socialMediaItems",
      data: { onChange: addSocialMedia, mode: "create" },
    });
  };

  if (!store.current) {
    store.current = create<SocialMediaContextValues>()((set) => ({
      socials,
      onChange,
      onAddSocial,
      onUpdateSocial,
      onRemoveSocial,
    }));
  }

  useEffect(() => {
    if (socials) {
      store.current?.setState({ socials });
    }
  }, [socials]);

  return (
    <SocialSettingContext.Provider value={store.current}>
      {children}
    </SocialSettingContext.Provider>
  );
};

const useSocialMedia = <T,>(
  selector?: (state: SocialMediaContextValues) => T
) => {
  const store = useContext(SocialSettingContext);

  if (!store) {
    throw new Error("Missing SocialMediaContextProvider");
  }

  return useStoreWithEqualityFn(store, selector!, fastDeepEqualFn);
};

export { SocialMediaContextProvider, useSocialMedia };
