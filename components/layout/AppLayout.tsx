import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-n-8 text-n-1 font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 relative">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
