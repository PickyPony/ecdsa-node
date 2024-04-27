import express from "express";
import {isSigned} from "./myCrypto.mjs";
import cors from "cors";
const app = express();
const port = 3042;
app.use(cors());
app.use(express.json());

const balances = {
  "0x1": 100,
  "0x2": 50,
  "0x3": 75,
  "033cae": 100,
};


app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature,recoveryId} = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  try{
    if(!isSigned(signature, sender,amount,recipient, recoveryId)){
      res.status(400).send({ message: "Signature not valid!" });
      return
    }
  }catch(error){
    res.status(400).send({ message: "Signer must be the sender" });
    return
  }


  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
