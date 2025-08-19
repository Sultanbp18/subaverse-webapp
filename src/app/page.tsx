import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProjectCard from '@/components/project-card'
import PostCard from '@/components/post-card'
import type { Project, Profile } from '@/types'
import { projects } from '@/lib/projects'
import { getAllPosts } from '@/lib/markdown'

const profile: Profile = {
  name: 'Sultan Bayu',
  bio: 'Welcome to Subaverse - my personal universe where I share projects, stories, and hobbies. A passionate cloud engineer creating scalable infrastructure and DevOps solutions.',
  professionalSummary: "Hello! I’m Sultan Bayu, a Cloud Engineer based in Indonesia. I specialize in designing and managing cloud infrastructure, container orchestration, and DevOps practices to build reliable, scalable, and secure systems.",
  profileImage: 'https://assets.subaverse.xyz/myprofile.png',
  cvUrl: 'https://assets.subaverse.xyz/CV%20-%20Sultan%20Bayu%20Prasetyo.pdf',
  skills: ['Cloud & Infrastructure', 'Infrastructure as Code', 'Containers & Orchestration', 'Monitoring & Observability', 'CI/CD & Version Control', 'Automation & Scripting', 'Server Configuration']
}

export default async function Home() {
  // Get featured projects (first 3 projects)
  const featuredProjects = projects.slice(0, 3)
  
  // Get latest posts (first 3 posts)
  const latestPosts = getAllPosts()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <main>
      {/* Hero Section */}
      <section className="relative gradient-bg min-h-screen flex items-center">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground">
                Hi, I'm <span className="text-gradient">{profile.name}</span>
              </h1>
              <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed">
                {profile.bio}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects">
                  <Button size="lg" className="inline-flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    About Me
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="relative z-10">
                <img 
                  src={profile.profileImage} 
                  alt="Sultan Bayu Universe - Professional Portrait" 
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto animate-float"
                />
              </div>
              <div className="absolute top-4 -right-4 w-32 h-32 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-4 left-4 w-32 h-32 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A selection of my recent work in cloud infrastructure and DevOps solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg" className="inline-flex items-center">
                View All Projects
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Latest Posts</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stories, insights, and learnings from my journey in tech and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="inline-flex items-center">
                View All Posts
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">About Me</h2>
              <div className="prose prose-lg text-muted-foreground max-w-none">
                <p className="mb-6">
                  {profile.professionalSummary}
                </p>
              </div>
              
              {profile.skills && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {profile.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                {profile.cvUrl && (
                  <a
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="w-full sm:w-auto">
                      <Download className="mr-2 w-5 h-5" />
                      Download CV
                    </Button>
                  </a>
                )}
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800" 
                  alt="Sultan's Workspace - Clean Setup with Modern Tools" 
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/30 rounded-full filter blur-2xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/30 rounded-full filter blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}