'use client'

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { DividerHorizontalIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/app/lib/utils'

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-zinc-400 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 data-[state=true]:bg-zinc-900 data-[state=true]:border-zinc-900 data-[state=indeterminate]:bg-zinc-500 data-[state=indeterminate]:border-zinc-500 data-[state=indeterminate]:text-white data-[state=true]:text-zinc-50 dark:border-zinc-50 dark:focus-visible:ring-zinc-300 dark:data-[state=true]:bg-zinc-50 dark:data-[state=true]:text-zinc-900',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        {props.checked === 'indeterminate' && (
          <DividerHorizontalIcon className="m-0 p-0 h-min" />
        )}
        {props.checked === true && <CheckIcon className="m-0 p-0 h-min" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
