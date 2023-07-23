import { FolderProvider } from "@/lib/context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <FolderProvider>
      <div className="bg-zinc-300">
        {children}
      </div>
    </FolderProvider>
  )
}