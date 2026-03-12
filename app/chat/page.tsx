import AppLayout from "@/components/layout/AppLayout";
import ChatInterface from "@/components/chat/ChatInterface";

export default function ChatPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="h3">AI Workspace</h1>
          <span className="text-n-4 text-sm font-code uppercase px-3 py-1 bg-n-7 rounded-lg border border-n-6">
            Strict TS | Streaming
          </span>
        </div>
        <ChatInterface />
      </div>
    </AppLayout>
  );
}
