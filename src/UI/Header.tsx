import { NavLink } from "react-router";
import MenuButton from "./MenuButton";

function Header({
  children,
  className,
  type,
}: {
  children: React.ReactNode;
  type?: "difficulty";
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between md:justify-start ${className}`}
    >
      <NavLink to={type === "difficulty" ? "/category-pick" : "/"}>
        <MenuButton type={"back"} />
      </NavLink>
      <p
        style={{
          textShadow:
            "0 0 6px #000, 0 0 10px #000, 0 0 14px #000, 0 0 18px #000",
        }}
        className="text-preset-6 mx-auto text-[#B3DAFF] md:text-[104px] md:tracking-[-1px] lg:text-[136px]"
      >
        {children}
      </p>
    </div>
  );
}

export default Header;
