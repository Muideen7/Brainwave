import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Briefcase, Calendar, MessageSquare } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  const projects = session?.user ? await prisma.project.findMany({
    where: { userId: (session.user as { id: string }).id },
    include: { _count: { select: { chats: true } } },
    orderBy: { updatedAt: 'desc' }
  }) : [];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="h2">Your Projects</h1>
          <Button className="bg-n-1 text-n-8 hover:bg-n-2 gap-2">
            <Plus size={18} />
            New Project
          </Button>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <Card key={project.id} className="bg-n-7 border-n-6 hover:border-color-1 transition-colors group cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Briefcase className={`text-color-${(idx % 4) + 1}`} size={24} />
                    <span className="text-[10px] font-code uppercase text-n-4 px-2 py-1 bg-n-8 rounded border border-n-6">Active</span>
                  </div>
                  <CardTitle className="h4 mt-4 group-hover:text-color-1 transition-colors">{project.name}</CardTitle>
                  <CardDescription className="text-n-3 body-2">
                    {project.description || "Exploring new AI architectures and their applications in modern workspace productivity."}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="justify-between border-t border-n-6 pt-4 mt-2">
                  <div className="flex items-center gap-2 text-xs font-code uppercase text-n-4">
                    <MessageSquare size={14} />
                    {project._count.chats} Chats
                  </div>
                  <div className="flex items-center gap-2 text-xs font-code uppercase text-n-4">
                    <Calendar size={14} />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-n-7 border border-dashed border-n-6 rounded-2xl">
            <Briefcase className="mx-auto text-n-4 mb-4" size={48} />
            <h3 className="text-n-1 font-semibold mb-2">No projects yet</h3>
            <p className="text-n-3 mb-6">Create your first project to organize your AI conversations.</p>
            <Button className="bg-color-1 text-n-1 hover:bg-color-1/80">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
