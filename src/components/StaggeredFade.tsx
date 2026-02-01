interface StaggeredFadeProps {
  children: React.ReactNode[];
  delay?: number;
  isVisible: boolean;
}

export function StaggeredFade({
  children,
  delay = 100,
  isVisible,
}: StaggeredFadeProps) {
  return (
    <>
      {children.map((child, index) => (
        <div
          key={index}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.5s ease ${index * delay}ms, transform 0.5s ease ${index * delay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </>
  );
}
