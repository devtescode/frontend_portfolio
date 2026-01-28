import { FolderKanban, Eye, TrendingUp, Clock } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useProjects } from '@/contexts/ProjectsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  {
    title: 'Total Projects',
    value: '0',
    icon: FolderKanban,
    change: '+2 this month',
  },
  {
    title: 'Portfolio Views',
    value: '1,234',
    icon: Eye,
    change: '+12% from last month',
  },
  {
    title: 'Engagement Rate',
    value: '24%',
    icon: TrendingUp,
    change: '+5% from last month',
  },
];

const AdminDashboard = () => {
  const { projects, featuredProjects } = useProjects();

  const updatedStats = [
    { ...stats[0], value: projects.length.toString() },
    stats[1],
    stats[2],
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold font-display mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your portfolio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {updatedStats.map((stat) => (
            <Card key={stat.title} className="glass-card border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.slice(-5).map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <img
                      src={project.url}
                      alt={project.projectName}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{project.projectName}</h4>
                      <p className="text-sm text-muted-foreground truncate">
                        {project.techStack?.join(', ')}
                      </p>
                    </div>
                    {project.featured && (
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No projects yet. Add your first project!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
