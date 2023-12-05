import { IUseFormError } from "@/components/form/useForm";
import {
  Input,
  Textarea,
  TextareaProps,
  Typography,
} from "@material-tailwind/react";
import { ClientResponseError } from "pocketbase";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { getPBFieldError } from "../../utils/helpers";

type MTTextareaProps = Omit<TextareaProps, "ref">;

interface PbTheTextAreaInputProps<T> extends MTTextareaProps {
  field_name: React.ReactNode;
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

export function PbTheTextAreaInput<T>({
  field_name,
  field_key,
  editing = true,
  error,
  pb_error,
  validation_error,
  className,
  ...props
}: PbTheTextAreaInputProps<T>) {
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
      {editing ? (
        <div className="flex w-full flex-col">
          <Textarea
            {...props}
            value={value}
            onKeyDown={(e) => {
              setError(undefined);
            }}
            id={field_key as string}
            name={field_key as string}
            title={props.placeholder}
     
          />
          {props.description && editing && (
            <Typography
              variant="small"
              className={twMerge(
                "text-xs italic text-info mt-2 flex items-center gap-1 f",
                props.description_classname,
              )}
            >
              {props.description}
            </Typography>
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
        <Typography
          variant="small"
          className="italic text-error"
        >
          {error_message}
        </Typography>
      )}
    </div>
  );
}
