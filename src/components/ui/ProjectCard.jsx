import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectCard = ({ project, className = '' }) => {
  // Map backend fields to frontend-friendly names
  const title = project.projectName || project.title;
  const image = project.url || project.image;
  const liveUrl = project.deployLink || project.liveUrl;
  const githubUrl = project.projectcode || project.githubUrl;
  const description = project.description || 'No description provided.';
  const techStack = project.techStack || [];

  return (
    <div className={`group glass-card rounded-2xl overflow-hidden hover-lift ${className}`}>
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Overlay Links */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
