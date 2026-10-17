import Button from "./Button";

function Main() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className="p-5 text-center bg-light-dark rounded-5 text-light w-50">
          <h1>Stock Prediction Portal</h1>
          <p className="text-light-lead">
            This stock prediction application utilizes machine learning
            techniques, specifically Keras and LSTM models, integrated with
            Django. It forecasts future stock prices by analyzing 100-day and
            200-day moving averages.
          </p>
          <Button type="info" url="login/" text="Login" />
        </div>
      </div>
    </>
  );
}

export default Main;
