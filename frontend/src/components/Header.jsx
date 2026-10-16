import Button from "./Button";

function Header() {
  return (
    <div>
      <nav className="navbar container pt-3 pb-3 align-items-start">
        <h1 className="navbar-brand text-light" href="#">
          Stock Market Predictor
        </h1>
        <div className="flex d-inline-flex">
          <Button type="info" link="#" text="Login" />&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="outline-info" link="#" text="Register" />
        </div>
      </nav>
    </div>
  );
}

export default Header;
