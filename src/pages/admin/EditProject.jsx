import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProjects } from '@/contexts/ProjectsContext';
import { useToast } from '@/hooks/use-toast';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, updateProject } = useProjects();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    url: '',
    deployLink: '',
    projectcode: '',
  });

  // Load project data
  useEffect(() => {
    const project = getProject(id);

    if (project) {
      setFormData({
        projectName: project.projectName || '',
        description: project.description || '',
        url: project.url || '',
        deployLink: project.deployLink || '',
        projectcode: project.projectcode || '',
      });
    }
  }, [id, getProject]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProject(id, formData);

      toast({
        title: 'Project updated!',
        description: 'Your changes have been saved successfully.',
      });

      navigate('/admin/projects');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold font-display mb-6">
          Edit Project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card p-6 rounded-2xl space-y-6">
            {/* Project Name */}
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                name="projectName"
                placeholder="My Awesome Project"
                value={formData.projectName}
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
              <Label htmlFor="url">Image URL *</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com/image.jpg"
                value={formData.url}
                onChange={handleChange}
                required
                className="bg-background/50"
              />

              {formData.url && (
                <img
                  src={formData.url}
                  alt="Preview"
                  className="mt-2 h-32 w-full object-cover rounded-lg"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              )}
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deployLink">Live URL</Label>
                <Input
                  id="deployLink"
                  name="deployLink"
                  placeholder="https://myproject.com"
                  value={formData.deployLink}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectcode">GitHub URL</Label>
                <Input
                  id="projectcode"
                  name="projectcode"
                  placeholder="https://github.com/..."
                  value={formData.projectcode}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>
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




{/* <div className="space-y-2">
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
            </div> */}
