//require('dotenv').config()
//const key = process.env.REACT_APP_PINATA_KEY;
//const secret = process.env.REACT_APP_PINATA_SECRET;

const key = "50979cf15637d39e3441"
const secret = "f203f9069723eac2eb5e52540deb5e6112849f0ef3e6a8555f66808d266c2147"

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    console.log(key,secret)
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
        });
};