import type { ReactNode } from "react";
import { Bookmark } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * Reusable confirmation before saving a resource to Saved. Wraps a trigger
 * (button) as a child; "Save" runs the caller's save action.
 */
export function SaveConfirmDialog({
  onConfirm,
  title,
  children,
}: {
  onConfirm: () => void;
  title?: string;
  children: ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-[20px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Save this to Saved?</AlertDialogTitle>
          <AlertDialogDescription>
            {title
              ? `"${title}" will be added to your Saved resources.`
              : "It will be added to your Saved resources."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-[12px]">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="gap-1.5 rounded-[12px] bg-teal text-white hover:bg-bright-teal"
          >
            <Bookmark className="h-4 w-4" /> Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
