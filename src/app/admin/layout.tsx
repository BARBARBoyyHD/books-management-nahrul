import { TanstackProvider } from "@/utils/ReactQueryProviders";
import type { Metadata } from "next";
import ClientAdminLayout from "./clientRootLayout";
// Import the new client component

// NOTE: We don't need to import Geist fonts here, as they should be applied
// in the top-level (app/layout.tsx) body tag globally.

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Administrative panel for the application.",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackProvider>
      <ClientAdminLayout>{children}</ClientAdminLayout>
    </TanstackProvider>
  );
}
