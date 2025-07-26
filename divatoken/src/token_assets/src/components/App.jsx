import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";

function App() {

  return (
    <div id="screen">
      <Header />
      <div className="row-col">
      <Faucet />
      <Balance />
      </div>

      <Transfer />
    </div>
  );
}

export default App;
