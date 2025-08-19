'use client'

import { useState } from 'react'
import { Download, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { Profile } from '@/types'
import { mockProfile } from '@/lib/profile'

export default function AboutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const profile = mockProfile

  if (isLoading) {
    return (
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-12 w-48 mb-6" />
              <div className="space-y-4 mb-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-20 rounded-full" />
                ))}
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div>
              <Skeleton className="w-full h-96 rounded-2xl" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-6">About Me</h1>
              
              <div className="prose prose-lg text-muted-foreground max-w-none mb-8">
                <p className="mb-6" data-testid="profile-bio">
                  {profile.professionalSummary}
                </p>
              </div>

              {/* Skills */}
              {profile.skills && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-3" data-testid="skills-list">
                    {profile.skills.map((skill: string, index: number) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="bg-primary/10 text-primary text-sm px-4 py-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>Indonesia</span>
                  </div>
                  {profile.email && (
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="w-5 h-5" />
                      <a 
                        href={`mailto:${profile.email}`}
                        className="hover:text-primary transition-colors"
                        data-testid="email-link"
                      >
                        {profile.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {profile.cvUrl && (
                  <a 
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="download-cv-button"
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      <Download className="mr-2 w-5 h-5" />
                      Download CV
                    </Button>
                  </a>
                )}
                <a 
                  href={`mailto:${profile.email}`}
                  data-testid="contact-button"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Mail className="mr-2 w-5 h-5" />
                    Get In Touch
                  </Button>
                </a>
              </div>
            </div>

            {/* Professional Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={profile.profileImage} 
                  alt="Sultan's Professional Portrait" 
                  className="rounded-2xl shadow-2xl w-full"
                  data-testid="professional-image"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/30 rounded-full filter blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full filter blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Tools & Technologies</h2>
            <p className="text-xl text-muted-foreground">
              Technologies I work with and tools that help me build better software
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Cloud & Infrastructure */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Cloud & Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">GCP</Badge>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">AWS</Badge>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">Alibaba Cloud</Badge>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">Proxmox</Badge>
                <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">VirtualBox</Badge>
              </div>
            </div>

            {/* Infrastructure as Code */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Infrastructure as Code</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">Terraform</Badge>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">Ansible</Badge>
              </div>
            </div>

            {/* Containers & Orchestration */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Containers & Orchestration</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700">Docker</Badge>
                <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700">Kubernetes</Badge>
              </div>
            </div>

            {/* Monitoring & Observability */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Monitoring & Observability</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700">Prometheus</Badge>
                <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700">Grafana</Badge>
                <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700">Loki</Badge>
                <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700">Alertmanager</Badge>
              </div>
            </div>

            {/* CI/CD & Version Control */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">CI/CD & Version Control</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">GitHub</Badge>
                <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">GitHub Actions</Badge>
                <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">Gitlab</Badge>
                <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">Jenkins</Badge>
                <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">ArgoCD</Badge>
                <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700">Git</Badge>
              </div>
            </div>

            {/* Programming Languages */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700">Python</Badge>
                <Badge variant="secondary" className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700">SQL</Badge>
                <Badge variant="secondary" className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700">Bash</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Education & Certifications</h2>
            <p className="text-xl text-muted-foreground">
              My educational background and professional certifications
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Education</h3>
              <div className="space-y-6">
                {profile.education?.map((edu: any, index: number) => (
                  <div key={index} className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {edu.degree}
                    </h4>
                    <p className="text-primary font-medium mb-2">{edu.school}</p>
                    <p className="text-muted-foreground text-sm mb-3">{edu.year}</p>
                    <p className="text-muted-foreground">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Certifications</h3>
              <div className="space-y-4">
                {profile.certifications?.map((cert: any, index: number) => (
                  <div
                    key={index}
                    className="bg-card rounded-xl p-4 shadow-md border border-border flex items-center justify-between"
                  >
                    {/* Kiri: Logo + Info */}
                    <div className="flex items-center gap-4">
                      {cert.logo && (
                        <img
                          src={cert.logo}
                          alt={cert.name}
                          className="w-10 h-10 object-contain rounded"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-foreground">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                    </div>

                    {/* Kanan: Link */}
                    {cert.credentialLink && (
                      <a
                        href={cert.credentialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Professional Journey Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Professional Journey
            </h2>
            <p className="text-xl text-muted-foreground">
              My path in technology and software development
            </p>
          </div>

          <div className="space-y-8">
            {profile.experience?.map((exp: any, index: number) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-8 shadow-lg border border-border"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {exp.title}
                    </h3>
                    <p className="text-primary">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">{exp.period}</p>
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  </div>
                </div>

                {/* bullet list fix */}
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-4">
                  {exp.description.map((item: string, i: number) => (
                    <li key={i} className="pl-2">{item}</li>
                  ))}
                </ul>

                {/* gunakan skills per company */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills?.map((skill: string) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-primary text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}