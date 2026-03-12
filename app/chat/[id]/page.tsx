import ChatInterface from "@/components/chat/ChatInterface";
import AppLayout from "@/components/layout/AppLayout";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <AppLayout><ChatInterface initialMessages={[]} chatId={id} /></AppLayout>;
  }

  const chat = await prisma.chat.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: 'asc' } } }
  });

  if (!chat || chat.userId !== (session.user as { id: string }).id) {
    notFound();
  }

  const initialMessages = chat.messages.map(m => ({
    role: m.role as "user" | "assistant",
    content: m.content
  }));

  return (
    <AppLayout>
      <ChatInterface initialMessages={initialMessages} chatId={id} />
    </AppLayout>
  );
}
