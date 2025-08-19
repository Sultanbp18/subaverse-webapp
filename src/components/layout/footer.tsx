'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

const categories = [
  { name: 'Projects', href: '/blog?categories=project' },
  { name: 'Productivity', href: '/blog?categories=productivity' },
  { name: 'Hobbies', href: '/blog?categories=hobby' },
  { name: 'Tutorials', href: '/blog?categories=tutorials' },
]

const socialLinks = [
  { 
    name: 'Twitter', 
    href: 'https://x.com/sultanbp86', 
    icon: Twitter,
    'data-testid': 'social-twitter' 
  },
  { 
    name: 'LinkedIn', 
    href: 'https://www.linkedin.com/in/sultanbp86/', 
    icon: Linkedin,
    'data-testid': 'social-linkedin' 
  },
  { 
    name: 'GitHub', 
    href: 'https://github.com/Sultanbp18', 
    icon: Github,
    'data-testid': 'social-github' 
  },
  { 
    name: 'Email', 
    href: 'mailto:sultanbp18@gmail.com', 
    icon: Mail,
    'data-testid': 'social-email' 
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Subaverse
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Welcome to my personal universe. Let's build something amazing together.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-testid={link['data-testid']}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-300">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="hover:text-primary transition-colors"
                    data-testid={`footer-category-${category.name.toLowerCase()}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p data-testid="copyright">
            &copy; {currentYear} Sultan Bayu Universe. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}