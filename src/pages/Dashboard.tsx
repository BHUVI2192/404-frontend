import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  FolderOpen,
  MoreVertical,
  Edit2,
  Trash2,
  Settings,
  Code,
  LogOut,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  lastModified: string;
}

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "My First AI Project", lastModified: "2 hours ago" },
    { id: "2", name: "Web Scraper Bot", lastModified: "1 day ago" },
    { id: "3", name: "Image Generator", lastModified: "3 days ago" },
  ]);

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: `New Project ${projects.length + 1}`,
      lastModified: "Just now",
    };
    setProjects([newProject, ...projects]);
    toast.success("Project created!");
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast.success("Project deleted");
  };

  const handleRenameProject = (id: string) => {
    toast.info("Rename feature coming soon!");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card/50 backdrop-blur-sm">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              404
            </span>
          </Link>

          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start bg-muted"
            >
              <FolderOpen className="w-5 h-5 mr-3" />
              Projects
            </Button>
            <Link to="/studio" className="block">
              <Button variant="ghost" className="w-full justify-start">
                <Code className="w-5 h-5 mr-3" />
                Studio
              </Button>
            </Link>
            <Link to="/settings" className="block">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground">
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-muted-foreground text-lg">
                  Continue where you left off or start something new
                </p>
              </div>
              <Button
                size="lg"
                onClick={handleCreateProject}
                className="gradient-accent shadow-glow"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Project
              </Button>
            </div>

            {projects.length === 0 ? (
              <Card className="p-16 text-center gradient-card border-0 shadow-lg">
                <FolderOpen className="w-20 h-20 mx-auto mb-6 text-muted-foreground opacity-50" />
                <h2 className="text-2xl font-semibold mb-4">No projects yet</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Create your first project to start building with AI
                </p>
                <Button
                  size="lg"
                  onClick={handleCreateProject}
                  className="gradient-accent shadow-glow"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Project
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="p-6 gradient-card border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-glow">
                        <FolderOpen className="w-6 h-6 text-white" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem onClick={() => toast.info("Opening project...")}>
                            <FolderOpen className="w-4 h-4 mr-2" />
                            Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleRenameProject(project.id)}
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Link to="/studio">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Last modified {project.lastModified}
                      </p>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
