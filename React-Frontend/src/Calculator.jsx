import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Calculator.css";
import 'remixicon/fonts/remixicon.css';

function Calculator() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:4000/");
    setHistory(res.data);
  };
  const Clearhistroty=()=>{
      const clearhistroty= axios.delete("http://localhost:4000/delete");
    setHistory(clearhistroty);
  }

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };
 
  const handleClearFirstChar = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = async () => {
    try {
      const result = eval(input);
      setInput(result.toString());
      await axios.post("http://localhost:4000/", { expression: input, result });
      fetchHistory();
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator-container">
      <h1> Calculator</h1>
      <input type="text" className="display" value={input} readOnly />
     
      <div className="history-btn">
       <span><button onClick={() => setShowHistory(!showHistory)}>
          <i className="ri-history-line"></i> History
        </button></span>
        <span><button onClick={handleClearFirstChar}>X</button></span> 
        
      </div>
      <div className="button-container">
        {["1", "2", "3", "+", "4", "5", "6", "-", "7", "8", "9", "*", "0", "C", "=", "/"].map((btn) => (
          <button
            key={btn}
            className={["+", "-", "*", "/"].includes(btn) ? "operator" : btn === "=" ? "equals" : btn === "C" ? "clear" : "number"}
            onClick={() => (btn === "=" ? handleCalculate() : btn === "C" ? handleClear() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}
      </div>
      {showHistory && (
  <div>
    <h2>Calculation History</h2>
    {history.length > 0 ? (
      history.map((History, index) => (
        <div key={index} className="history-item">
          {History.expression} = {History.result}
        </div>
      ))
    
      ) : (
      <p>No history available</p>
    )}{history.length > 0 && (
        <button className="clear-history" onClick={Clearhistroty}>
          Clear History
        </button>
      )}
  </div>
)}

      
      
    </div>
  );
}

export default Calculator;
