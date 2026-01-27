import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Plus } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useProjects } from '@/contexts/ProjectsContext';
import { useToast } from '@/hooks/use-toast';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, updateProject } = useProjects();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    techStack: [],
    liveUrl: '',
    githubUrl: '',
    featured: false,
  });

  useEffect(() => {
    const project = getProject(id);
    if (project) {
      setFormData(project);
    } else {
      navigate('/admin/projects');
    }
  }, [id, getProject, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack.filter((t) => t !== tech),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      updateProject(id, formData);
      toast({
        title: 'Project updated!',
        description: 'Your changes have been saved successfully.',
      });
      navigate('/admin/projects');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project. Please try again.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold font-display mb-6">Edit Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6 rounded-2xl space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="My Awesome Project"
                value={formData.title}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="A brief description of your project..."
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="bg-background/50 resize-none"
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-cover rounded-lg"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="React, Node.js, etc."
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  className="bg-background/50"
                />
                <Button type="button" variant="outline" onClick={handleAddTech}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {formData.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTech(tech)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input
                  id="liveUrl"
                  name="liveUrl"
                  placeholder="https://myproject.com"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  name="githubUrl"
                  placeholder="https://github.com/..."
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <Label htmlFor="featured" className="font-medium">
                  Featured Project
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show this project on the homepage
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, featured: checked }))
                }
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="gap-2 bg-gradient-to-r from-primary to-primary/80"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/projects')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditProject;
