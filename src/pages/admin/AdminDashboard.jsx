import { FolderKanban, Eye, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { useProjectNumbers, useProjects } from '@/hooks/useProjects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QueryState from '@/components/QueryState';
import { Button } from '@/components/ui/button';

const stats = [
  {
    title: 'Total Projects',
    value: '0',
    icon: FolderKanban,
    change: 'Live project count',
  },
  {
    title: 'Portfolio Views',
    value: '—',
    icon: Eye,
    change: 'Analytics API not connected',
  },
  {
    title: 'Engagement Rate',
    value: '—',
    icon: TrendingUp,
    change: 'Analytics API not connected',
  },
];

const AdminDashboard = () => {
  const projectsQuery = useProjects({ refetchInterval: 10_000, refetchIntervalInBackground: false });
  const projectNumbersQuery = useProjectNumbers({ refetchInterval: 10_000, refetchIntervalInBackground: false });
  const { projects } = projectsQuery;
  const lastUpdated = Math.max(projectsQuery.dataUpdatedAt || 0, projectNumbersQuery.dataUpdatedAt || 0);
  const isRefreshing = projectsQuery.isFetching || projectNumbersQuery.isFetching;
  const refreshDashboard = () => Promise.all([projectsQuery.refetch(), projectNumbersQuery.refetch()]);
  const now = new Date();
  const newProjectsThisMonth = projects.filter((project) => {
    if (!project.createdAt) return false;
    const createdAt = new Date(project.createdAt);
    return createdAt.getFullYear() === now.getFullYear() && createdAt.getMonth() === now.getMonth();
  }).length;

  const updatedStats = [
    { ...stats[0], value: projectNumbersQuery.isLoading ? '…' : projectNumbersQuery.isError ? '—' : String(projectNumbersQuery.data?.allProjects ?? projects.length) },
    stats[1],
    { ...stats[2], value: String(newProjectsThisMonth), change: 'Created this month' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-bold font-display mb-2">
            Welcome back! 👋
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-muted-foreground">
              Here's what's happening with your portfolio.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted-foreground">
                {lastUpdated ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}` : 'Waiting for data'} · refreshes every 10 sec
              </span>
              <Button variant="outline" size="sm" onClick={refreshDashboard} disabled={isRefreshing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
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
            <QueryState
              isLoading={projectsQuery.isLoading}
              isError={projectsQuery.isError}
              error={projectsQuery.error}
              isEmpty={projects.length === 0}
              onRetry={projectsQuery.refetch}
              emptyTitle="No projects yet"
              emptyMessage="Add your first project to see it here."
            >
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div
                    key={project._id}
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
            </QueryState>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
