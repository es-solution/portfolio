const ShinyText = ({ text, disabled = false, speed = 5, className = '', style = {} }) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text ${disabled ? '' : 'animate-shine'} ${className}`}
      style={{
        ...style,
        '--animation-duration': animationDuration,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;