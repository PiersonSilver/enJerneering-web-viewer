import { Checkbox } from "@internalComponents/Checkbox";

export interface CheckboxOption {
  content: React.ReactNode;
  value: boolean; // might need to be switched back to any later
  id: string;
}

// pierson - Add onChange to checkbox options

export const CheckboxOptions: React.FC<{
   options: CheckboxOption[],
   onChange: (id: string, value: boolean) => void
   }> = ({ options, onChange }) => (
  <div className="flex flex-col flex-1 gap-2">
    {options.map((option, index) => (
      <div className="flex items-center space-x-2" key={index}>
        <Checkbox id={option.id} checked={option.value} 
        onCheckedChange={(checked) => onChange(option.id, !!checked)} 
        />
        <label
          htmlFor={option.id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {option.content}
        </label>
      </div>
    ))}
  </div>
);
