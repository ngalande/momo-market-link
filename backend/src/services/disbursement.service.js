const {
    createAPIUserAndKey,
    createDisbursementAPI,
    PartyIDVariant
  } = require('mtn-momo-client');
  const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    where,
    query
  } = require('firebase/firestore');



  const firebase = require('../../firebase');

  const db = getFirestore(firebase);
  
  const disbursementPrimaryKey =
    'e38b5eb52cd249a2a88bbd9d7fe69132';
  
const transferFunds = async(data) => { 
    if(!data.externalId){
        return {status: 'externalId is required'}
    }else if(!data.payerMessage){
        return {status: 'payerMessage is required'}
    }else if(!data.referenceId){
        return {status: 'referenceId is required'}
    }else{
    try {
        // const config = await createAPIUserAndKey({
        //   providerCallbackHost: 'http://mml-backend.vercel.app/momocallback',
        //   subscriptionKey: disbursementPrimaryKey,
        // });
        const config = {
            userId: '8402fe0a-a7ae-43bc-aaea-5262d4e7c530',
            apiKey: 'bc314c74f1c145e09ce186ac2fdd82dc',
            targetEnvironment: 'sandbox',
            subscriptionKey: 'e38b5eb52cd249a2a88bbd9d7fe69132',
            providerCallbackHost: 'http://mml-backend.vercel.app/momocallback'
          }
        // returns an object containing methods you can use to access the disbursement api
        const disbursementAPI = createDisbursementAPI(config);
            const transactionCollection = collection(db, 'escrowTransactions');
            const q = query(collection(db, "escrowTransactions"), where("referenceId", "==", data.referenceId));

            const transDocs = await getDocs(q);
            
            
            if (!transDocs.empty) {
                const transDoc = transDocs.docs[0];
                const transData = transDoc.data()
                
                if(transData.status == 'Completed'){
                    return {status: 401,  message: 'Transaction already completed'}
                }
                if(transData.confirmationPin == data.confirmationPin){
                    const transAmount =  Number(transData.debitAmount) * 0.95
                    const transDocRef = doc(transactionCollection, transDoc.id);
                    console.log(transAmount.toString())
                    const updatedtransData = {
                        status: 'Completed',
                        creditAmount: transAmount.toString()
                    }
                    const { referenceId } = await disbursementAPI.transfer({
                        amount: transAmount.toString(),
                        currency: 'EUR',
                        externalId: data.externalId,
                        payee: {
                            partyIdType: PartyIDVariant.MSISDN,
                            partyId: transData.sellerPhone,
                        },
                        payerMessage: data.payerMessage,
                        payeeNote: data.payeeNote,
                    });
                    console.log(referenceId)
              
                    const transferStatusAndDetails = await disbursementAPI.getTransferStatus({
                        referenceId,
                        });
                  await updateDoc(transDocRef, updatedtransData);
                  await addDoc(collection(db, 'disbursementTransactions'), {
                    buyerId: transData.buyerId,
                    sellerId: transData.sellerId,
                    referenceId: referenceId,
                    data: transferStatusAndDetails
                    // Add other user details as needed
                  });
                  return {status: 202, referenceId : referenceId, data: transferStatusAndDetails}
                }else{
                    return {status: 403,  message: 'Pin confirmation failed'}
                }
            }else{
                return {status: 404, message: 'Transaction not found'}
            }
        
    } catch (error) {
        console.log(error.response?.data)
        return {status: 500, message: 'Unknown error occured'}
    }
}
 }

 const getDisbursementTransactionStatus = async(referenceId) => { 
    console.log(referenceId)
    try {
        const config = {
            userId: '8402fe0a-a7ae-43bc-aaea-5262d4e7c530',
            apiKey: 'bc314c74f1c145e09ce186ac2fdd82dc',
            targetEnvironment: 'sandbox',
            subscriptionKey: 'e38b5eb52cd249a2a88bbd9d7fe69132',
            providerCallbackHost: 'http://mml-backend.vercel.app/momocallback'
          }
          
          // returns an object containing methods you can use to access the disbursement api
          const disbursementAPI = createDisbursementAPI(config);
        const transferStatusAndDetails = await disbursementAPI.getTransferStatus({
            referenceId,
          });
        return {status: 200, data: transferStatusAndDetails}
        
    } catch (error) {
        console.log(error.response.data)
        return {message: 'No transactions found', status: 404}
    }
   }


   async function getAccountBalance(){
    // console.log(data)
    try {
        const config = {
            userId: '8402fe0a-a7ae-43bc-aaea-5262d4e7c530',
            apiKey: 'bc314c74f1c145e09ce186ac2fdd82dc',
            targetEnvironment: 'sandbox',
            subscriptionKey: 'e38b5eb52cd249a2a88bbd9d7fe69132',
            providerCallbackHost: 'http://mml-backend.vercel.app/momocallback'
          }

          console.log(config)
          
          // returns an object containing methods you can use to access the disbursement api
        const disbursementAPI = createDisbursementAPI(config);
        // console.log(disbursementAPI)
        const accountBalance = await disbursementAPI.getAccountBalance();
        return {status: 200, data: accountBalance}
        
    } catch (error) {
        console.log(error.response?.data)
        return {message: error.response?.data?.message, status: 500}
    }

  }

 module.exports = {
    transferFunds,
    getDisbursementTransactionStatus,
    getAccountBalance
 }