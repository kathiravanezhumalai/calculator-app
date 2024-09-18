import React, { useState } from "react";
import "../styles/Calculator.css";

const CalculatorApp = () => {
  const [input, setInput] = useState("0");
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(null);

  const handleButtonClick = (value) => {
    switch (value) {
      case "=":
        calculateResult();
        break;
      case "C":
        resetInput();
        break;
      case "CE":
        clearLastEntry();
        break;
      case "M+":
        addToMemory();
        break;
      case "MR":
        recallMemory();
        break;
      case "MC":
        clearMemory();
        break;
      case "Clear History":
        clearHistory();
        break;
      default:
        updateInput(value);
    }
  };

  const calculateResult = () => {
    try {
      const result = eval(input); 
      setHistory([...history, { expression: input, result }]);
      setInput(String(result));
    } catch {
      setInput("Error");
    }
  };

  const resetInput = () => setInput("0");

  const clearLastEntry = () => setInput(input.slice(0, -1) || "0");

  const addToMemory = () => setMemory(eval(input));

  const recallMemory = () => memory && setInput(String(memory));

  const clearMemory = () => setMemory(null);

  const clearHistory = () => setHistory([]);

  const updateInput = (value) => {
    setInput(input === "0" ? value : input + value);
  };

  return (
    <div className="calculator-container-main">
      <div className="calculator-display-inner">{input}</div>

      <div className="history-memory-panel-sec">
        <History history={history} clearHistory={clearHistory} />
        <Memory memory={memory} />
      </div>

      <CalculatorButtons onClick={handleButtonClick} />
    </div>
  );
};

const History = ({ history, clearHistory }) => (
  <div className="history-main">
    <h4>History</h4>
    {history.length > 0 ? (
      <>
        {history.map((item, index) => (
          <div key={index} className="history-item-main">
            {item.expression} = {item.result}
          </div>
        ))}
        <button className="clear-history-btn-center" onClick={clearHistory}>
          Clear History
        </button>
      </>
    ) : (
      <div className="no-history-content">There's no history yet</div>
    )}
  </div>
);

const Memory = ({ memory }) => (
  <div className="memory-badge">
    <h4>Memory</h4>
    <div className="memory-value-main">
      {memory !== null ? memory : "No memory stored"}
    </div>
  </div>
);

const CalculatorButtons = ({ onClick }) => (
  <div className="calculatorapp-buttons">
    <div className="memoryleft-buttons">
      {["MC", "MR", "M+"].map((btn) => (
        <button key={btn} onClick={() => onClick(btn)}>
          {btn}
        </button>
      ))}
    </div>

    <div className="button-grid-main">
      {["7", "8", "9", "/", "CE", "C", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map(
        (btn) => (
          <button key={btn} onClick={() => onClick(btn)} className="calc-btn-center">
            {btn}
          </button>
        )
      )}
    </div>
  </div>
);

export default CalculatorApp;
