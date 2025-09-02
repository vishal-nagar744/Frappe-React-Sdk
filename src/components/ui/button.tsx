import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "link"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2"
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      link: "text-blue-600 underline-offset-4 hover:underline bg-transparent"
    }
    return (
      <button ref={ref} className={cn(base, variants[variant], className)} {...props} />
    )
  }
)
Button.displayName = "Button"

export default Button
