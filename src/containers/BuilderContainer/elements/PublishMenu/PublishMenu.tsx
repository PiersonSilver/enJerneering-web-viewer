import { publishDomains } from "@builder/meta";
import {
  AngleDownSmallIcon,
  ArrowRightSmallIcon,
  ArrowUpRightSquareBoldIcon,
  ShoppingCartPlusIcon,
} from "../../../../assets/icons";
import { Button } from "@internalComponents/Button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@internalComponents/Popover";
import { ScrollArea } from "@internalComponents/ScrollArea";
import xor from "lodash/xor";
import { Fragment, useState } from "react";
import { DomainItem } from "./DomainItem";
import { Separator } from "@builderComponents/ui/Separator";
import { enqueueSnackbar } from "notistack";
import { useCartStore } from "@/_stores/cartStore";

export const PublishMenu = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const addToCart = useCartStore((state) => state.addToCart);

  const onToggleDomain = (domain: string) => {
    setSelectedDomains((state) => xor(state, [domain]));
  };

  const checkSelectedDomain = (domain: string) => {
    return selectedDomains.includes(domain);
  };

  const onAddToCart = () => {
    enqueueSnackbar({
      title: "Site Added to Cart",
      message:
        "Your site is now added to your cart and ready to publish after payment.",
      className: "w-[25rem]",
    });

    addToCart({
      projectId: new Date().toISOString(),
      thumbnail: "/img/demo-project-cover.png",
      projectName: "Project name",
      subPagesQty: 2,
      price: 100,
      addOnIds: [],
      isSelected: true,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <ArrowUpRightSquareBoldIcon width="1.25rem" height="1.25rem" />
          Publish Site
          <AngleDownSmallIcon width="1.25rem" height="1.25rem" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="rounded-md px-6 py-7.5 border-none"
        collisionPadding={{ right: 6 }}
      >
        <p className="text-sm">Choose publish destination:</p>
        <ScrollArea className="max-h-96 mt-1 mb-5">
          <div>
            {publishDomains.map((domainItem) => (
              <Fragment key={domainItem.domain}>
                <DomainItem
                  {...domainItem}
                  isSelected={checkSelectedDomain(domainItem.domain)}
                  onToggle={onToggleDomain}
                />
                <Separator orientation="horizontal" />
              </Fragment>
            ))}
          </div>
        </ScrollArea>
        <div className="space-x-4">
          <PopoverClose asChild>
            <Button label="Cancel" variant="outline" />
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              label="Add to Cart"
              icon={<ShoppingCartPlusIcon width="1.25rem" height="1.25rem" />}
              iconPos="right"
              onClick={onAddToCart}
            />
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              label="Publish to selected domains"
              icon={<ArrowRightSmallIcon width="1.25rem" height="1.25rem" />}
              variant="dark"
              iconPos="right"
            />
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
