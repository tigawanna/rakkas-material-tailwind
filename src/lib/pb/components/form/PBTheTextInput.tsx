import { IUseFormError } from "@/components/form/useForm";
import { ClientResponseError } from "pocketbase";
import { getPBFliedError } from "../../utils/helpers";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Input, InputProps, Typography } from "@material-tailwind/react";

type MTInputProps = Omit<InputProps, "ref">;

interface PbTheTextInputProps<T> extends MTInputProps {
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

export function PbTheTextInput<T>({
  field_name,
  field_key,
  editing = true,
  validation_error,
  className,
  pb_error,
  ...props
}: PbTheTextInputProps<T>) {
  const field_error = getPBFliedError({
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

  // const default_input_tw = error_message
  //   ? " input  input-sm w-full border-error border-2"
  //   : "input  input-sm w-full border-accent";

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
      {editing ? (
        <div className="flex w-full flex-col">
          <Input
            crossOrigin={""}
            {...props}
            value={value}
            onKeyDown={(e) => {
              setError(undefined);
            }}
            id={field_key as string}
            name={field_key as string}
            title={props.placeholder}
            // className={twMerge(default_input_tw, className)}
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
          className="italic"
        >
          {error_message}
        </Typography>
      )}
    </div>
  );
}
