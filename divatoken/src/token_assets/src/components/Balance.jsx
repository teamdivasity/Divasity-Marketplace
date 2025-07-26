import React, { useState, useEffect } from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token"

function Balance() {
  const [inputValue, setInput] = useState('');
  const [balanceResult, setBalance] = useState('');
  const [cryptoSymbol, setSymbol] = useState('');
  const [principalId, setPrincipalId] = useState(''); // New state for Principal ID
  const [isHidden, setHidden] = useState(true);

  // Fetch principalId on component mount
  useEffect(() => {
    async function fetchPrincipalId() {
      const principal = await token.getCallerPrincipal();
      setPrincipalId(principal);
    }
    fetchPrincipalId();
  }, []); // Empty dependency array ensures this runs only on mount
  
  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await token.getSymbol());
    setPrincipalId(await token.getCallerPrincipal()); // Call new backend function
    setHidden(false);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {cryptoSymbol}</p>
      <p>Principal ID: {principalId}</p> {/* New display for Principal ID */}
    </div>
  );
}

export default Balance;