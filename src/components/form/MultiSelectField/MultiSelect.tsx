"use client";

import fastCompare from "react-fast-compare";
import {
  Command,
  CommandItem,
  CommandEmpty,
  CommandList,
  CommandInput,
} from "@builderComponents/ui/Command";
import { AngleDownIcon, CheckIcon } from "../../../../src/assets/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@internalComponents/Popover";
import { Ripple } from "primereact/ripple";
import React, {
  Fragment,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

type MultiSelectorProps<T = unknown> = {
  values: T[];
  onValuesChange: (value: T[]) => void;
} & React.ComponentPropsWithoutRef<typeof Command>;

type MultiSelectContextProps<T = unknown> = {
  value: T[];
  onValueChange: (value: T) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
};

type MultiSelectorValuesChildrenProps<T = unknown> = {
  value: T;
  onRemove: () => void;
};

type MultiSelectorValuesProps<T = unknown> = {
  children: React.FC<MultiSelectorValuesChildrenProps<T>>;
};

type MultiSelectorItemProps<T = unknown> = {
  value: T;
} & Omit<React.ComponentPropsWithoutRef<typeof CommandItem>, "value">;

const MultiSelectContext = createContext<MultiSelectContextProps | null>(null);

const useMultiSelect = () => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error("useMultiSelect must be used within MultiSelectProvider");
  }
  return context;
};

const MultiSelector = <T extends unknown = unknown>({
  values: value = [],
  onValuesChange: onValueChange,
  className,
  children,
  ...props
}: MultiSelectorProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);

  const onValueChangeHandler = useCallback(
    (val: T) => {
      const isInclude = value.some((v) => fastCompare(v, val));

      if (isInclude) {
        onValueChange(value.filter((v) => !fastCompare(v, val)));
      } else {
        onValueChange([...value, val]);
      }
    },
    [onValueChange, value]
  );

  return (
    <MultiSelectContext.Provider
      value={{
        value,
        onValueChange:
          onValueChangeHandler as MultiSelectContextProps["onValueChange"],
        open,
        setOpen,
        inputValue,
        setInputValue,
      }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <Command
          className={twMerge(
            "overflow-visible bg-transparent flex flex-col space-y-2",
            className
          )}
          {...props}
        >
          {children}
        </Command>
      </Popover>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectorValues = <T,>({
  className,
  children,
}: PropsWithClassName<MultiSelectorValuesProps<T>>) => {
  const { value, onValueChange } = useMultiSelect();

  const removeHandler = (v: T) => () => {
    onValueChange(v);
  };

  return (
    <div className={twMerge("flex flex-wrap gap-1 p-1 py-2", className)}>
      {value.map((v, idx) => (
        <Fragment key={idx}>
          {children({ value: v as T, onRemove: removeHandler(v as T) })}
        </Fragment>
      ))}
    </div>
  );
};

const MultiSelectorTrigger = forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof PopoverTrigger>
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverTrigger
      ref={ref}
      className={twMerge("relative", className)}
      {...props}
      asChild
    >
      <div>
        {children}
        <AngleDownIcon
          width="1.25rem"
          height="1.25rem"
          className="text-neutral-700 right-4 absolute top-1/2 -translate-y-1/2 cursor-pointer"
        />
      </div>
    </PopoverTrigger>
  );
});

MultiSelectorTrigger.displayName = "MultiSelectorTrigger";

const MultiSelectorInput = forwardRef<
  React.ElementRef<typeof CommandInput>,
  React.ComponentPropsWithoutRef<typeof CommandInput>
>(({ className, ...props }, ref) => {
  const { setOpen, inputValue, setInputValue } = useMultiSelect();

  const handleClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <CommandInput
      {...props}
      ref={ref}
      value={inputValue}
      onValueChange={setInputValue}
      onBlur={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onClick={handleClick}
      className={twMerge("pr-12", className)}
    />
  );
});

MultiSelectorInput.displayName = "MultiSelectorInput";

const MultiSelectorContent = forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ children, className, ...props }, ref) => {
  return (
    <PopoverContent
      ref={ref}
      className={twMerge(
        "min-w-[var(--radix-popover-trigger-width)]",
        className
      )}
      onOpenAutoFocus={(e) => e.preventDefault()}
      {...props}
    >
      {children}
    </PopoverContent>
  );
});

MultiSelectorContent.displayName = "MultiSelectorContent";

const MultiSelectorList = forwardRef<
  React.ElementRef<typeof CommandList>,
  React.ComponentPropsWithoutRef<typeof CommandList>
>(({ className, children }, ref) => {
  return (
    <CommandList
      ref={ref}
      className={twMerge(
        "py-1 flex flex-col gap-2 rounded-md w-full",
        className
      )}
    >
      {children}
      <CommandEmpty>
        <span className="text-muted-foreground">No results found</span>
      </CommandEmpty>
    </CommandList>
  );
});

MultiSelectorList.displayName = "MultiSelectorList";

const MultiSelectorItem = <T extends unknown = unknown>({
  className,
  value,
  children,
  disabled,
  ...props
}: MultiSelectorItemProps<T>) => {
  const { value: Options, onValueChange, setInputValue } = useMultiSelect();

  const mousePreventDefault = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onSelect = () => {
    onValueChange(value);
    setInputValue("");
  };

  const isIncluded = Options.some((option) => fastCompare(option, value));

  return (
    <CommandItem
      {...props}
      onSelect={onSelect}
      className={twMerge(
        "p-ripple relative flex w-full cursor-default select-none items-center pr-4 pl-12 py-3.5 font-medium text-sm border-b border-border-100 hover:bg-background-100 transition-colors outline-none",
        isIncluded && "opacity-50 cursor-default",
        className
      )}
      onMouseDown={mousePreventDefault}
    >
      {children}
      {isIncluded && (
        <CheckIcon
          className="absolute top-1/2 -translate-y-1/2 left-5"
          width="1rem"
          height="1rem"
        />
      )}
      <Ripple />
    </CommandItem>
  );
};

export {
  MultiSelector,
  MultiSelectorTrigger,
  MultiSelectorInput,
  MultiSelectorContent,
  MultiSelectorList,
  MultiSelectorItem,
  MultiSelectorValues,
};
