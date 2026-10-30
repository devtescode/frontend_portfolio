const ProjectLoading = () => (
  <div
    role="status"
    aria-label="Loading projects"
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {[0, 1, 2].map((item) => (
      <div
        key={item}
        aria-hidden="true"
        className="glass-card rounded-2xl overflow-hidden blur-[2px] opacity-70 animate-pulse"
      >
        <div className="aspect-video bg-muted" />
        <div className="p-6 space-y-4">
          <div className="h-6 w-2/3 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-4/5 rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-muted" />
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="h-6 w-14 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    ))}
    <span className="sr-only">Loading projects...</span>
  </div>
);

export default ProjectLoading;
