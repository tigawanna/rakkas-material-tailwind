import { IUseFormError } from "@/components/form/useForm";
import { Checkbox, CheckboxProps, Typography } from "@material-tailwind/react";
import { ClientResponseError } from "pocketbase";
import { useState, useEffect } from "react";
import { getPBFieldError } from "../../utils/helpers";


interface PBTheCheckboxProps<T> extends Omit<CheckboxProps, "ref"> {
  field_name: string;
  field_key: keyof T;
  error_message?: string;
  validation_error?: IUseFormError | null;
  pb_error?: ClientResponseError | null;
}

export function PBTheCheckbox<T>({field_key,field_name,validation_error,pb_error,...props}:PBTheCheckboxProps<T>){
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
return (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <Checkbox
      crossOrigin={""}
      {...props}
      label={field_name}
      id={field_key as string}
    />
    {error_message && (
      <Typography
        variant="small"
        className={"italic text-error"}
      >
        {error_message}
      </Typography>
    )}
  </div>
);
}
