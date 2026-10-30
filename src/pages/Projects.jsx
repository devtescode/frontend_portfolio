import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import QueryState from '@/components/QueryState';
import ProjectLoading from '@/components/ProjectLoading';
import { useProjects } from '@/hooks/useProjects';

const Projects = () => {
  const { projects, isLoading, isError, error, refetch } = useProjects();

  return (
    <Layout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={<>My <span className="gradient-text">Projects</span></>}
            subtitle="A collection of my work showcasing my skills in design, development, and problem-solving."
          />

          <QueryState
            isLoading={isLoading}
            isError={isError}
            error={error}
            isEmpty={projects.length === 0}
            onRetry={refetch}
            loadingLabel="Loading projects..."
            loadingContent={<ProjectLoading />}
            emptyTitle="No projects yet"
            emptyMessage="Check back soon!"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  // key={project._id}
                   key={project._id || project.id || index}
                  className="fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </QueryState>

        </div>
      </section>
    </Layout>
  );
};

export default Projects;





