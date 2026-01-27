import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, WebhookOff, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/SectionHeading';
import { useToast } from '@/hooks/use-toast';
import * as Yup from "yup";
import { API_URLS } from '../components/utils/apiConfig';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'teslimagboola09@gmail.com',
    href: 'teslimagboola09@gmail.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 (806) 486-4821',
    href: 'tel:+2348064864821',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ogbomosho, Nigeria',
    href: null,
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/devtescode' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/teslim-agboola-ab069b252/' },
  { icon: Twitter, label: 'Twitter', href: 'https://x.com/TeslimAgboola1?t=iz0Cs-gA935IM2Drk1QfMQ&s=09' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/2348064864821' },

];

const Contact = () => {
  const { toast } = useToast();

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Name should only contain letters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number should only contain numbers")
      .min(10, "Phone number should be at least 10 digits")
      .required("Phone number is required"),

    subject: Yup.string().required("Subject is required"),

    message: Yup.string().required("Message is required"),
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("Submitting form");
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      // Validate
      await validationSchema.validate(formData, { abortEarly: false });

      const response = await fetch(API_URLS.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((e) => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={<>Get In <span className="gradient-text">Touch</span></>}
            subtitle="Have a project in mind or just want to say hello? I'd love to hear from you."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8 fade-in">
              <div>
                <h3 className="text-2xl font-bold font-display mb-6">
                  Let's Start a Conversation
                </h3>
                <p className="text-muted-foreground">
                  I'm always open to discussing new projects, creative ideas,
                  or opportunities to be part of your vision.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.label}
                    className="glass-card p-4 rounded-xl flex items-center gap-4 hover-lift"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover-lift"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8 rounded-2xl fade-in" style={{ animationDelay: '0.2s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background/50"
                    />
                        {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background/50"
                    />
                        {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                  </div>
                </div>

                <div>
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08012345678"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background/50 resize-none"
                  />
                   {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
