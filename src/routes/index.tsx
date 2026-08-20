import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/fitslim/LandingPage";

// Root renders the public landing page. Log in (or explore the demo) to
// reach the app experience.
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <LandingPage />;
}
