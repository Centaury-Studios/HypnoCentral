import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "btn-primary",
        ghost: "btn-ghost text-white",
        accent: "bg-accent text-dark-950 shadow-lg hover:bg-accent-200 hover:shadow-accent/25",
        secondary: "bg-secondary text-dark-950 shadow-lg hover:bg-secondary-200 hover:shadow-secondary/25",
        outline: "border border-white/20 bg-transparent text-white hover:bg-white/5",
        gaming: "bg-primary text-dark-950 shadow-xl hover:bg-primary-200 hover:shadow-primary/30 font-gaming tracking-wider",
      },
      size: {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-xl",
        xl: "px-10 py-5 text-xl rounded-2xl",
        icon: "p-3 rounded-xl",
      },
      font: {
        default: "font-sans",
        gaming: "font-gaming tracking-wider",
        display: "font-display",
        tech: "font-tech",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      font: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  animate?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    font,
    asChild = false, 
    href, 
    icon, 
    iconPosition = 'right', 
    loading = false,
    animate = true,
    children, 
    ...props 
  }, ref) => {
    const Component = href ? 'a' : 'button';
    
    const content = (
      <>
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
        )}
        {icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </>
    );

    if (animate) {
      return (
        <motion.div
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Component
            className={cn(buttonVariants({ variant, size, font, className }))}
            ref={ref}
            href={href}
            {...props}
          >
            {content}
          </Component>
        </motion.div>
      );
    }

    return (
      <Component
        className={cn(buttonVariants({ variant, size, font, className }))}
        ref={ref}
        href={href}
        {...props}
      >
        {content}
      </Component>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };