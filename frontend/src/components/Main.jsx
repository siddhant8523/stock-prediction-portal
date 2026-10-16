import Button from "./Button";

function Main() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 rounded-5">
      <div className="p-5 text-center bg-light-dark rounded text-light w-50">
        <h1>Stock Prediction Portal</h1>
        <p className="text-light-lead">
          This stock prediction application utilizes machine learning
          techniques, specifically employing Keras, and LSTM model, integrated
          within the Django framework. It forecasts future stock prices by
          analyzing 100-day and 200-day moving averages, essential indicators
          widely used by stock analysts to inform trading and investment
          decisions.
        </p>
        <Button type="info" link="#" text="Login"/>
      </div>
    </div>
  );
}

export default Main;
