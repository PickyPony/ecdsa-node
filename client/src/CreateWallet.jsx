import React, { useState } from 'react';

import { pwToAddress} from "../../tools/myCrypto.mjs"


const CreateWallet = () => {
    const [privatePw, setPrivatePw] = useState('');
    const [publicAddress, setPublicAddress] = useState('');

    const generateKeyPair = () => {
        setPublicAddress(pwToAddress(privatePw));
    };

    return (
        <div>
            <button onClick={generateKeyPair}>Generate Key Pair</button>
            <div>
                <label>Private Key:</label>
                <input type="text" value={privatePw} onChange={(e) => setPrivatePw(e.target.value)}/>
            </div>
            <div>
                <label>Public Key:</label>
                <input type="text" value={publicAddress} readOnly />
            </div>
        </div>
    );
};

export default CreateWallet;