import { useControllableState } from "./useControllAbleState";

export function useStepper(
  steps: number,
  activeStepIndexProp?: number,
  setStepIndexProp?: (index: number) => void
) {
  const [activeStepIndex, setStepIndex] = useControllableState({
    prop: activeStepIndexProp,
    defaultProp: 0,
    onChange: setStepIndexProp,
  });

  const nextStep = () => {
    if (activeStepIndex < steps - 1) {
      setStepIndex((i) => i + 1);
    }
  };

  const previousStep = () => {
    if (activeStepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  };

  const goTo = (index: number) => {
    if (index >= 0 && index <= steps - 1) {
      setStepIndex(index);
    }
  };

  return {
    activeStepIndex,
    steps,
    isFirstStep: activeStepIndex === 0,
    isLastStep: activeStepIndex === steps - 1,
    goTo,
    nextStep,
    previousStep,
  };
}
