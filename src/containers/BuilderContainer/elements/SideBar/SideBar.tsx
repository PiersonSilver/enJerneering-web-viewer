import {
  ChartTrendUpOutlineIcon,
  LayoutWebBoldIcon,
  LayoutWebOutlineIcon,
  SettingsBoldIcon,
  SettingsOutlineIcon,
} from "../../../../assets/icons";
import { IconNavLink } from "@internalComponents/NavLink";

const navIconSize = "1.75rem";
const navItems = [
  {
    href: "/builder",
    icon: <LayoutWebOutlineIcon fontSize={"1.75rem"} />,
    activeIcon: <LayoutWebBoldIcon fontSize={"1.75rem"} />,
    label: "Website",
  },
  {
    href: "/builder/seo",
    icon: <ChartTrendUpOutlineIcon width={navIconSize} height={navIconSize} />,
    activeIcon: (
      <ChartTrendUpOutlineIcon width={navIconSize} height={navIconSize} />
    ),
    label: "Site SEO",
  },
  {
    href: "/builder/settings",
    icon: <SettingsOutlineIcon width={navIconSize} height={navIconSize} />,
    activeIcon: <SettingsBoldIcon width={navIconSize} height={navIconSize} />,
    label: "Settings",
  },
];

export const SideBar = () => {
  return (
    <div className="px-4 flex flex-col">
      <ul className="flex flex-col mb-auto gap-2">
        {navItems.map((navItem) => (
          <li key={navItem.href}>
            <IconNavLink {...navItem} />
          </li>
        ))}
      </ul>
    </div>
  );
};
