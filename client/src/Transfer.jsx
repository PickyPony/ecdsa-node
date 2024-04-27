import { useState } from "react";
import server from "./server";
import {toSignature, recoverKey, isSigned} from "../../tools/myCrypto.mjs"

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [pw, setPw] = useState("");
  const [sig, setSig] = useState("");
  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const amount = parseInt(sendAmount)
    
    const [signature,recoveryId] = toSignature(address,amount,recipient, pw)
    try {
      const {data: { balance },} = await server.post(`send`, {
        sender: address,
        amount,
        recipient,
        signature,
        recoveryId
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Passwort
        <input
          placeholder="Type in your Privat PW"
          value={pw}
          onChange={setValue(setPw)}
        />
      </label>
      <input type="submit" className="button" value="Transfer" />
      
    </form>
  );
}

export default Transfer;
