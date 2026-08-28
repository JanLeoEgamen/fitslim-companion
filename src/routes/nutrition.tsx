import { createFileRoute } from "@tanstack/react-router";
import { SectionPage } from "@/components/fitslim/SectionPage";
import { SECTIONS_BY_SLUG } from "@/lib/fitslim/sections";

export const Route = createFileRoute("/nutrition")({
  component: Nutrition,
});

function Nutrition() {
  return <SectionPage section={SECTIONS_BY_SLUG.nutrition} />;
}