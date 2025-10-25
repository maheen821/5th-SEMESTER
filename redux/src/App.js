import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { incNum, decNum } from "./actions";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const [bgColor, setBgColor] = useState("#66a6ff");

  // Generate random pastel color
  const randomColor = () => {
    const r = Math.floor(Math.random() * 156 + 100);
    const g = Math.floor(Math.random() * 156 + 100);
    const b = Math.floor(Math.random() * 156 + 100);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const handleIncrement = () => {
    dispatch(incNum());
    setBgColor(randomColor());
  };

  const handleDecrement = () => {
    dispatch(decNum());
    setBgColor(randomColor());
  };

  const handleReset = () => {
    dispatch({ type: "RESET" }); // Make sure you have a RESET action in your reducer
    setBgColor("#66a6ff");
  };

  return (
    <div className="app-container" style={{ background: bgColor }}>
      <h1 className="title">Colorful Redux Counter</h1>
      <div className="counter-card">
        <button className="counter-btn" onClick={handleDecrement}>
          −
        </button>
        <input className="counter-value" type="text" value={counter} readOnly />
        <button className="counter-btn" onClick={handleIncrement}>
          +
        </button>
      </div>
      <button className="reset-btn" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
