import { oneClickOauthLogin } from "@/lib/pb/client";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { Button } from "@material-tailwind/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GithubIcon, Loader } from "lucide-react";
import { navigate } from "rakkasjs";
import { toast } from "react-toastify";

interface OAuthprovidersProps {}

export function OAuthproviders({}: OAuthprovidersProps) {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (provider: "github" | "google") => {
      return tryCatchWrapper(oneClickOauthLogin(provider));
    },
    onSuccess(data, variables, context) {
      if (data && data?.data) {
        toast("Welcome" + data?.data?.username, {
          type: "success",
        });
        qc.invalidateQueries({ queryKey: ["utility_staff"] });
        navigate("/dashboard");
      }
      if (data.error) {
        toast(data.error.message, { type: "error", autoClose: false });
      }
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 ">
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
 
        <Button
        size="sm"
          variant="gradient"
          className="flex gap-3 justify-center items-center bg-accent/10 min-w-[30%]"
        >
          <GithubIcon
            // className="w-6 h-6"
            onClick={() => mutation.mutate("github")}
            />
            Github 
          {mutation.isPending && <Loader className="animate-spin" />}
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
