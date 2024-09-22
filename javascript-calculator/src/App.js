import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("0");
  const [prevInput, setPrevInput] = useState("");
  const [operator, setOperator] = useState("");
  const [fullExpression, setFullExpression] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleNumberClick = (value) => {
    if (isResult) {
      setInput(value);
      setFullExpression(value); // Start new expression
      setIsResult(false);
    } else {
      setInput((prev) => (prev === "0" ? value : prev + value));
      setFullExpression((prev) => (prev === "0" ? value : prev + value)); // Update expression
    }
  };
  
  const handleOperatorClick = (value) => {
    if (operator && !isResult) {
      handleEquals();
    }
    setOperator(value);
    setPrevInput(input);
    setInput("0");
    setFullExpression((prev) => prev + ` ${value} `); // Update expression with operator
  };

  const handleDecimalClick = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
    }
  };

  const handleClear = () => {
    setInput("0");
    setPrevInput("");
    setOperator("");
    setIsResult(false);
    setFullExpression("");
  };

  const handleEquals = () => {
    if (operator && prevInput !== "") {
      const result = eval(`${prevInput} ${operator} ${input}`);
      setInput(String(result));
      setPrevInput("");
      setOperator("");
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
