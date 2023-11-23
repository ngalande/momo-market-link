const { primaryKeyCollection, secondaryKeyCollection, webhook, primaryKeyDisbursement, uuid } = require("../configs/keys")
const { getAccessToken } = require("../utils/utils")

const axios = require("axios").default
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const momoURL = 'https://sandbox.momodeveloper.mtn.com/collection/v2_0/payment'

async function paymentStatus(data){
    // console.log(data)
    const token = await getAccessToken(primaryKeyCollection)

        return axios.get(`${momoURL}/${data.xref}`, {
            headers: {  
                'Ocp-Apim-Subscription-Key': primaryKeyCollection,
                'X-Target-Environment': 'sandbox',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token.access_token}`
            }
        }).then(res => {
            return res.data
        }).catch(e => {
            console.log(e.response.data)
            return e.response?.data
        })
  }


  module.exports = {
    paymentStatus
  }