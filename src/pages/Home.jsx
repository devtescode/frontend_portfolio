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
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with modern build tools and best practices.',
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Clean, modern UI/UX that delights users and drives engagement.',
  },
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Maintainable, scalable code following industry best practices.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with robust error handling.',
  },
];

const Home = () => {
 
   const { latestProjects } = useProjects(-3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8 animate-fade-in uppercase font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary "></span>
              </span>
              Available for new opportunities
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight fade-in" style={{ animationDelay: '0.1s' }}>
              I Build{' '}
              <span className="gradient-text">Digital Experiences</span>
              {' '}That Matter
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-muted-foreground mb-8 mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
              I’m <span className="text-black dark:text-white font-semibold">Agboola Teslim</span>, a Full-Stack Engineer focused on building modern, scalable, and high-performance web applications. I turn complex ideas into clean, reliable solutions with strong architecture and great user experience.
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="gap-2 text-lg px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-lg px-8 glass-button">
                <Link to="/contact">
                  Get In Touch
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Tech Stack Strip */}
      <section className="py-12 border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="text-2xl">{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Projects"
            subtitle="A selection of my best work showcasing my skills in design and development."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {latestProjects.map((project, index) => (
            <div
              key={project._id || project.id}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Hire Me */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Why Work With Me?"
            subtitle="I bring a unique combination of technical expertise and creative vision to every project."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-8 rounded-2xl hover-lift fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 relative">
              Let's Build Something{' '}
              <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto relative">
              Have a project in mind? I'd love to hear about it. Let's work together
              to create something extraordinary.
            </p>
            <Button asChild size="lg" className="gap-2 text-lg px-8 relative">
              <Link to="/contact">
                Start a Conversation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
