function Button(props) {
  return (
    <div>
      <a className={`btn btn-${props.type}`}>{props.text}</a>
    </div>
  );
}

export default Button;
