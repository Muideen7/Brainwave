import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageSquare, FileText, Briefcase, Zap } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // Real data fetching if session exists
  const [chatCount, projectCount] = session?.user ? await Promise.all([
    prisma.chat.count({ where: { userId: session.user.id } }),
    prisma.project.count({ where: { userId: session.user.id } }),
  ]) : [0, 0];

  const recentChats = session?.user ? await prisma.chat.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    take: 5
  }) : [];

  const stats = [
    { label: "AI Sessions", value: chatCount.toString(), icon: MessageSquare, color: "text-color-1" },
    { label: "Saved Notes", value: "0", icon: FileText, color: "text-color-2" },
    { label: "Projects", value: projectCount.toString(), icon: Briefcase, color: "text-color-3" },
    { label: "Token Usage", value: "0%", icon: Zap, color: "text-color-4" },
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="h2 mb-8">Welcome back, {session?.user?.name || 'Explorer'}</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-n-7 border-n-6 overflow-hidden">
                <CardHeader className="pb-2">
                  <Icon className={`${stat.color} mb-2`} size={20} />
                  <p className="text-n-3 text-sm font-code uppercase">{stat.label}</p>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-n-1">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <h3 className="h3 mb-6">Recent Sessions</h3>
        <div className="space-y-4">
          {recentChats.length > 0 ? recentChats.map((chat) => (
            <Link key={chat.id} href={`/chat/${chat.id}`}>
              <div className="flex items-center justify-between p-4 bg-n-7 border border-n-6 rounded-xl hover:border-color-1 transition-colors cursor-pointer group mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-n-6 rounded-lg flex items-center justify-center group-hover:bg-n-5 transition-colors">
                    <MessageSquare size={20} className="text-color-1" />
                  </div>
                  <div>
                    <div className="text-n-1 font-semibold">{chat.title || "Untitled Chat"}</div>
                    <div className="text-n-3 text-xs">Strict Types • Streaming • Updated {new Date(chat.updatedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-color-1 text-sm font-code uppercase font-bold px-4 py-2 border border-color-1/20 rounded-lg bg-color-1/5">
                  Open
                </div>
              </div>
            </Link>
          )) : (
            <div className="text-n-3 text-center py-12 bg-n-7 border border-dashed border-n-6 rounded-xl">
              No recent sessions. Start a new chat to begin.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
