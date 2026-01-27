import { useState } from 'react';
import { Save, User } from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Admin',
    email: user?.email || 'admin@portfolio.com',
    bio: 'Full-stack developer passionate about creating beautiful web experiences.',
    location: 'San Francisco, CA',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate save - connect to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Profile updated!',
      description: 'Your profile has been saved successfully.',
    });

    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold font-display mb-6">Profile Settings</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Section */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Profile Picture</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Update your avatar by connecting your backend
                </p>
                <Button variant="outline" size="sm" type="button">
                  Change Avatar
                </Button>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="glass-card p-6 rounded-2xl space-y-6">
            <h3 className="font-semibold">Personal Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleChange}
                className="bg-background/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="bg-background/50"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="glass-card p-6 rounded-2xl space-y-6">
            <h3 className="font-semibold">Social Links</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  placeholder="https://twitter.com/username"
                  value={formData.twitter}
                  onChange={handleChange}
                  className="bg-background/50"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
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
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
