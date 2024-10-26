import { forwardRef } from "react"
import { cn } from "~/lib/utils"

export const FormItem = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) =>
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
)
FormItem.displayName = "FormItem"

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[0.8rem] font-medium text-destructive", className)}
    {...props}
  >
    {children}
  </p>
));
FormMessage.displayName = "FormMessage"
