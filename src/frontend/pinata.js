const apiKey = process.env.REACT_APP_PINATA_KEY;
const apiSecret = process.env.REACT_APP_PINATA_SECRET;

const axios = require('axios');
const FormData = require('form-data');

export const uploadFileToIPFS = async (file) => {   
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', file);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: apiKey, 
                pinata_secret_api_key: apiSecret,  
            }
        })
        .then(function (response) {
            console.log("image uploaded", response.data.IpfsHash);
            return {
                success: true,
                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            };
        })
        .catch(function (error) {
            console.log(error);
            return {
                success: false,
                message: error.message,
            };
        });
};

export async function getURI_fromIPFS (filePath) {
    let  ipfsCID = await uploadFileToIPFS(filePath);
    return `https://gateway.pinata.cloud/ipfs/${ipfsCID}`;
}

export async function fetchImageFromIPFS (tokenURI) {  
    try {
        let response = await fetch(tokenURI);
  
        if (response.ok) {
            let imageBlob = await response.blob();
            return URL.createObjectURL(imageBlob);
        } else {
            console.error('Failed to fetch image from IPFS:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching image from IPFS:', error);
    }
}