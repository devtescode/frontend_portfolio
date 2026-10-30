import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useProject, useUpdateProject, useUploadProjectImage } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';
import QueryState from '@/components/QueryState';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const projectQuery = useProject(id);
  const { data: project } = projectQuery;
  const { toast } = useToast();

  const updateProject = useUpdateProject({
    onSuccess: () => {
      toast({
        title: 'Project updated!',
        description: 'Your changes have been saved successfully.',
      });
      navigate('/admin/projects');
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'destructive',
      });
    },
  });

  const uploadImage = useUploadProjectImage({
    onSuccess: (data) => {
      setFormData((prev) => ({ ...prev, url: data.url }));
      toast({ title: 'Image uploaded!', description: 'Preview updated.' });
    },
    onError: (error) => {
      console.error('Upload failed', error);
      toast({ title: 'Error', description: 'Image upload failed.', variant: 'destructive' });
    },
  });

  const loading = updateProject.isPending;
  const uploading = uploadImage.isPending;
  const [loadedId, setLoadedId] = useState(null);
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    url: '',
    deployLink: '',
    projectcode: '',
  });

  // Load project data once (refetches shouldn't overwrite in-progress edits)
  useEffect(() => {
    if (project && loadedId !== id) {
      setFormData({
        projectName: project.projectName || '',
        description: project.description || '',
        url: project.url || '',
        deployLink: project.deployLink || '',
        projectcode: project.projectcode || '',
      });
      setLoadedId(id);
    }
  }, [id, project, loadedId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadImage.mutate({ id, file });
  };

  // Submit update
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject.mutate({ id, data: formData });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold font-display mb-6">Edit Project</h1>

        <QueryState
          isLoading={projectQuery.isLoading}
          isError={projectQuery.isError}
          error={projectQuery.error}
          isEmpty={!project}
          onRetry={projectQuery.refetch}
          emptyTitle="Project not found"
          emptyMessage="This project may have been removed or the link may be incorrect."
        >
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

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="url">Project Image *</Label>
              <Input
                id="url"
                name="url"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="bg-background/50"
              />
              {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}

              {formData.url && !uploading && (
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
              disabled={loading || uploading}
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
        </QueryState>
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
