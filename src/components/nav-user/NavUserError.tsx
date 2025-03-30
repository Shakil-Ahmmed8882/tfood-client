import { AlertCircle } from "lucide-react";
import { Button } from "../ui/button";

export const NavUserError = ({ refetch }: { refetch: () => void }) => (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm cursor-pointer">
      <div className="flex items-center gap-2 text-red-500">
        <AlertCircle className="h-4 w-4" />
        <span className="text-sm">Failed to load user data.</span>
      </div>
      <Button size={"sm"} onClick={refetch}>
        Retry
      </Button>
    </div>
  );
  