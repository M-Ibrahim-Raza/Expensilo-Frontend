import { toast } from "react-toastify";
import { CircleCheck, CircleAlert } from "lucide-react";

export const notifySuccess = (msg) =>
  toast.success(msg, {
    icon: <CircleCheck className="bg-theme-teal text-white rounded-full" />,
  });
export const notifyError = (msg) =>
  toast.error(msg, {
    icon: <CircleAlert className="bg-theme-rose text-white rounded-full" />,
  });
