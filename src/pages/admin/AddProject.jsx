import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { API_URLS } from '../../components/utils/apiConfig';
// import Swal from 'sweetalert2';

const AddProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    projectName: '',
    deployLink: '',
    projectcode: '',
    description: '', 
  });

  // File state
  const [file, setFile] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.deployLink || !file) {
      toast({ title: 'Oops...', description: 'Please fill in all fields and select a file to upload.' });
      return;
    }

    setLoading(true);

    try {
      const payload = new FormData();
      payload.append('image', file);
      payload.append('projectName', formData.projectName);
      payload.append('deployLink', formData.deployLink);
      payload.append('projectcode', formData.projectcode);
      payload.append('description', formData.description);

      const response = await axios.post(API_URLS.upload, payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast({
        title: 'Project uploaded!',
        description: response.data.imageUrl || 'Your project has been uploaded successfully.',
      });

      // Clear form
      setFormData({ projectName: '', deployLink: '', projectcode: '', description: '' });
      setFile(null);
      document.getElementById('fileInput').value = '';

      navigate('/admin/projects');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to upload project.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold font-display mb-6">Add New Project</h1>

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

            {/* Deploy Link */}
            <div className="space-y-2">
              <Label htmlFor="deployLink">Deploy Link *</Label>
              <Input
                id="deployLink"
                name="deployLink"
                placeholder="https://myproject.com"
                value={formData.deployLink}
                onChange={handleChange}
                required
                className="bg-background/50"
              />
            </div>
            {/* Deploy Link */}
            <div className="space-y-2">
              <Label htmlFor="projectcode">Githup Code *</Label>
              <Input
                id="projectcode"
                name="projectcode"
                placeholder="projectcode"
                value={formData.projectcode}
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
                placeholder="Write a brief description of your project..."
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="bg-background/50 resize-none"
              />
            </div>


            {/* Project Type */}

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="fileInput">Project Image *</Label>
              <input
                id="fileInput"
                type="file"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>


          </div>


          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Uploading...' : <><Save className="w-4 h-4" /> Upload Project</>}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate('/admin/projects')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProject;
