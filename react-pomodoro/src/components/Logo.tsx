interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <a
      href="https://hayaku.studio"
      target="_blank"
      rel="noopener noreferrer"
      className={`hover:opacity-80 transition-opacity duration-200 ${className}`}
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
