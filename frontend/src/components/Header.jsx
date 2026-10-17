import { Link } from "react-router-dom";
import Button from "./Button";

function Header() {
  return (
    <div>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <Link className="navbar-brand text-light" to="/">
          <h3 className="fw-bold">Stock Market Predictor</h3>
        </Link>
        <div className="flex d-inline-flex">
          <Button type="info" url="login/" text="Login" />&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="outline-info" url="register/" text="Register" />
        </div>
      </nav>
    </div>
  );
}

export default Header;
