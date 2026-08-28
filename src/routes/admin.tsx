import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "@/components/fitslim/AdminPage";

export const Route = createFileRoute("/admin")({
  component: Admin,
});

function Admin() {
  return <AdminPage />;
}
