import { 
  Code2, 
  Server, 
  Database, 
  Cloud, 
  Palette, 
  Terminal,
  Layers,
  GitBranch,
  Globe,
  Smartphone
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import SkillCard from '@/components/ui/SkillCard';

const skillCategories = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: [
      { name: 'React.js', level: 95, icon: Code2 },
      { name: 'Next.js', level: 90, icon: Layers },
      { name: 'TypeScript', level: 88, icon: Code2 },
      { name: 'Tailwind CSS', level: 95, icon: Palette },
      { name: 'Vue.js', level: 75, icon: Code2 },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 92, icon: Server },
      { name: 'Express.js', level: 90, icon: Server },
      { name: 'Python', level: 50, icon: Terminal },
      { name: 'GraphQL', level: 85, icon: Globe },
      { name: 'REST APIs', level: 95, icon: Cloud },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 90, icon: Database },
      { name: 'PostgreSQL', level: 88, icon: Database },
      // { name: 'Redis', level: 75, icon: Database },
      { name: 'Firebase', level: 85, icon: Cloud },
    ],
  },
  {
    title: 'Tools & Others',
    icon: Terminal,
    skills: [
      { name: 'Git', level: 95, icon: GitBranch },
      // { name: 'Docker', level: 80, icon: Cloud },
      { name: 'AWS', level: 78, icon: Cloud },
      { name: 'Figma', level: 85, icon: Palette },
      // { name: 'React Native', level: 70, icon: Smartphone },
    ],
  },
];

const Skills = () => {
  return (
    <Layout>
      {/* Hero Section */}

       <section className="py-0 mt-10">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={<>My <span className="gradient-text">Skills</span></>}
            subtitle="A comprehensive overview of my technical skills and expertise across different areas of development."
          />
        </div>
      </section>     

      {/* Skills by Category */}
      {skillCategories.map((category, categoryIndex) => (
        <section 
          key={category.title} 
          className={`py-16 ${categoryIndex % 2 === 1 ? 'bg-card/30' : ''}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <category.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-display">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {category.skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SkillCard
                    icon={skill.icon}
                    name={skill.name}
                    level={skill.level}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Additional Info */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold font-display mb-4">
              Always <span className="gradient-text">Learning</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technology evolves rapidly, and I'm committed to staying at the forefront. Currently exploring AI/ML integration, Web3 technologies, mobile application development, and advanced system design patterns.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Skills;
