import { Link } from "react-router-dom";

function Button(props) {
  return (
    <div>
      <Link className={`btn btn-${props.type}`} to={`${props.url}`}>{props.text}</Link>
    </div>
  );
}

export default Button;
''