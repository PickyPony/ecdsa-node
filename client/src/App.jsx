import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import CreateWallet from "./CreateWallet"
function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  return (
    <div className="app">

      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      
      <Transfer setBalance={setBalance} address={address} />
      <CreateWallet/>

    </div>
  );
}

export default App;
