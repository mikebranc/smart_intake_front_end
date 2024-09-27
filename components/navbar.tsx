'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`${
          isActive
            ? 'border-purple-300 text-white'
            : 'border-transparent text-purple-100 hover:border-purple-300 hover:text-white'
        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
      >
        {children}
      </Link>
    )
  }

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex space-x-8">
              <NavLink href="/responses">Form Responses</NavLink>
              <NavLink href="/templates">Form Templates</NavLink>
              <NavLink href="/live-chat">Live Chat</NavLink>
            </div>
          </div>
          
          <div className="flex items-center">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              width={150}
              height={150}
            />
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink href="/responses">Form Responses</NavLink>
            <NavLink href="/templates">Form Templates</NavLink>
            <NavLink href="/live-chat">Live Chat</NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}