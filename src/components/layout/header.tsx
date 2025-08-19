'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/providers/theme-provider'
import { useLanguage } from '@/providers/language-provider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const NavLink = ({ name, href }: { name: string; href: string }) => (
    <Link 
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive(href)
          ? 'text-primary dark:text-primary'
          : 'text-foreground/70 dark:text-foreground/70 hover:text-foreground dark:hover:text-foreground'
      }`}
    >
      {name}
    </Link>
  )

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
              data-testid="logo-link"
            >
              Subaverse
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-baseline space-x-4">
              {navigation.map((item) => (
                <NavLink key={item.name} name={item.name} href={item.href} />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-foreground/70"
                  data-testid="language-toggle"
                >
                  {language.toUpperCase()}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  onClick={() => setLanguage('en')}
                  data-testid="language-en"
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setLanguage('id')}
                  data-testid="language-id"
                >
                  Indonesian
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground/70"
              data-testid="theme-toggle"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-foreground/70"
                  data-testid="mobile-menu-toggle"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-4 mt-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-primary dark:text-primary'
                          : 'text-foreground/70 dark:text-foreground/70 hover:text-foreground dark:hover:text-foreground'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}