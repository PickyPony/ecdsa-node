import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256} from "ethereum-cryptography/keccak.js";

export function toSignature(sender, amount, recipient, privatePw){
    //sender must be the public hexKey of the sender pirvatePass
    if(pwToAddress(privatePw) !== sender){
        console.log("Private key mismatch")
    }
    const msgHash =  hashMsg(sender, amount, recipient)
    const signature = secp256k1.sign(msgHash, pwToPrivateKey(privatePw));
    return [signature.toCompactHex(), signature.recovery]
}
export function pwToPrivateKey(pw){
    return keccak256(utf8ToBytes(pw));
}


export function pwToAddress(privatePw){
    const _privateKey = pwToPrivateKey(privatePw)
    // Derive the corresponding public key
    const _publicKey = toHex(secp256k1.getPublicKey(_privateKey));
    console.log(_publicKey)
    // Convert the keys to hexadecimal strings
    const _publicKeyHex = _publicKey.toString('hex');
    return _publicKeyHex.slice(0,6)
}

export function hashMsg(sender, amount, recipient){
    const msg = {sender, amount, recipient}
    return keccak256(utf8ToBytes(JSON.stringify(msg)))
}

export function recoverKey(signature, sender, amount, recipient) {
    const hash = hashMsg(sender,amount,recipient)
    return signature.recoverPublicKey(hash).toHex();
}



export function recoverAddress(signature, sender, amount, recipient) {
    const hash = hashMsg(sender,amount,recipient)
    return signature.recoverPublicKey(hash).toHex();
}


export function isSigned(signature, sender, amount, recipient, recoveryId){
    signature = secp256k1.Signature.fromCompact(signature)
    signature.recovery = recoveryId
    const hash = hashMsg(sender,amount,recipient)
    const pKey = signature.recoverPublicKey(hash).toHex();
    if(pKey.slice(0,6)!== sender){
        throw new Error('Message must be signed by the sender.');
    }
    return secp256k1.verify(signature, hash, pKey);
}

