//
import appLogo_2 from "../../images/appLogo-2.png";

export default function Navbar() {
  return (
    <nav className="nav-cont">
      <div className="logo-cont">
        <img src={appLogo_2} alt="app-logo" />
        <span>PhotoFolio</span>
      </div>
    </nav>
  );
}
