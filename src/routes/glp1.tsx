import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/fitslim/SectionPage";
import { SECTIONS_BY_SLUG } from "@/lib/fitslim/sections";

export const Route = createFileRoute("/glp1")({
  component: Glp1,
});

function Glp1() {
  return <SectionPage section={SECTIONS_BY_SLUG.glp1} />;
}