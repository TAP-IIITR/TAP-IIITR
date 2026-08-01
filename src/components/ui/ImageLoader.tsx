import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageLoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  wrapperClassName?: string;
}

export function ImageLoader({
  className,
  wrapperClassName,
  alt,
  src,
  ...props
}: ImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName, className)}>
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-200 animate-pulse">
          {/* Optional: Add a small spinner here if needed */}
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </div>
  );
}
