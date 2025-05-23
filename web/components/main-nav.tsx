'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { CustomConnectButton } from './custom-connect-button'
import { useRouter } from 'next/navigation'

export function MainNav() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="lg:h-28 lg:px-24 w-full h-[68px] px-6 shadow-sm shadow-border border-border flex items-center justify-between border-b">
        <div className="text-center cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-primary text-lg font-medium leading-loose tracking-tight lg:font-bold lg:text-4xl">Sui </span>
          <span className="text-lg font-medium leading-loose tracking-tight lg:font-bold lg:text-4xl">Passport</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <CustomConnectButton />
        </div>
      </div>
    </header>
  )
} 