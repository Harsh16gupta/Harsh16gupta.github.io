import React from 'react';
import { cn } from "@/lib/utils"
const Container = ({ children, className }: {
  children: React.ReactNode,
  className?: string,
}) => {
  return (

    <div className={cn("relative max-w-4xl mx-auto w-full h-full bg-neutral-50 dark:bg-neutral-950 px-8 sm:px-10 md:px-14", className)}>
      {/* Left Vertical Dashed Line */}
      <div className="absolute left-0 top-0 h-full w-px border-l border-dashed border-neutral-300 dark:border-neutral-800 pointer-events-none" />

      {/* Right Vertical Dashed Line */}
      <div className="absolute right-0 top-0 h-full w-px border-r border-dashed border-neutral-300 dark:border-neutral-800 pointer-events-none" />

      {children}
    </div>
  )
}

export default Container;