import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { message, chatId } = await req.json();

  let activeChatId = chatId;

  if (session?.user) {
    const userId = session.user.id;
    // If no chatId provided, create a new chat
    if (!activeChatId) {
      const chat = await prisma.chat.create({
        data: {
          title: message.substring(0, 30) + '...',
          userId: userId,
        },
      });
      activeChatId = chat.id;
    }

    // Save user message
    await prisma.message.create({
      data: {
        role: 'user',
        content: message,
        chatId: activeChatId,
      },
    });
  }

  const encoder = new TextEncoder();
  const fullResponse = `This is a strictly typed AI response from Brainwave Next.js 16 to: "${message}". We are optimized for focused thinking.`;
  const words = fullResponse.split(' ');

  const stream = new ReadableStream({
    async start(controller) {
      let aiResponseContent = "";
      for (const word of words) {
        const chunk = word + ' ';
        aiResponseContent += chunk;
        controller.enqueue(encoder.encode(chunk));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      if (session?.user && activeChatId) {
          // Save AI message after completion
          await prisma.message.create({
              data: {
                  role: 'assistant',
                  content: aiResponseContent.trim(),
                  chatId: activeChatId,
              },
          });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Chat-Id': activeChatId || '',
    },
  });
}
