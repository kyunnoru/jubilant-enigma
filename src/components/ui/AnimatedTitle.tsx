// src/components/ui/AnimatedTitle.tsx

interface AnimatedTitleProps {
  text: string;
}

const AnimatedTitle = ({ text }: AnimatedTitleProps) => {
  return (
    <span className="text-shimmer typing-effect">
      {text}
    </span>
  );
};

export default AnimatedTitle;
