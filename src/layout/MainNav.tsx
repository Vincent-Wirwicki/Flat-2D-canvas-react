import { Link } from "react-router-dom";

const MainNav = () => {
  // const navPaths = [""]
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
      <Link className="link" to="/">
        fake 3D{" "}
      </Link>
      <Link className="link" to="/constellation">
        constellation
      </Link>
      <Link className="link" to="/thewall">
        the wall
      </Link>
    </nav>
  );
};

export default MainNav;
