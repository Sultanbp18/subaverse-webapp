'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: 'top' | 'right' | 'bottom' | 'left'
  }
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
        {
          'inset-y-0 right-0 h-full w-3/4 sm:w-1/2 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right':
            side === 'right',
          'inset-y-0 left-0 h-full w-3/4 sm:w-1/2 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left':
            side === 'left',
          'inset-x-0 top-0 h-96 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top':
            side === 'top',
          'inset-x-0 bottom-0 h-96 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom':
            side === 'bottom',
        },
        className
      )}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

export { Sheet, SheetTrigger, SheetContent, SheetClose }