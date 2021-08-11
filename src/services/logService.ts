import { toast } from "react-toastify";

export default function log(...message) {
  console.log(...message);
  toast.error(message);
}
