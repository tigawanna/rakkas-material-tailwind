import { useUser } from "@/lib/rakkas/hooks/useUser";
import { Avatar } from "@material-tailwind/react";
import { UserCircle2 } from "lucide-react";

interface UserCircleProps {}

export function UserCircle({}: UserCircleProps) {
  const { user, user_avatar } = useUser();

  return (
    <div className="w-7 h-7 flex items-center justify-center rounded-full">
      {user?.email ? (
        // <img
        //   src={user_avatar}
        //   alt="avatar"
        //   className="w-7 h-7 rounded-full object-cover"
        // />
        <Avatar
          className="h-8 w-8"
          src={user?.avatar}
          alt={user?.username?.slice(0, 2)}
        />
      ) : (
        <UserCircle2 className="w-7 h-7 rounded-full" />
      )}
    </div>
  );
}
