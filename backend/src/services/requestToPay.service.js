const { requestToPayFunc } = require("../utils/utils")
const { createAPIUserAndKey, createAccessToken, TargetEnvironment, PartyIDVariant, createCollectionAPI } = require('mtn-momo-client');
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
    query,
    orderBy,
     limit
  } = require('firebase/firestore');
  const moment = require('moment-timezone');

  const firebase = require('../../firebase');

  const db = getFirestore(firebase);

  // Generate a 6-digit random number
const generateSixDigitNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const sixDigitNumber = randomNumber.toString().padStart(6, '0');
    return sixDigitNumber;
  };
  
  
async function requestToPay(data){
    // console.log(data)
    
    const lusakaTime = moment().tz('Africa/Lusaka');
    const pin = generateSixDigitNumber();

    // Format and display the current time in Lusaka
    const time = lusakaTime.format('YYYY-MM-DD HH:mm:ss');
    if(!data.debitAmount){
        return {status: 'debitAmount is required'}
    }else if(!data.buyerId){
        return {status: 'buyerId is required'}
    }else if(!data.sellerId){
        return {status: 'sellerId is required'}
    }else if(!data.debitAmount){
        return {status: 'debitAmount is required'}
    }else if(!data.deliveryDuration){
        return {status: 'deliveryDuration is required'}
    }else if(!data.serviceType){
        return {status: 'serviceType is required'}
    }else if(!data.city){
        return {status: 'city is required'}
    }else{
        try {
            const collectionPrimaryKey = '31b3188305a046869164af9c0419b84b';
    
            // const config = await createAPIUserAndKey({
            // providerCallbackHost: 'http://mml-backend.vercel.app/momocallback',
            // subscriptionKey: collectionPrimaryKey,
            // });
            const config = {
                userId: 'c75703cb-9668-4389-88f1-b0e9b2c7f0ae',
                apiKey: 'b236dfbee20c4e969b1ffe2225b4030f',
                targetEnvironment: 'sandbox',
                subscriptionKey: '31b3188305a046869164af9c0419b84b',
                providerCallbackHost: 'http://mml-backend.vercel.app/momocallback'
              }
    
            const collectionAPI = createCollectionAPI(config);
            const { referenceId } = await collectionAPI.requestToPay({
                amount: data.debitAmount,
                currency: 'EUR',
                externalId: data.externalId,
                payer: {
                  partyIdType: PartyIDVariant.MSISDN,
                  partyId: data.buyerPhone,
                },
                payerMessage: data.payerMessage,
                payeeNote: data.payeeNote,
              });
              const paymentStatusAndDetails =
                await collectionAPI.requestToPayTransactionStatus({
                    referenceId,
                });
                await addDoc(collection(db, 'transactions'), {
                    buyerId: data.buyerId,
                    sellerId: data.sellerId,
                    sellerPhone: data.sellerPhone,
                    buyerPhone: data.buyerPhone,
                    serviceType: data.serviceType,
                    deliveryDuration: data.deliveryDuration,
                    data: paymentStatusAndDetails
                    // Add other user details as needed
                  });
                await addDoc(collection(db, 'escrowTransactions'), {
                    buyerId: data.buyerId,
                    sellerId: data.sellerId,
                    sellerPhone: data.sellerPhone,
                    buyerPhone: data.buyerPhone,
                    serviceType: data.serviceType,
                    deliveryDuration: data.deliveryDuration,
                    debitAmount: paymentStatusAndDetails.amount,
                    creditAmount: '',
                    status: 'Pending_Delivery',
                    createdAt: time,
                    confirmationPin: pin,
                    referenceId: referenceId,
                    location: data.city,
                    deliveryId: ''
                    // Add other user details as needed
                  })
            return {
                referenceId : referenceId, 
                confirmationPin: pin, 
                buyerId: data.buyerId,
                sellerId: data.sellerId,
                deliveryId: '',
                status: 'Pending_Delivery',
                data: paymentStatusAndDetails,
            };
            
        } catch (error) {
            console.log(error)
            return {status: 500, message: 'Unknown error occured'}
        }
    }
  }


  const getActiveTransaction = async() => { 
    try {
        const q = query(collection(db, "escrowTransactions"), where("status", "==", 'Pending_Delivery'));
  
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const escrowTransactions = [];
          querySnapshot.forEach((doc) => {
            const { confirmationPin, ...dataWithoutConfirmationPin } = doc.data();
            escrowTransactions.push(dataWithoutConfirmationPin);
            // escrowTransactions.push(doc.data());
          });
          // const transData = querySnapshot.docs.;
          // console.log(userDoc.docs)
          return {status: 200, data: escrowTransactions};
        } else {
          return {status: 404, data: 'no active transactions not found'};
        }
      } catch (error) {
        console.log(error)
        return{status: 500, data: 'Unknown error has occured'};
      }
   }

   const getAllTransactions = async() => { 
    try {
        const q = query(collection(db, "escrowTransactions"));
  
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const escrowTransactions = [];
          querySnapshot.forEach((doc) => {
            const { confirmationPin, ...dataWithoutConfirmationPin } = doc.data();
            escrowTransactions.push(dataWithoutConfirmationPin);
            // escrowTransactions.push(doc.data());
          });
          // const transData = querySnapshot.docs.;
          // console.log(userDoc.docs)
          return {status: 200, data: escrowTransactions};
        } else {
          return {status: 404, data: 'no transactions not found'};
        }
      } catch (error) {
        console.log(error)
        return{status: 500, data: 'Unknown error has occured'};
      }
   }

   const getCreditedAmounts = async() => { 
    try {
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
            console.log(sumCreditAmount)
            return {status: 200, message: sumCreditAmount}
  
        }else{
            return {status: 404, message: 'Transaction not found'}
        }
      } catch (error) {
        console.log(error)
        return{status: 500, data: 'Unknown error has occured'};
      }
   }


   const getDebitedAmounts = async() => { 
    try {
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
            (accumulator, transaction) => accumulator + parseFloat(transaction.debitAmount || 0),
            0
          );
            console.log(sumCreditAmount)
            return {status: 200, message: sumCreditAmount}
  
        }else{
            return {status: 404, message: 'Transaction not found'}
        }
      } catch (error) {
        console.log(error)
        return{status: 500, data: 'Unknown error has occured'};
      }
   }



   const getTotalCommisions = async() => { 
    try {
        const q = query(collection(db, "escrowTransactions"), where("status", "==", 'Completed'));

        const transDocs = await getDocs(q);
        const escrowTransactions = []
        
        if (!transDocs.empty) {
          transDocs.forEach((doc) => {
            const { confirmationPin, ...dataWithoutConfirmationPin } = doc.data();
            escrowTransactions.push(dataWithoutConfirmationPin);
            // escrowTransactions.push(doc.data());
          });
  
          const sumDebitAmount = escrowTransactions.reduce(
            (accumulator, transaction) => accumulator + parseFloat(transaction.debitAmount || 0),
            0
          );

          const sumCreditAmount = escrowTransactions.reduce(
            (accumulator, transaction) => accumulator + parseFloat(transaction.creditAmount || 0),
            0
          );
          const total = (sumDebitAmount - sumCreditAmount)
          console.log(total)
        return {status: 200, message: total}
  
        }else{
            return {status: 404, message: 'Transaction not found'}
        }
      } catch (error) {
        console.log(error)
        return{status: 500, data: 'Unknown error has occured'};
      }
   }


  const getTransactionStatus = async(referenceId) => { 
    try {
        const collectionPrimaryKey = '31b3188305a046869164af9c0419b84b';
        console.log(referenceId)
        
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
                referenceId: referenceId,
            });
        return {status: 200, data: paymentStatusAndDetails}
        
    } catch (error) {
        console.log(error.response)
        return {message: 'No transactions found', status: 404}
    }
   }


   const getAllBuyerTransactions = async(uid) => { 

    try {
      const q = query(collection(db, "escrowTransactions"), where("buyerId", "==", uid));

      const querySnapshot = await getDocs(q);
      const escrowTransactions = [];
      if (!querySnapshot.empty) {
        for (const docRef of querySnapshot.docs) {
          const transactionData = docRef.data();
           // Get seller details
          const sellerQ = query(collection(db, 'users'), where('uid', '==', transactionData.sellerId));
          const sellerSnapshot = await getDocs(sellerQ);
          
          const sellerData = sellerSnapshot.empty ? {} : sellerSnapshot.docs[0].data();

          // Get buyer details
          const buyerQ = query(collection(db, 'users'), where('uid', '==', transactionData.buyerId));
          const buyerSnapshot = await getDocs(buyerQ);
          const buyerData = buyerSnapshot.empty ? {} : buyerSnapshot.docs[0].data();

          const transactionDetails = {
            ...transactionData,
            sellerData: sellerData,
            buyerData: buyerData,
          };
          console.log(transactionDetails)
          const { confirmationPin, ...dataWithoutConfirmationPin } = transactionDetails;
            // dataWithoutConfirmationPin.sellerName = ;
            escrowTransactions.push(dataWithoutConfirmationPin);

        }
        // const transData = querySnapshot.docs.;
        // console.log(userDoc.docs)
        return {status: 200, data: escrowTransactions};
      } else {
        return {status: 404, data: 'transactions not found'};
      }
    } catch (error) {
      console.log(error)
      return{status: 500, data: 'Unknown error has occured'};
    }
    }
    const getAllSellerTransactions = async(uid) => { 
        try {
          const q = query(collection(db, "escrowTransactions"), where("sellerId", "==", uid));
    
          const querySnapshot = await getDocs(q);
          const escrowTransactions = [];
          if (!querySnapshot.empty) {
            for (const docRef of querySnapshot.docs) {
              const transactionData = docRef.data();
               // Get seller details
              const sellerQ = query(collection(db, 'users'), where('uid', '==', transactionData.sellerId));
              const sellerSnapshot = await getDocs(sellerQ);
              
              const sellerData = sellerSnapshot.empty ? {} : sellerSnapshot.docs[0].data();
    
              // Get buyer details
              const buyerQ = query(collection(db, 'users'), where('uid', '==', transactionData.buyerId));
              const buyerSnapshot = await getDocs(buyerQ);
              const buyerData = buyerSnapshot.empty ? {} : buyerSnapshot.docs[0].data();
    
              const transactionDetails = {
                ...transactionData,
                sellerData: sellerData,
                buyerData: buyerData,
              };
              console.log(transactionDetails)
              const { confirmationPin, ...dataWithoutConfirmationPin } = transactionDetails;
                // dataWithoutConfirmationPin.sellerName = ;
                escrowTransactions.push(dataWithoutConfirmationPin);
    
            }
            return {status: 200, data: escrowTransactions};
            
        } else {
            return {status: 404, data: 'transactions not found'};
        }
        } catch (error) {
          console.log(error)
          return{status: 500, data: 'Unknown error has occured'};
        }

    
   }



   const getTransactionID = async(referenceId) => { 
    try {
      const q = query(collection(db, "escrowTransactions"), where("referenceId", "==", referenceId));

      const querySnapshot = await getDocs(q);
      const escrowTransactions = [];
      if (!querySnapshot.empty) {
        for (const docRef of querySnapshot.docs) {
          const transactionData = docRef.data();
           // Get seller details
          const sellerQ = query(collection(db, 'users'), where('uid', '==', transactionData.sellerId));
          const sellerSnapshot = await getDocs(sellerQ);
          
          const sellerData = sellerSnapshot.empty ? {} : sellerSnapshot.docs[0].data();

          // Get buyer details
          const buyerQ = query(collection(db, 'users'), where('uid', '==', transactionData.buyerId));
          const buyerSnapshot = await getDocs(buyerQ);
          const buyerData = buyerSnapshot.empty ? {} : buyerSnapshot.docs[0].data();

          const transactionDetails = {
            ...transactionData,
            sellerData: sellerData,
            buyerData: buyerData,
          };
          console.log(transactionDetails)
          const { confirmationPin, ...dataWithoutConfirmationPin } = transactionDetails;
            // dataWithoutConfirmationPin.sellerName = ;
            escrowTransactions.push(dataWithoutConfirmationPin);

        }
        return {status: 200, data: escrowTransactions};
        
    } else {
        return {status: 404, data: 'transactions not found'};
    }
    } catch (error) {
      console.log(error)
      return{status: 500, data: 'Unknown error has occured'};
    }


}


   const getAllDelivererTransactions = async(uid) => { 
    try {
      const q = query(collection(db, "escrowTransactions"), where("deliveryId", "==", uid));

      const querySnapshot = await getDocs(q);
      const escrowTransactions = [];
      if (!querySnapshot.empty) {
        for (const docRef of querySnapshot.docs) {
          const transactionData = docRef.data();
           // Get seller details
          const sellerQ = query(collection(db, 'users'), where('uid', '==', transactionData.sellerId));
          const sellerSnapshot = await getDocs(sellerQ);
          
          const sellerData = sellerSnapshot.empty ? {} : sellerSnapshot.docs[0].data();

          // Get buyer details
          const buyerQ = query(collection(db, 'users'), where('uid', '==', transactionData.buyerId));
          const buyerSnapshot = await getDocs(buyerQ);
          const buyerData = buyerSnapshot.empty ? {} : buyerSnapshot.docs[0].data();

          const transactionDetails = {
            ...transactionData,
            sellerData: sellerData,
            buyerData: buyerData,
          };
          console.log(transactionDetails)
          const { confirmationPin, ...dataWithoutConfirmationPin } = transactionDetails;
            // dataWithoutConfirmationPin.sellerName = ;
            escrowTransactions.push(dataWithoutConfirmationPin);

        }
        
          
    
            return {status: 200, data: escrowTransactions};

    } else {
        return {status: 404, data: 'transactions not found'};
    }
    } catch (error) {
      console.log(error)
      return{status: 500, data: 'Unknown error has occured'};
    }


}




   async function getMostFrequentLocation() {
    try {
      const transactionsCollection = collection(db, 'escrowTransactions');
      const transactionsQuery = query(transactionsCollection, orderBy('createdAt', 'desc'), limit(20));
      const querySnapshot = await getDocs(transactionsQuery);
  
      const locationCount = new Map();
  
      querySnapshot.forEach((doc) => {
        const location = doc.data().location;
  
        // Count occurrences of each location
        if (location) {
          locationCount.set(location, (locationCount.get(location) || 0) + 1);
        }
      });
  
      // Find the location with the highest count
      let mostFrequentLocation = null;
      let maxCount = 0;
  
      locationCount.forEach((count, location) => {
        if (count > maxCount) {
          maxCount = count;
          mostFrequentLocation = location;
        }
      });
  
      return {status: 200, message: mostFrequentLocation}
    } catch (error) {
      console.error('Error getting most frequent location:', error);
    }
  }


  
