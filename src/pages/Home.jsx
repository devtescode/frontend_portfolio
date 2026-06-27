import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Palette, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/ui/ProjectCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { useProjects } from '@/contexts/ProjectsContext';

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Tailwind', icon: '🎨' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Python', icon: '🐍' },
];

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Optimized performance with modern build tools and best practices.' },
  { icon: Palette, title: 'Beautiful Design', description: 'Clean, modern UI/UX that delights users and drives engagement.' },
  { icon: Code2, title: 'Clean Code', description: 'Maintainable, scalable code following industry best practices.' },
  { icon: Shield, title: 'Secure & Reliable', description: 'Enterprise-grade security with robust error handling.' },
];

const Home = () => {
  const { latestProjects, loading } = useProjects();

  const hasEnoughProjects = latestProjects && latestProjects.length >= 3;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 text-center max-w-4xl">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
            I Build <span className="gradient-text">Digital Experiences</span> That Matter
          </h1>

          <p className="text-xl text-muted-foreground mb-8">
            I’m <span className="font-semibold">Teslim Agboola</span>, a Full-Stack Engineer building scalable web apps.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/projects">View My Work <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 border-y">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8">
          {techStack.map(t => (
            <div key={t.name} className="flex items-center gap-2">
              <span>{t.icon}</span>
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of my best work."
          />

          {/* LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading projects...</p>
            </div>
          )}

          {/* PROJECTS GRID (ONLY IF >= 3) */}
          {!loading && hasEnoughProjects && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {latestProjects.slice(0, 3).map((project, index) => (
                  <div
                    key={project._id || project.id}
                    className="fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>

              {/* VIEW ALL BUTTON ONLY AFTER 3 PROJECTS */}
              <div className="text-center mt-12">
                <Button asChild variant="outline" size="lg">
                  <Link to="/projects">
                    View All Projects <ArrowRight />
                  </Link>
                </Button>
              </div>
            </>
          )}

          {/* NOT ENOUGH PROJECTS MESSAGE */}
          {!loading && !hasEnoughProjects && (
            <div className="text-center py-20 text-muted-foreground">
              Projects are being updated. Please check back soon.
            </div>
          )}
        </div>
      </section>

      {/* Why Hire Me */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Work With Me?"
            subtitle="I bring technical expertise and creativity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-xl border">
                <f.icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Let's Build Something <span className="gradient-text">Amazing</span>
        </h2>

        <Button asChild size="lg">
          <Link to="/contact">Start a Conversation <ArrowRight /></Link>
        </Button>
      </section>
    </Layout>
  );
};

export default Home;