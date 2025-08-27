import { useEffect } from "react";
import toast from "react-hot-toast";

/**
 * Custom hook to show flash messages using react-hot-toast
 * @param {object|string} flashInfo - The flash message object or string
 */
export function useToast(flashInfo) {
  useEffect(() => {
    if (!flashInfo) return;

    if (typeof flashInfo === "string") {
      toast(flashInfo);
    } else if (typeof flashInfo === "object") {
      if (flashInfo.error) {
        toast.error(flashInfo.error);
      } else if (flashInfo.success) {
        toast.success(flashInfo.success, {
          duration: 12 * 1000,
        });
      } else if (flashInfo.info) {
        toast.info(flashInfo.info);
      } else if (flashInfo.warning) {
        toast.warning(flashInfo.warning);
      }
    }
  }, [flashInfo]);
}
