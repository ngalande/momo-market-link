const {
    createAPIUserAndKey,
    createDisbursementAPI,
    PartyIDVariant,
    createCollectionAPI
  } = require('mtn-momo-client');
  const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    where,
    query
  } = require('firebase/firestore');



  const firebase = require('./firebase');
const { default: axios } = require('axios');
const { getAccessToken } = require('./src/utils/utils');

  const db = getFirestore(firebase);
  
  // async function getMostFrequentLocation() {
  //   const referenceId = '8a7dd0ea-1ce1-42fa-8085-463136cd8541'
  //   try {
  //     const collectionPrimaryKey = '31b3188305a046869164af9c0419b84b';
        
  //     const config = {
  //       userId: 'c75703cb-9668-4389-88f1-b0e9b2c7f0ae',
  //       apiKey: 'b236dfbee20c4e969b1ffe2225b4030f',
  //       targetEnvironment: 'sandbox',
  //       subscriptionKey: '31b3188305a046869164af9c0419b84b',
  //       providerCallbackHost: 'http://mml-backend.vercel.app/momocallback',
  //     } 
        
  //       // config.apiKey
  //       // config.targetEnvironment
  //     //   const collectionAPI = createCollectionAPI(config);
  //     // const paymentStatusAndDetails =
  //     // await collectionAPI.getAccountBalance();
  //     // console.log(paymentStatusAndDetails)
  //     const token = await getAccessToken(collectionPrimaryKey).then(res => {
  //       return res.access_token
  //     })
  //     console.log(token)
  //     axios.get('https://sandbox.momodeveloper.mtn.com/collection/v1_0/account/balance', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'X-Target-Environment': 'sandbox',
  //         'Ocp-Apim-Subscription-Key': collectionPrimaryKey
  //       }
  //     }).then(res=> {
  //       console.log(res.data)
  //     }).catch(e => {
  //       console.log(e.response)
  //     })
  //   } catch (error) {
  //     console.error('Error getting most frequent location:', error);
  //   }
  // }

  // getMostFrequentLocation().then((mostFrequentLocation) => {
  //   // console.log('Most frequent location:', mostFrequentLocation);
  // });
  

  const getAllTransactions = async() => { 
    try {
      const transactionCollection = collection(db, 'escrowTransactions');
      const q = query(collection(db, "escrowTransactions"), where("status", "==", 'Completed'));

      const transDocs = await getDocs(q);
      const escrowTransactions = []
      
      if (!transDocs.empty) {
        transDocs.forEach((doc) => {
          const { confirmationPin, ...dataWithoutConfirmationPin } = doc.data();
          escrowTransactions.push(dataWithoutConfirmationPin);
          // escrowTransactions.push(doc.data());
        });

        const sumCreditAmount = escrowTransactions.reduce(
          (accumulator, transaction) => accumulator + parseFloat(transaction.creditAmount || 0),
          0
        );

        const sumDebitedAmount = escrowTransactions.reduce(
          (accumulator, transaction) => accumulator + parseFloat(transaction.debitAmount || 0),
          0
        );
          console.log(sumDebitedAmount - sumCreditAmount)

          // if(transData.confirmationPin == data.confirmationPin){
          //     const transAmount =  Number(transData.debitAmount) * 0.95
          //     const transDocRef = doc(transactionCollection, transDoc.id);
          //     console.log(transAmount.toString())
          //     const updatedtransData = {
          //         status: 'Completed',
          //         creditAmount: transAmount.toString()
          //     }
          //     const { referenceId } = await disbursementAPI.transfer({
          //         amount: transAmount.toString(),
          //         currency: 'EUR',
          //         externalId: data.externalId,
          //         payee: {
          //             partyIdType: PartyIDVariant.MSISDN,
          //             partyId: transData.sellerPhone,
          //         },
          //         payerMessage: data.payerMessage,
          //         payeeNote: data.payeeNote,
          //     });
          //     console.log(referenceId)
        
          //     const transferStatusAndDetails = await disbursementAPI.getTransferStatus({
          //         referenceId,
          //         });
          //   await updateDoc(transDocRef, updatedtransData);
          //   await addDoc(collection(db, 'disbursementTransactions'), {
          //     buyerId: transData.buyerId,
          //     sellerId: transData.sellerId,
          //     referenceId: referenceId,
          //     data: transferStatusAndDetails
          //     // Add other user details as needed
          //   });
          //   return {status: 202, referenceId : referenceId, data: transferStatusAndDetails}
          // }else{
          //     return {status: 403,  message: 'Pin confirmation failed'}
          // }
      }else{
          return {status: 404, message: 'Transaction not found'}
      }
      } catch (error) {
        console.log(error)
        return{status: 500, data: 'Unknown error has occured'};
      }
   }

   
  // getAllTransactions().then((mostFrequentLocation) => {
  //   // console.log('Most frequent location:', mostFrequentLocation);
  // });

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }
  
  // Example usage to generate a string of length 32
  // const randomString = generateRandomString(32);
  // console.log(randomString);
  const getTransactionStatus = async(referenceId) => { 
    try {
        const collectionPrimaryKey = '31b3188305a046869164af9c0419b84b';
        
        const config = {
            userId: 'c75703cb-9668-4389-88f1-b0e9b2c7f0ae',
            apiKey: 'b236dfbee20c4e969b1ffe2225b4030f',
            targetEnvironment: 'sandbox',
            subscriptionKey: '31b3188305a046869164af9c0419b84b',
            providerCallbackHost: 'http://mml-backend.vercel.app/momocallback'
          }       
        const collectionAPI = createCollectionAPI(config);
        const paymentStatusAndDetails =
            await collectionAPI.requestToPayTransactionStatus({
              referenceId: '68baf1ca-5cfb-48ed-98e0-847787b4195c',
            });

          console.log(paymentStatusAndDetails)
        return {status: 200, data: paymentStatusAndDetails}
        
    } catch (error) {
        console.log(error.response)
        return {message: 'No transactions found', status: 404}
    }
   }

   getTransactionStatus().then(res=> {

   }).catch(e => {

   })