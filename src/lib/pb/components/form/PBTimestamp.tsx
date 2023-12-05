import { dateToString } from "@/utils/helpers/others";
import { Typography } from "@material-tailwind/react";

interface PbTimesProps {
  label?: React.ReactNode;
  timestamp: Date | string;
}

export function PBTimeStamp({ timestamp, label }: PbTimesProps) {
  return (
    <div className=" flex items-center justify-between  text-sm gap-2">
      {label && label}

      <Typography
        variant="small"
        className={""}
      >
        {dateToString(timestamp)}
      </Typography>

      <h3></h3>
    </div>
  );
}
