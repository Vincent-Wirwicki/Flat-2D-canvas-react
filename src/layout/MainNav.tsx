import { NavLink } from "react-router-dom";

const MainNav = () => {
  // const navPaths = [""]
  const navPaths = [
    { path: "/", title: "Constellation" },
    { path: "/thewall", title: "The wall" },
    { path: "/wavegif", title: "Wave gif" },
    { path: "/lab", title: "lab" },
  ];
  return (
    <nav>
      <h1
        style={{
          fontSize: "2.3rem",
          fontStyle: "italic",
          letterSpacing: "2px",
          fontWeight: "600",
        }}
      >
        Flat
      </h1>
      {navPaths.map(({ path, title }, i) => (
        <NavLink key={path + i} className="link" to={path}>
          {title}
        </NavLink>
      ))}
    </nav>
  );
};

export default MainNav;
