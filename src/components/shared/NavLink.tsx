import { Link } from "react-router-dom";

interface Props {
  to: string;
  text: string;
  bg?: string;
  textColor?: string;
  onClick?: () => Promise<void>;
}

const NavLink = ({ to, text, bg, textColor, onClick }: Props) => {
  return (
    <Link
      to={to}
      style={{ background: bg, color: textColor }}
      onClick={onClick}
      className="nav__link"
    >
      {text}
    </Link>
  );
};

export default NavLink;
