import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '~/utils/class';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={4}
    className={cn(
      'z-50 overflow-hidden rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50'
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

type ToolTipProps = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

function ToolTip({ trigger, children }: ToolTipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export default ToolTip;
