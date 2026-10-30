import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Eye,
  Github,
  ImagePlus,
  Link2,
  Plus,
  Save,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useCreateProject } from '@/hooks/useProjects';
import { getErrorMessage } from '@/lib/apiClient';

const AddProject = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    projectName: '',
    deployLink: '',
    projectcode: '',
    description: '',
    featured: false,
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState([]);

  const createProject = useCreateProject({
    onSuccess: (data) => {
      toast({
        title: 'Project published',
        description: data.imageUrl || 'Your project has been added to the portfolio.',
      });
      navigate('/admin/projects');
    },
    onError: (error) => {
      toast({
        title: 'Could not publish project',
        description: getErrorMessage(error, 'Please check your details and try again.'),
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    if (!file) {
      setImagePreview('');
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const addTech = (event) => {
    event.preventDefault();
    const value = techInput.trim();
    if (value && !techStack.some((tech) => tech.toLowerCase() === value.toLowerCase())) {
      setTechStack((current) => [...current, value]);
    }
    setTechInput('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: 'Add a cover image',
        description: 'Choose an image so your project has a strong first impression.',
        variant: 'destructive',
      });
      return;
    }

    const payload = new FormData();
    payload.append('image', file);
    payload.append('projectName', formData.projectName.trim());
    payload.append('deployLink', formData.deployLink.trim());
    payload.append('projectcode', formData.projectcode.trim());
    payload.append('description', formData.description.trim());
    payload.append('techStack', JSON.stringify(techStack));
    payload.append('featured', String(formData.featured));
    createProject.mutate(payload);
  };

  const projectTitle = formData.projectName.trim() || 'Your next great project';
  const projectDescription = formData.description.trim() || 'A little context about the work, the idea, and what makes it special.';

  return (
    <AdminLayout>
      <div className="relative mx-auto max-w-7xl pb-10">
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 right-12 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

        <div className="relative mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <Button
              type="button"
              variant="ghost"
              className="mb-5 -ml-3 gap-2 text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/admin/projects')}
            >
              <ArrowLeft className="h-4 w-4" />
              All projects
            </Button>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Your portfolio, evolving
            </div>
            <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight tracking-tight font-display sm:text-4xl lg:text-5xl">
              Give your next project
              <span className="block gradient-text">its own spotlight.</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Add the story, links, and details. Your preview updates as you build the listing.
            </p>
          </div>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-3.5 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            Draft · not published
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.8fr)]">
          <section className="overflow-hidden rounded-[26px] border border-white/[0.09] bg-card/65 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-5 sm:px-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">01</span>
              <div>
                <h2 className="font-semibold">Project information</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">The essentials visitors will see first.</p>
              </div>
            </div>

            <div className="space-y-7 px-5 py-6 sm:px-8 sm:py-8">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="projectName" className="text-sm">Project name <span className="text-primary">*</span></Label>
                  <span className="text-[11px] text-muted-foreground">{formData.projectName.length}/80</span>
                </div>
                <Input
                  id="projectName"
                  name="projectName"
                  placeholder="Give it a memorable name"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
                  maxLength={80}
                  className="h-12 rounded-xl border-white/10 bg-background/55 px-4 text-base shadow-inner focus-visible:ring-primary/50"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="description" className="text-sm">The short story <span className="text-primary">*</span></Label>
                  <span className="text-[11px] text-muted-foreground">{formData.description.length}/500</span>
                </div>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="What did you build? What problem does it solve?"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  maxLength={500}
                  rows={4}
                  className="resize-y rounded-xl border-white/10 bg-background/55 px-4 py-3 leading-6 shadow-inner focus-visible:ring-primary/50"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2.5">
                  <Label htmlFor="deployLink" className="text-sm">Live experience <span className="text-primary">*</span></Label>
                  <div className="relative">
                    <Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="deployLink"
                      name="deployLink"
                      type="url"
                      placeholder="https://yourproject.com"
                      value={formData.deployLink}
                      onChange={handleChange}
                      required
                      className="h-11 rounded-xl border-white/10 bg-background/55 pl-10 shadow-inner focus-visible:ring-primary/50"
                    />
                  </div>
                </div>
                <div className="space-y-2.5">
                  <Label htmlFor="projectcode" className="text-sm">Source code <span className="text-primary">*</span></Label>
                  <div className="relative">
                    <Github className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="projectcode"
                      name="projectcode"
                      type="url"
                      placeholder="https://github.com/..."
                      value={formData.projectcode}
                      onChange={handleChange}
                      required
                      className="h-11 rounded-xl border-white/10 bg-background/55 pl-10 shadow-inner focus-visible:ring-primary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="techStack" className="text-sm">Built with</Label>
                  <p className="mt-1 text-xs text-muted-foreground">Add a few technologies to help people scan your work.</p>
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Code2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="techStack"
                      value={techInput}
                      onChange={(event) => setTechInput(event.target.value)}
                      onKeyDown={(event) => event.key === 'Enter' && addTech(event)}
                      placeholder="React, TypeScript, ..."
                      className="h-11 rounded-xl border-white/10 bg-background/55 pl-10 shadow-inner focus-visible:ring-primary/50"
                    />
                  </div>
                  <Button type="button" variant="outline" size="icon" onClick={addTech} aria-label="Add technology" className="h-11 w-11 shrink-0 rounded-xl border-white/10 bg-background/40">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {techStack.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[0.08] py-1.5 pl-3 pr-2 text-xs font-medium text-primary">
                        {tech}
                        <button type="button" onClick={() => setTechStack((current) => current.filter((item) => item !== tech))} aria-label={`Remove ${tech}`} className="rounded-full p-0.5 transition-colors hover:bg-primary/15 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                    <Star className="h-4 w-4" />
                  </span>
                  <div>
                    <Label htmlFor="featured" className="cursor-pointer text-sm font-medium">Feature this project</Label>
                    <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">Give it a featured badge in your public portfolio.</p>
                  </div>
                </div>
                <Switch id="featured" checked={formData.featured} onCheckedChange={(featured) => setFormData((current) => ({ ...current, featured }))} />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] bg-background/25 px-5 py-4 sm:flex-row sm:justify-between sm:px-8">
              <Button type="button" variant="ghost" onClick={() => navigate('/admin/projects')} disabled={createProject.isPending} className="text-muted-foreground">
                Cancel
              </Button>
              <Button type="submit" disabled={createProject.isPending} className="gap-2 rounded-xl px-6 shadow-lg shadow-primary/15">
                {createProject.isPending ? (
                  <><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" /> Publishing...</>
                ) : (
                  <><Save className="h-4 w-4" /> Publish project</>
                )}
              </Button>
            </div>
          </section>

          <aside className="space-y-4 xl:sticky xl:top-6">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Eye className="h-4 w-4 text-primary" />
                Live preview
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Updates as you type
              </span>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-white/10 bg-card/70 shadow-[0_24px_80px_-45px_rgba(0,0,0,0.85)] backdrop-blur-xl">
              <div className="relative aspect-[1.42/1] overflow-hidden bg-gradient-to-br from-primary/25 via-background to-accent/20">
                {imagePreview ? (
                  <img src={imagePreview} alt="" className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-background/40 text-primary shadow-xl backdrop-blur">
                      <ImagePlus className="h-6 w-6" />
                    </span>
                    <span className="text-xs text-muted-foreground">Your cover image will appear here</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                {formData.featured && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
                    <Star className="h-3 w-3 fill-amber-300 text-amber-300" /> Featured
                  </span>
                )}
                <Label htmlFor="fileInput" className="absolute bottom-4 right-4 inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-black/45 px-3.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-black/65">
                  <ImagePlus className="h-4 w-4" />
                  {imagePreview ? 'Change cover' : 'Add cover'}
                </Label>
                <Input id="fileInput" type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] ?? null)} className="sr-only" />
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {file && <p className="truncate text-[11px] text-muted-foreground">Cover · {file.name}</p>}
                <div>
                  <h2 className="text-xl font-bold tracking-tight font-display">{projectTitle}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{projectDescription}</p>
                </div>

                {techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">{tech}</span>
                    ))}
                    {techStack.length > 4 && <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground">+{techStack.length - 4}</span>}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5" /> Live demo</span>
                  <span className="inline-flex items-center gap-1.5"><Github className="h-3.5 w-3.5" /> Source code</span>
                  <span className="inline-flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> Draft preview</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-card/35 p-4 text-xs leading-5 text-muted-foreground">
              <span className="font-medium text-foreground">Quick tip</span>
              <span className="ml-1">Use a crisp landscape screenshot so the project looks great in the portfolio grid.</span>
              <ArrowUpRight className="float-right mt-1 h-3.5 w-3.5 text-primary" />
            </div>
          </aside>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProject;
