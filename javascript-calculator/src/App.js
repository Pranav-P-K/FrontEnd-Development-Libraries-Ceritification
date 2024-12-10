import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("0");
  const [fullExpression, setFullExpression] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleNumberClick = (value) => {
    if (isResult) {
      setInput(value);
      setFullExpression(value);
      setIsResult(false);
    } else {
      setInput((prev) => (prev === "0" ? value : prev + value));
      setFullExpression((prev) =>
        prev === "0" ? value : prev + value
      );
    }
  };

  const handleOperatorClick = (value) => {
    if (isResult) {
      setIsResult(false);
      setFullExpression(input + ` ${value} `);
    } else if (
      !["+", "-", "*", "/"].includes(fullExpression.slice(-2).trim())
    ) {
      setFullExpression((prev) => prev + ` ${value} `);
    }
    setInput("0");
  };

  const handleDecimalClick = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
      setFullExpression((prev) => prev + ".");
    }
  };

  const handleClear = () => {
    setInput("0");
    setFullExpression("");
    setIsResult(false);
  };

  const handleEquals = () => {
    try {
      if (
        !["+", "-", "*", "/"].includes(fullExpression.slice(-2).trim())
      ) {
        const result = eval(fullExpression);
        setInput(String(result));
        setFullExpression(String(result));
        setIsResult(true);
      }
    } catch (error) {
      setInput("Error");
      setFullExpression("");
      setIsResult(true);
    }
  };

  return (
    <div className="calculator">
      <div id="expression" className="expression">
        {fullExpression}
      </div>
      <div id="display" className="display">
        {input}
      </div>
      <div className="buttons">
        <button id="clear" className="button clear" onClick={handleClear} style={{ gridColumn: 'span 2' }}>
          AC
        </button>
        <button
          id="divide"
          className="button operator"
          onClick={() => handleOperatorClick("/")}
        >
          ÷
        </button>
        <button
          id="multiply"
          className="button operator"
          onClick={() => handleOperatorClick("*")}
        >
          ×
        </button>
        <button id="seven" className="button" onClick={() => handleNumberClick("7")}>
          7
        </button>
        <button id="eight" className="button" onClick={() => handleNumberClick("8")}>
          8
        </button>
        <button id="nine" className="button" onClick={() => handleNumberClick("9")}>
          9
        </button>
        <button
          id="subtract"
          className="button operator"
          onClick={() => handleOperatorClick("-")}
        >
          −
        </button>
        <button id="four" className="button" onClick={() => handleNumberClick("4")}>
          4
        </button>
        <button id="five" className="button" onClick={() => handleNumberClick("5")}>
          5
        </button>
        <button id="six" className="button" onClick={() => handleNumberClick("6")}>
          6
        </button>
        <button
          id="add"
          className="button operator"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>
        <button id="one" className="button" onClick={() => handleNumberClick("1")}>
          1
        </button>
        <button id="two" className="button" onClick={() => handleNumberClick("2")}>
          2
        </button>
        <button id="three" className="button" onClick={() => handleNumberClick("3")}>
          3
        </button>
        <button id="equals" className="button equals" onClick={handleEquals}>
          =
        </button>
        <button id="zero" className="button zero" onClick={() => handleNumberClick("0")}>
          0
        </button>
        <button id="decimal" className="button" onClick={handleDecimalClick}>
          .
        </button>
      </div>
    </div>
  );
};

export default App;
