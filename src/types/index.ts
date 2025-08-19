export interface Profile {
  name: string
  bio: string
  professionalSummary: string
  profileImage: string
  cvUrl?: string
  email?: string
  skills: string[]
  education?: {
    degree: string
    school: string
    year: string
    description: string
  }[]
  certifications?: {
    name: string
    issuer: string
    year: string
    credentialLink?: string
    logo?: string
  }[]
  experience?: {
    title: string
    company: string
    period: string
    startDate: string
    location: string
    skills?: string[]
    description: string[]
  }[]
}

export interface Project {
  id: string
  date: string
  title: string
  description: string
  category: string
  tags: string[]
  link?: string
  github?: string
  image?: string
}

export interface Post {
  id: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  coverImage?: string
  slug: string
  content: string
}