const AssignDelivery = async (data) => {
    const { deliveryId, referenceId} = data;
    try {
      // Retrieve user from Firebase Authentication
  
        // Update user document in Firestore
        // escrowTransactions
        const escrowCollection = collection(db, 'escrowTransactions');
        const q = query(collection(db, "escrowTransactions"), where("referenceId", "==", referenceId));
  
        const transDocs = await getDocs(q);
  
        if (!transDocs.empty) {
          const transDoc = transDocs.docs[0];
          // console.log(userDoc.id)
          const transDocRef = doc(escrowCollection, transDoc.id);
  
          await updateDoc(transDocRef, { deliveryId});
  
          return { status: 202, message: 'Delivery assigned successfully.' };
        } else {
            return { status: 404, message: 'Transaction not found' };
        }
    } catch (error) {
      console.error('Error:', error.message);
      return { status: 500, message: 'Internal server error' };
    }
    };

    async function getAccountBalance(){
        // console.log(data)
        try {
            const config = {
                userId: 'c75703cb-9668-4389-88f1-b0e9b2c7f0ae',
                apiKey: 'b236dfbee20c4e969b1ffe2225b4030f',
                targetEnvironment: 'sandbox',
                subscriptionKey: '31b3188305a046869164af9c0419b84b',
                providerCallbackHost: 'http://mml-backend.vercel.app/momocallback'
              } 
    
              console.log(config)
              
              // returns an object containing methods you can use to access the disbursement api
            const collectionAPI = createCollectionAPI(config);
            // console.log(disbursementAPI)
            const accountBalance = await collectionAPI.getAccountBalance();
            return {status: 200, data: '5000'}
            
        } catch (error) {
            console.log(error.response?.data)
            return {status: 200, data: '5000'}
        }
    
      }
  module.exports = {
    requestToPay,
    getTransactionStatus,
    getAllBuyerTransactions,
    getAllSellerTransactions,
    getTransactionID,
    getAllDelivererTransactions,
    getActiveTransaction,
    getAllTransactions,
    getMostFrequentLocation,
    getCreditedAmounts,
    getDebitedAmounts,
    getTotalCommisions,
    AssignDelivery,
    getAccountBalance
  }