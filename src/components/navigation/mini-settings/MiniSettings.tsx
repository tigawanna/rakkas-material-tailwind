import { useState } from "react";
import { Avatar, Button } from "@material-tailwind/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { CurrentUserSection } from "./CurrentUserSection";
import { ThemeToggle } from "./ThemeToggle";
import { useUser } from "@/lib/rakkas/hooks/useUser";

interface MiniSettingsModalProps {}

export function MiniSettingsModal({}: MiniSettingsModalProps) {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu modal open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar
          className="h-8 w-8"
          src={user?.avatar}
          alt={user?.username?.slice(0, 2)}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 " align="end" forceMount>
        <DropdownMenuSeparator />



        <DropdownMenuSeparator />
        {/* theme toggle */}
        <ThemeToggle />
        <DropdownMenuSeparator />
        {/* logout button */}
        <CurrentUserSection setOpen={setOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
