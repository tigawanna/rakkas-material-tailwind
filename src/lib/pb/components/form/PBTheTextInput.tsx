import { TheTextInput } from "@/components/form/inputs/TheTextInput";
import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";

import type { InputProps } from "@material-tailwind/react";
import { getPBFliedError } from "../../utils/helpers";

type MTInputProps = Omit<InputProps,"ref">

interface PbTheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: React.ReactNode;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  val?: string | Date | URL | number | readonly string[] | undefined;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}
interface FieldError {
  message: string;
  code: string;
}

export function PbTheTextInput<T>({
  field_name,
  field_key,
  editing = true,
  validation_error,
  className,
  pb_error,
  ...props
}: PbTheTextInputProps<T>) {
const field_error = getPBFliedError({field_key,pb_error,validation_error})  
  return (
    <div className="w-full flex flex-col gap-1">
      <TheTextInput
        {...props}
        className={className}
        field_key={field_key}
        field_name={field_name}
        editing={editing}
        val={props.val ?? props.value}
        error_message={field_error}
      />
    </div>
  );
}
