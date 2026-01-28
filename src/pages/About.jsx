import { Download, MapPin, Calendar, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from "../../public/portfolio.webp"

const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Sweet Delights',
    remote: 'Remote',
    period: '2026 - Present',
    description: 'Web Developer at Sweet Delights, where I built a full-stack cake ordering and delivery platform. I implemented user authentication, product browsing, cart and checkout functionality, payment integration, and an order history system. I focused on responsive UI/UX, smooth navigation, and real-time interaction between users and the platform.',
  },
  {
    title: 'Full Stack Developer',
    company: 'CivicChoice',
    remote: 'Remote',
    period: '2023 - 2025',
    description: 'Built CivicChoice, a secure web-based voting platform featuring real-time vote counting, authentication, and role-based access (admin/voter), designed with a responsive React frontend and a Node.js backend integrated with a database for seamless election management.',
  },
  {
    title: 'Frontend Developer',
    company: 'Startup',
    period: '2022 - 2023',
    description: 'Developed responsive user interfaces and optimized website performance, achieving a 40% improvement in load speed and user experience.',
  },
];

const education = [
  {
    degree: ' SQI College of ICT',
    school: 'Coding School',
    period: '2022 - 2024',
    description: 'Graduated with honors, focused on software engineering and web technologies.',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative fade-in">
              <div className="aspect-square max-w-md mx-auto lg:mx-0 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl transform rotate-6 opacity-20" />
                <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden border border-white/10">
                  <img
                    src={Image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 glass-card px-6 py-3 rounded-xl">
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="text-2xl font-bold gradient-text">5+ Years</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
                About <span className="gradient-text">Me</span>
              </h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary" />
                  Ogbomosho, Nigeria
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Full Stack Developer
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                I'm a passionate full-stack developer with over 5 years of experience
                creating digital solutions that make a difference. I specialize in
                building scalable web applications with modern technologies.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                My journey into tech started with a curiosity about how things work
                on the web. Today, I help businesses transform their ideas into
                reality through clean code and thoughtful design.
              </p>
              <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
                <Download className="w-4 h-4" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey and the companies I've worked with."
          />

          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 pb-12 last:pb-0 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline Line */}
                <div className="absolute left-0 top-2 bottom-0 w-px bg-border" />
                {/* Timeline Dot */}
                <div className="absolute left-0 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-primary glow" />

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold font-display">{exp.title}</h3>
                    <span className="text-primary font-medium">{exp.company}</span>

                    <div className="inline-block px-2 py-0 rounded-lg border border-border bg-white dark:bg-gray-100">
                      <span className="text-primary font-medium">{exp.remote}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Education"
            subtitle="My academic background and qualifications."
          />

          <div className="max-w-3xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl fade-in"
              >
                <h3 className="text-xl font-bold font-display mb-2">{edu.degree}</h3>
                <p className="text-primary font-medium mb-2">{edu.school}</p>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  {edu.period}
                </div>
                <p className="text-muted-foreground">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
