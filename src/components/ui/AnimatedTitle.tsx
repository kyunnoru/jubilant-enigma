interface AnimatedTitleProps {
  text?: string;
}

const AnimatedTitle = ({ text = "" }: AnimatedTitleProps) => {
  return (
    <span className="text-purple-300">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default AnimatedTitle;