import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import { useProjects } from '@/contexts/ProjectsContext';

const Projects = () => {
  const { projects, loading } = useProjects();


  return (
    <Layout>
      <section className="py-10">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={<>My <span className="gradient-text">Projects</span></>}
            subtitle="A collection of my work showcasing my skills in design, development, and problem-solving."
          />

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Loading projects...
              </p>
            </div>
          )}

          {/* Projects */}
          {!loading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}

          {/* No projects */}
          {!loading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No projects yet. Check back soon!
              </p>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
};

export default Projects;





