import {
  AITextAreaField,
  AITextField,
} from "@builderComponents/form/TextField";
import { Form } from "@internalComponents/FormField";
import { useForm } from "react-hook-form";

type MainContentFormValues = {
  header: string;
  subHeader: string;
};

export const MainContentForm = () => {
  const mainContentForm = useForm<MainContentFormValues>({
    mode: "onChange",
    defaultValues: {
      header: "",
      subHeader: "",
    },
  });

  const { control } = mainContentForm;

  return (
    <Form {...mainContentForm}>
      <div className="space-y-4">
        <AITextField
          control={control}
          name="header"
          placeholder="Enter header content"
          label="Header"
        />
        <AITextAreaField
          control={control}
          name="subHeader"
          placeholder="Enter sub-header"
          label="Sub-header"
        />
      </div>
    </Form>
  );
};
