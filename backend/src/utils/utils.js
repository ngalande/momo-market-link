const { primaryKeyCollection, secondaryKeyCollection, webhook, primaryKeyDisbursement, uuid } = require("../configs/keys")
const firebase = require('../../firebase');
const User = require ('../models/user.model');
const {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');

const db = getFirestore(firebase);
const axios = require("axios").default
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const momoURL = 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser'
const tokenURL = 'https://sandbox.momodeveloper.mtn.com/collection/token/'
const payURL = 'https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay'

const getUUID = async() => { 
    return axios.get('https://www.uuidgenerator.net/api/version4')
        .then(res =>{
            return res.data
        }).catch(e => {
            // console.log(e)
            return 'null'
        })
 }

 const getAPIKey = async(key) => {
    // console.log(webhook)
    
    const payload = {
        "providerCallbackHost": webhook
    }
    return axios.post(momoURL, payload, {
        headers: {
            'X-Reference-Id': uuid,
            'Ocp-Apim-Subscription-Key': key
        }
    }).then(res => {
        console.log('hello')
        return axios.post(`${momoURL}/${uuid}/apikey`, {}, {
            headers: {
                'Ocp-Apim-Subscription-Key': key
            }
        }).then(res2 => {
            // console.log(res2.data)
            return res2.data
        }).catch(e2 => {
            console.log(e2.response)
            return e2.response.status
        })
    }).catch(e => {
        // console.log(e.response)
        if(e.response.status === 409){
            return axios.post(`${momoURL}/${uuid}/apikey`, {}, {
                headers: {
                    'Ocp-Apim-Subscription-Key': key
                }
            }).then(res2 => {
                return res2.data
            }).catch(e2 => {
                console.log(e2.response)
                return e2.response.status
            })
        }else{
            console.log(e.response)
            return e.response.status
        }
    })
}



// getDisbursementAPIKey().then(res => {
//     console.log(res)
// })


const getAccessToken = async(key) => {
    const pass = await getAPIKey(key)
    // console.log(pass)
    return axios.post(tokenURL, {}, {
        headers: {
            'Ocp-Apim-Subscription-Key': key
        },
        auth :{
            username: uuid,
            password: pass.apiKey
        }
    }).then(res => {
        // console.log(res.data)
        return res.data
    }).catch(e => {
        console.log(e.response)
        return e.response.status
    })
}


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

const requestToPayFunc = async(data) => {
    const xid = await getUUID()
    const key = primaryKeyCollection
    const token = await getAccessToken(key)
    const payload = {
        "amount": data.amount,
        "currency": data.currency,
        "externalId": data.externalId,
        "payer": data.payer,
        "payerMessage": data.payerMessage,
        "payeeNote": data.payeeNote
    }
    return axios.post(payURL, payload, {
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'X-Reference-Id': xid,
            'X-Target-Environment': 'sandbox',
            "Content-Type": 'application/json',
            'X-Callback-Url': 'http://mml-backend.vercel.app/momocallback',
            Authorization: `Bearer ${token.access_token}`
        }
    }).then(res =>  {
        // console.log(res.data)
        return addDoc(collection(db, 'initTransactions'), {uid: data.uid, xid: xid, sellerId: data.sellerId}).then(
            response => {
                return {status: res.status, xid: xid}

            }
        )
    }).catch(e => {
        console.log(e.response)
        return {status: e.response.status}
    })
}

const randomString = generateRandomString(8);
// requestToPay('5.0', 'EUR', randomString, '09877534', 'Hello', 'Hi', primaryKeyCollection ).then(res => {
//     console.log(res)
// })
module.exports = {
    requestToPayFunc,
    getAccessToken
}