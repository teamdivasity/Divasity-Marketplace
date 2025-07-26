import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import {AuthClient} from "@dfinity/auth-client"

function Faucet() {

  const [isDisabled, setDisable] = useState(false);
  const [btnText, setBtnText] = useState("Claim Asset Tokens")

  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity()

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity, 
      }
    })

    const result = await authenticatedCanister.payOut();
    setBtnText(result);
    // setDisable(false);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="asset emoji">
        📈
        </span>
        Investment Tokenization Faucet
      </h2>
      <label>Claim your free DIVA tokens to represent tokenized investment opportunities!</label>
      <p>Tokenize investments like startup equity, real estate funds, or financial instruments as tradeable DIVA tokens on the blockchain. Enjoy fractional ownership and enhanced liquidity.</p>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
         {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;