import { Download, MapPin, Briefcase, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import Image from "../../public/portfolio.webp"
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/solid';


const experiences = [
  {
    title: 'Full Stack Developer',
    company: 'Sweet Delights',
    remote: 'Remote',
    period: '2026 - Present',
    description: 'Built a full-stack cake ordering and delivery platform, implementing user authentication, product browsing, cart and checkout functionality, payment integration, and an order history system. Focused on responsive UI/UX, smooth navigation, and real-time interaction between users and the platform.',
  },
  {
    title: 'Full Stack Developer',
    company: 'CivicChoice',
    remote: 'Remote',
    period: '2023 - 2025',
    description: 'Built CivicChoice, a secure web-based voting platform featuring real-time vote counting, authentication, and role-based access (admin/voter). Designed with a responsive React frontend and Node.js backend integrated with a database for seamless election management.',
  },
  {
    title: 'Fullstack Developer',
    // company: 'Startup',
    period: 'SEPT 2022 - AUG 2024',
    description: 'I enrolled in a tech school to enhance my skills as a Full-Stack Web Developer. During my studies, I gained hands-on experience with a variety of technologies, including Angular, React, Vue.js, Node.js, Express.js, MongoDB, SQL, and PHP. Beyond technical expertise, I honed my communication skills, learning to present ideas clearly and pitch solutions effectively. This experience has provided me with a strong, well-rounded foundation for success in the tech industry.',
  },
];


const education = [
  {
    degree: ' SQI College of ICT',
    school: 'Old Ilorin Road, Opposite Yoaco Filling Station, Yoaco, Ogbomoso',
    period: '2022 - 2024',
    description: 'Graduated with honors in Software Engineering, with a strong focus on web development and modern software technologies.',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
      
      {/* Image */}
      <div className="relative fade-in flex justify-center lg:justify-start">
        <div className="aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md relative">
          
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl rotate-6 opacity-20" />

          {/* Image container */}
          <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden border border-white/10">
            <img
              src={Image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 glass-card px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Experience
            </p>
            <p className="text-xl sm:text-2xl font-bold gradient-text">
              5+ Years
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="fade-in text-center lg:text-left" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-6">
          About <span className="gradient-text">Me</span>
        </h1>

        {/* Meta info */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mb-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            Ogbomosho, Nigeria
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Briefcase className="w-4 h-4 text-primary" />
            Full Stack Developer
          </div>
        </div>

        {/* Text */}
        <p className="text-base sm:text-lg text-muted-foreground mb-6 text-left md:text-justify">
          I'm a passionate full-stack developer with over 5 years of experience
          creating digital solutions that make a difference. I specialize in
          building scalable web applications with modern technologies.
        </p>

        <p className="text-base sm:text-lg text-muted-foreground mb-8 text-left md:text-justify">
          My journey into tech started with a curiosity about how things work
          on the web. Today, I help businesses transform their ideas into
          reality through clean code and thoughtful design.
        </p>

        {/* Button */}
        <div className="flex justify-center lg:justify-start">
          <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
            <Download className="w-4 h-4" />
            Download CV
          </Button>
        </div>
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
                      <span className="text-primary font-medium uppercase">{exp.remote}</span>
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
                className="glass-card p-6 rounded-2xl fade-in"
              >
                {/* Degree */}
                <h3 className="text-lg font-bold font-display mb-1">{edu.degree}</h3>


                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPinIcon className="w-4 h-4" /> {/* make icon size match text height */}
                  <span className="text-sm font-medium">{edu.school}</span>
                </div>


                {/* Period & Location */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                  {/* Calendar */}
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{edu.period}</span>
                  </div>

                  {/* Location */}
                  {edu.location && (
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-3.5 h-3.5" />
                      <span>{edu.location}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">{edu.description}</p>
              </div>
            ))}

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
