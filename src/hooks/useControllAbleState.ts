import * as React from "react";

type UseControllableStateParams<T = unknown> = {
  prop?: T;
  defaultProp?: T;
  onChange?: (state: T) => void;
};

type SetStateFn<T = unknown> = (prevState: T) => T;

function useControllableState<T = unknown>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = useUncontrolledState({
    defaultProp,
    onChange,
  });
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const setValue: React.Dispatch<React.SetStateAction<T>> = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const setter = nextValue as SetStateFn<T>;
        const value =
          typeof nextValue === "function" ? setter(prop) : nextValue;
        if (value !== prop) onChange(value as T);
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChange]
  );

  return [value, setValue] as const;
}

function useUncontrolledState<T = unknown>({
  defaultProp,
  onChange,
}: Omit<UseControllableStateParams<T>, "prop">) {
  const uncontrolledState = React.useState<T>(defaultProp as T);
  const [value] = uncontrolledState;
  const prevValueRef = React.useRef(value);

  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChange && onChange(value as T);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef, onChange]);

  return uncontrolledState;
}

export { useControllableState };
