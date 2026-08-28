import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/fitslim/SectionPage";
import { SECTIONS_BY_SLUG } from "@/lib/fitslim/sections";

export const Route = createFileRoute("/exercise")({
  component: Exercise,
});

function Exercise() {
  return <SectionPage section={SECTIONS_BY_SLUG.exercise} />;
}