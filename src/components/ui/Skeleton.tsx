interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton = ({ className = '', variant = 'rectangular' }: SkeletonProps) => {
  const variants = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: 'rounded',
  };

  return (
    <div
      className={`skeleton ${variants[variant]} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
};

export default Skeleton;