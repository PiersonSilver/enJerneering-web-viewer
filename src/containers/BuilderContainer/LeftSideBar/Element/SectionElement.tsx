import {
  LEFT_SIDE_BAR_VIEWS,
  useLeftSideBarStore,
  usePushView,
} from "@stores/builderStore";
import {
  ElementProps,
  Element,
  ElementLabel,
  ElementThumbnail,
} from "./Element";

interface SectionElementProps extends ElementProps {
  compName: string;
}

export const SectionElement = ({
  label,
  compName,
  thumbnail,
}: SectionElementProps) => {
  const pushView = usePushView();
  const setCompName = useLeftSideBarStore((state) => state.setCompName);

  const onElmClick = () => {
    pushView(LEFT_SIDE_BAR_VIEWS.ELM_STYLES);
    setCompName(compName);
  };

  return (
    <Element className="cursor-pointer" onClick={onElmClick}>
      <ElementLabel>{label}</ElementLabel>
      <ElementThumbnail className="group-hover:bg-neutral-300 group-hover:border-neutral-400 transition-colors">
        {thumbnail}
      </ElementThumbnail>
    </Element>
  );
};
