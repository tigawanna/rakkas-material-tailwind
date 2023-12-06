import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { getPBFieldError } from "../../utils/helpers";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { TheTextAreaInput } from "@/components/form/inputs/TheTextArea";



interface PBTheTextAreaInputProps<T>
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  field_name: string;
  field_key: keyof T;
  error_message?: string;
  container_classname?: string;
  label_classname?: string;
  description_classname?: string;
  output_classname?: string;
  editing?: boolean;
  description?: string;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}

export function PBTheTextAreaInput<T>({
  field_name,
  field_key,
  editing = true,
  validation_error,
  pb_error,
  className,
  ...props
}: PBTheTextAreaInputProps<T>) {
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
  // console.log("the text input error message ",error_message)
  // console.log("the text input props error message", props.error_message);

  const default_textarea_tw = error_message
    ? " border-error border-2"
    : " border border-accent";
  function handlePossiblyDateOrUrl(item: typeof props.value) {
    if (item instanceof Date) {
      return item.toISOString();
    }
    if (item instanceof URL) {
      return item.href;
    }
    return item;
  }
  const value = handlePossiblyDateOrUrl(props.value);

  return (
    <div
      key={field_key as string}
      className={twMerge(
        "flex w-full flex-col justify-center gap-1",
        props.container_classname,
      )}
    >
      <TheTextAreaInput
        {...props}
        className={className}
        field_key={field_key}
        field_name={field_name}
        editing={editing}
        error_message={error_message}
      />
      {/* {editing ? (
        <div className="flex w-full flex-col">
          <Textarea
            onKeyDown={(e) => {
              setError(undefined);
            }}
            {...props}
            id={field_key as string}
            name={field_key as string}
            title={props.placeholder}
            className={twMerge(default_textarea_tw,className)}
          />
          {props.description && editing && (
            <span
   
              className={twMerge(
                "text-xs italic text-info mt-2 flex items-center gap-1 f",
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
        <span
         className="italic text-error"
        >{error_message}
        </span>
      )} */}
    </div>
  );
}
