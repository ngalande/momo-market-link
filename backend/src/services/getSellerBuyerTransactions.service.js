const firebase = require('../../firebase');

const {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where
  } = require('firebase/firestore');
  const db = getFirestore(firebase);
const axios = require("axios").default
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


async function getSellerBuyerTransactions(data){
    const docArray = []
    const q = query(
        collection(db, 'initTransactions'),
        where('uid' == data.uid )
        )
        console.log('first')
    try {
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            docArray.push(doc.data())
          });
          return {status: 'success', message: docArray}
        } else {
            console.log('No matching documents.');
            return {status: 'error', message: 'No Data'}
        }
      } catch (error) {
        console.error('Error getting documents:', error);
        return {status: 'error', message: 'No data'}
      }
  }


  module.exports = {
    getSellerBuyerTransactions
  }