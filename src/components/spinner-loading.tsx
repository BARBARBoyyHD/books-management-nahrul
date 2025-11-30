import { Spinner } from "@/components/ui/spinner";

export function SpinnerLoading() {
  return (
    <div className="flex items-center gap-6 w-full justify-center h-full">
      <Spinner className="size-8 text-blue-600" />
    </div>
  );
}