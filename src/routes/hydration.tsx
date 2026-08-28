import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/fitslim/SectionPage";
import { SECTIONS_BY_SLUG } from "@/lib/fitslim/sections";

export const Route = createFileRoute("/hydration")({
  component: Hydration,
});

function Hydration() {
  return <SectionPage section={SECTIONS_BY_SLUG.hydration} />;
}