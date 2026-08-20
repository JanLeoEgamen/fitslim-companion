import { createFileRoute } from "@tanstack/react-router";
import { ChatPage } from "@/components/fitslim/ChatPage";

export const Route = createFileRoute("/chat")({
  component: Chat,
});

function Chat() {
  return <ChatPage />;
}