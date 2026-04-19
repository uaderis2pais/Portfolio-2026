import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export const InteractiveHoverButton = React.forwardRef(
  ({ as: Component = "button", children, className, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "group relative flex items-center justify-center min-w-[240px] cursor-pointer overflow-hidden rounded-full bg-white px-8 py-4 font-bold uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
          className,
        )}
        {...props}
      >
        <span className="relative z-20 flex items-center justify-center transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0 text-black font-black">
          {children}
        </span>
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 text-black opacity-0 transition-all duration-300 -translate-x-12 group-hover:translate-x-0 group-hover:opacity-100 font-black">
          <span>{children}</span>
          <ArrowRight className="w-5 h-5 -rotate-45" />
        </div>
        <div className="absolute left-4 top-1/2 z-10 h-3 w-3 -translate-y-1/2 rounded-full border border-cyan-400 bg-cyan-400 transition-all duration-300 group-hover:left-[0%] group-hover:top-[0%] group-hover:-translate-y-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.5] group-hover:bg-cyan-400 group-hover:border-transparent" />
      </Component>
    );
  },
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";
