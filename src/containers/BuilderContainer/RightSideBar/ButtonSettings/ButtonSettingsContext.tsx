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
import { ButtonSettingsDialogPayload } from "../../../../dialogs/builder/ButtonSettingsDialog";
import { ButtonSettingsData } from "@customTypes/builder";

interface ButtonSettingsProps {
  buttons: ButtonSettingsData[];
  onChange: (buttons: ButtonSettingsData[]) => void;
}

interface ButtonSettingsContextValues extends ButtonSettingsProps {
  onRemoveButton: (buttonId: string) => void;
  openBtnSettings: (buttonSettings: ButtonSettingsData) => void;
  onAddButton: () => void;
}

const ButtonSettingContext =
  createContext<StoreApi<ButtonSettingsContextValues> | null>(null);

const ButtonSettingsContextProvider = ({
  buttons,
  onChange,
  children,
}: PropsWithChildren<ButtonSettingsProps>) => {
  const store = useRef<StoreApi<ButtonSettingsContextValues> | null>(null);
  const { open } = useDialog<ButtonSettingsDialogPayload>("buttonSettings");

  const onRemoveButton = (buttonId: string) => {
    const newButtons = buttons.filter((button) => button.id !== buttonId);
    onChange(newButtons);
  };

  const onApplySettings = (buttonSettings: ButtonSettingsData) => {
    store.current?.setState((state) => {
      const updatedButtons = state.buttons.map((btn) =>
        btn.id === buttonSettings.id ? buttonSettings : btn
      );
  
      console.log("Updated Zustand store buttons:", updatedButtons);
  
      onChange([...updatedButtons]);
      return { buttons: updatedButtons };
    });
  };

  const addButtonSettings = (buttonSettings: ButtonSettingsData) => {
    onChange([...buttons, buttonSettings]);
  };

  const openBtnSettings = (buttonSettingsData: ButtonSettingsData) => {
    open({
      id: "buttonSettings",
      data: {
        ...buttonSettingsData,
        mode: "update",
        onChange: onApplySettings,
      },
    });
  };

  const onAddButton = () => {
    open({
      id: "buttonSettings",
      data: {
        onChange: (newButton: ButtonSettingsData) => {
          store.current?.setState((state) => {
            const updatedButtons = [...state.buttons, newButton];
            onChange(updatedButtons);
            return { buttons: updatedButtons };
          });
        },
        mode: "create",
      },
    });
  };
  

  if (!store.current) {
    store.current = create<ButtonSettingsContextValues>()((set) => ({
      buttons,
      onChange,
      onAddButton,
      openBtnSettings,
      onRemoveButton,
    }));
  }

  useEffect(() => {
    if (buttons) {
      store.current?.setState({ buttons });
    }
  }, [buttons]);

  return (
    <ButtonSettingContext.Provider value={store.current}>
      {children}
    </ButtonSettingContext.Provider>
  );
};

const useButtonSettings = <T,>(
  selector?: (state: ButtonSettingsContextValues) => T
) => {
  const store = useContext(ButtonSettingContext);

  if (!store) {
    throw new Error("Missing ButtonSettingsContextProvider");
  }

  return useStoreWithEqualityFn(store, selector!, fastDeepEqualFn);
};

export { ButtonSettingsContextProvider, useButtonSettings };
