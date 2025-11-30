"use client";

import { LogOut } from "lucide-react";
// Assuming these are correct paths in your environment
import { cn } from "@/lib/utils";
import { useLogout } from "@/hooks/use-Auth";

/**
 * A dedicated button component for logging out a user.
 * It utilizes the useLogout mutation hook to handle the logout process,
 * displays loading state, and applies necessary styling for the sidebar footer.
 */
export function LogoutButton() {
  // ✅ FIX: Call the custom hook at the top level of the component
  const { mutate, isPending } = useLogout();

  // Function to handle the click and trigger the mutation
  const handleLogout = () => {
    // Check if a logout is already in progress to prevent double-clicks
    if (!isPending) {
      // ✅ FIX: Call the returned mutation function, not the hook itself
      mutate();
    }
  };

  return (
    <button
      // 1. Trigger the logout mutation via the handler
      onClick={handleLogout}
      // 2. Prevent accidental multiple submissions during logout
      disabled={isPending}
      // 3. Apply necessary styling using cn utility
      className={cn(
        "w-full flex items-center gap-3 text-sm font-medium text-muted-foreground cursor-pointer",
        "hover:text-foreground hover:bg-accent rounded-lg px-3 py-2 transition",
        // Dim the button and change cursor when pending
        isPending && "opacity-60 cursor-not-allowed animate-pulse"
      )}
    >
      {/* Icon */}
      <LogOut className="h-5 w-5" />

      {/* Text changes based on state */}
      <span>{isPending ? "Logging out..." : "Logout"}</span>
    </button>
  );
}
