import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fallback?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  fallback,
}) => {
  const [error, setError] = React.useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  const getFallbackInitials = () => {
    if (fallback) return fallback.charAt(0).toUpperCase();
    if (alt && alt !== 'Avatar') {
      const nameParts = alt.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
      }
      return alt.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className={`relative rounded-full overflow-hidden bg-gray-200 ${sizeClasses[size]} ${className}`}>
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex items-center justify-center h-full w-full bg-blue-600 text-white font-medium">
          {getFallbackInitials()}
        </div>
      )}
    </div>
  );
};

export default Avatar;