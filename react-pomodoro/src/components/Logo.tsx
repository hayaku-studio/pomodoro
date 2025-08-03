interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <a
      href="https://hayaku.studio"
      target="_blank"
      rel="noopener noreferrer"
      className={`transition-opacity duration-200 hover:opacity-80 ${className}`}
      aria-label="Hayaku Studio"
    >
      <img
        src="/hayaku.svg"
        alt="Hayaku Studio Logo"
        width="32"
        height="25"
        className="dark:invert"
      />
    </a>
  );
};

export default Logo;
