import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { getPBFieldError } from "../../utils/helpers";
import { Label } from "@/components/shadcn/ui/label";
import { Input } from "@/components/shadcn/ui/input";
import { TheTextInput } from "@/components/form/inputs/TheTextInput";



interface PBTheTextInputProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  field_name: string;
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

export function PBTheTextInput<T>({
  field_name,
  field_key,
  editing = true,
  validation_error,
  className,
  pb_error,
  ...props
}: PBTheTextInputProps<T>) {
  const field_error = getPBFieldError({
    field_key,
    pb_error,
    validation_error,
  });
  const [error_message, setError] = useState(field_error);
  useEffect(() => {
    if (props.error_message) {
      setError((prev) => {
        if (prev !== props.error_message) {
          return props.error_message;
        }
        return prev;
      });
    }
  }, [props.error_message]);

  const default_input_tw = error_message
    ? " border-error border-2"
    : " border-accent";

  function handlePossiblyDateOrUrl(item: typeof props.val) {
    if (item instanceof Date) {
      return item.toISOString();
    }
    if (item instanceof URL) {
      return item.href;
    }
    return item;
  }
  const value = handlePossiblyDateOrUrl(props.val);
  return (
    <div
      key={field_key as string}
      className={twMerge(
        "flex w-full flex-col justify-center gap-1",
        props.container_classname,
      )}
    >
      <TheTextInput
        {...props}
        className={className}
        field_key={field_key}
        field_name={field_name}
        editing={editing}
        val={props.val ?? props.value}
        error_message={error_message}
      />
      {/* <Label
        htmlFor={field_key as string}
        className={twMerge("font-serif text-sm", props.label_classname)}
      >
        {field_name as string}
      </Label>
      {editing ? (
        <div className="flex w-full flex-col">
          <Input
            {...props}
            value={value}
            onKeyDown={(e) => {
              setError(undefined);
            }}
            id={field_key as string}
            name={field_key as string}
            title={props.placeholder}
            className={twMerge(default_input_tw,className)}
          />
          {props.description && editing && (
            <span
          
              className={twMerge(
                "italic text-info mt-2 flex items-center gap-1 f",
                props.description_classname,
              )}
            >
              {props.description}
            </span>
          )}
        </div>
      ) : (
        <div
          className={twMerge(
            "w-full border-b px-0.5 py-1 text-sm",
            props.output_classname,
          )}
        >
          {value}
        </div>
      )}
      {error_message && (
        <span  className="italic">
          {error_message}
        </span>
      )} */}
    </div>
  );
}
