import { REG_NON_NUMBER } from "@/_constants/regex";
import { clamp } from "lodash";
import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from "react";

interface AlphaInputProps {
  onChange: (alpha: number) => void;
  alpha: number;
}

export const AlphaInput = ({
  onChange,
  alpha,
  className,
}: PropsWithClassName<AlphaInputProps>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const editingRef = useRef(false);

  const opacity = Math.round(alpha * 100);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const alphaStr = e.target.value.replace(REG_NON_NUMBER, "");

    if (alphaStr) {
      const alphaValue = clamp(+alphaStr, 0, 100);
      onChange(alphaValue / 100);
    }

    e.target.value = alphaStr ?? "";
  };

  const onFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.setSelectionRange(0, e.target.value.length);
    editingRef.current = true;
  };

  const resetValue = useCallback(() => {
    if (inputRef.current) {
      const suffix = editingRef.current ? "" : "%";

      inputRef.current.value = opacity + suffix;
    }
  }, [opacity]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      resetValue();
    }
  };

  const onBlur = () => {
    editingRef.current = false;
    resetValue();
  };

  useEffect(() => {
    resetValue();
  }, [resetValue]);

  return (
    <input
      className={className}
      onChange={handleChange}
      ref={inputRef}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};
