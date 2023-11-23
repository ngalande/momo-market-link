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
  where,
  query
} = require('firebase/firestore');
const bcrypt = require('bcrypt');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } = require('firebase/auth');
const admin = require('firebase-admin');
const moment = require('moment-timezone');


const db = getFirestore(firebase);
const auth = getAuth(firebase)


function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}


const createUser = async (req, res, next) => {
  // console.log(auth.config)
    try {
      const { email, password, name, address, role, phone } = req.body;
      // const last10Characters = phoneNumber.slice(-10);
      const filterdPhone = phone.slice(-10)
      const uid = generateRandomString(32);
      const lusakaTime = moment().tz('Africa/Lusaka');
      // Format and display the current time in Lusaka
      const time = lusakaTime.format('YYYY-MM-DD HH:mm:ss');
      // const userQuery = doc(db, 'users', phone);
      // const querySnapshot = await getDoc(userQuery);
      const q = query(collection(db, "users"), where("phone", "==", filterdPhone));

      const transDocs = await getDocs(q);

      // await addDoc(collection(db, 'users'), data);
      // res.status(200).send({status: 'success', data: 'user created successfully'});
      // console.log(transDocs.docs)
      const hashedPassword = await bcrypt.hash(password, 10);
      if (transDocs.empty) {
        // User does not exist, create a new user document
        await addDoc(collection(db, 'users'), {
          uid: uid,
          email: email,
          name: name,
          address: address,
          phone: filterdPhone,
          role: role,
          createdAt: time,
          password: hashedPassword
          // Add other user details as needed
        });

        res.status(201).json({
          status: 201, data:{
            uid: uid,
            email: email,
            phone: filterdPhone,
            name: name,
            address: address,
            role: role,
            createdAt: time,
            password: hashedPassword
          // Add other user details as needed
          }
        });
      } else {
        // User already exists
        res.status(409).json({ status: 409, message: 'User already exists' });
      }

    } catch (error) {
      console.log(error)
        res.status(500).send({status: 500, message: error.message});
    }
  };

  const createAdminUser = async (req, res, next) => {
    // console.log(auth.config)
      try {
        const { email, password, name, address, role, phone } = req.body;
        // const last10Characters = phoneNumber.slice(-10);
        const filterdPhone = phone.slice(-10)
        const uid = generateRandomString(32);
        const lusakaTime = moment().tz('Africa/Lusaka');
        // Format and display the current time in Lusaka
        const time = lusakaTime.format('YYYY-MM-DD HH:mm:ss');
        // const userQuery = doc(db, 'users', phone);
        // const querySnapshot = await getDoc(userQuery);
        const q = query(collection(db, "adminUsers"), where("phone", "==", filterdPhone));
  
        const transDocs = await getDocs(q);
  
        // await addDoc(collection(db, 'users'), data);
        // res.status(200).send({status: 'success', data: 'user created successfully'});
        // console.log(transDocs.docs)
        const hashedPassword = await bcrypt.hash(password, 10);
        if (transDocs.empty) {
          // User does not exist, create a new user document
          await addDoc(collection(db, 'adminUsers'), {
            uid: uid,
            email: email,
            name: name,
            address: address,
            phone: filterdPhone,
            role: role,
            createdAt: time,
            password: hashedPassword
            // Add other user details as needed
          });
  
          res.status(201).json({
            status: 201, data:{
              uid: uid,
              email: email,
              phone: filterdPhone,
              name: name,
              address: address,
              role: role,
              createdAt: time,
              password: hashedPassword
            // Add other user details as needed
            }
          });
        } else {
          // User already exists
          res.status(409).json({ status: 409, message: 'Admin User already exists' });
        }
  
      } catch (error) {
        console.log(error)

          res.status(500).send({status: 500, message: error.message});

      }
    };


  //get all users 
  const getAllUsers = async (req, res, next) => {
    try {
      const users = await getDocs(collection(db, 'users'));
      const userArray = [];
  
      if (users.empty) {
        res.status(400).send('No users found');
      } else {
        users.forEach((doc) => {
          
          userArray.push(doc.data());
        });
  
        res.status(200).send({status: 200, data: userArray});
      }
    } catch (error) {
      res.status(400).send({status: 'error', data: error.message});
    }
  };

  const getAllSellers = async (req, res, next) => {
    
    try {
      const q = query(collection(db, "users"), where("role", "==", 'seller'));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const sellers = [];
        querySnapshot.forEach((doc) => {
            sellers.push(doc.data());
        });
        res.status(200).send({status: 200, data: sellers});

      }else{
        res.status(400).send({status: 400, message: 'No sellers found'});
      }
    } catch (error) {
      res.status(500).send({status: 500, data: error.message});
    }
  };


  const getAllBuyers = async (req, res, next) => {
    
    try {
      const q = query(collection(db, "users"), where("role", "==", 'buyer'));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const buyers = [];
        querySnapshot.forEach((doc) => {
            buyers.push(doc.data());
        });
        res.status(200).send({status: 200, data: buyers});

      }else{
        res.status(400).send({status: 400, message: 'No buyers found'});
      }
    } catch (error) {
      res.status(500).send({status: 500, data: error.message});
    }
  };


  const getAllDelivery = async (req, res, next) => {
    
    try {
      const q = query(collection(db, "users"), where("role", "==", 'delivery'));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const delivery = [];
        querySnapshot.forEach((doc) => {
          delivery.push(doc.data());
        });
        res.status(200).send({status: 200, data: delivery});

      }else{
        res.status(400).send({status: 400, message: 'No deliverers found'});
      }
    } catch (error) {
      res.status(500).send({status: 500, data: error.message});
    }
  };

//   get user by ID

const getUser = async (req, res, next) => {
    const uid = req.query.uid;
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        // console.log(userDoc.docs)
        res.status(200).send({status: 200, data: userData});
      } else {
        res.status(404).send({status: 404, data: 'user not found'});
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({status: 500, data: error.message});
    }
  };


//   update user by ID

const updateUser = async (req, res, next) => {
  const { email, password, name, address, role, phone } = req.body;
  const updatedUserData = req.body; // Assume the updated data is sent in the request body
  const uid = req.query.uid 
  console.log(uid)
  try {
    // Retrieve user from Firebase Authentication

      // Update user document in Firestore
      const usersCollection = collection(db, 'users');
      const q = query(collection(db, "users"), where("uid", "==", uid));

      const userDocs = await getDocs(q);

      if (!userDocs.empty) {
        const userDoc = userDocs.docs[0];
        // console.log(userDoc.id)
        const userDocRef = doc(usersCollection, userDoc.id);

        await updateDoc(userDocRef, { email, name, address, role, phone });

        res.status(200).json({ message: 'User updated successfully.' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
  };


  const deleteUserData = async (req, res, next) => {
    try {
      const uid = req.query.uid;
      const usersCollection = collection(db, 'users');
      const q = query(collection(db, "users"), where("uid", "==", uid));

      const userDocs = await getDocs(q);
      if (!userDocs.empty) {
        const userDoc = userDocs.docs[0];

        const userDocRef = doc(usersCollection, userDoc.id);

        await deleteDoc(userDocRef);

        res.status(200).json({ status: 200, message: 'user deleted successfully' });
      }else{
        res.status(404).json({ status: 404, message: 'user not found' });
      }
      // await deleteDoc(doc(db, 'users', id));
      // res.status(200).send({status: 'success', data: 'user deleted successfully'});
    } catch (error) {
      console.log(error.message)
      res.status(500).send({status: 500, data: error.message});
    }
  };

  const loginUser = async (req, res, next) => {
    const { phone, password } = req.body;
    const filterdPhone = phone.slice(-10)

    try {
      const q = query(collection(db, "users"), where("phone", "==", filterdPhone));

      const transDocs = await getDocs(q);

      // await addDoc(collection(db, 'users'), data);
      // res.status(200).send({status: 'success', data: 'user created successfully'});
      // console.log(transDocs.docs)
      // const passwordsMatch = await bcrypt.compare(password, storedHashedPassword);
      const userData = []
      if (!transDocs.empty) {
        transDocs.docs.forEach(data => {
          userData.push(data.data())
        })
        // console.log(userData[0].password)

        const passwordsMatch = await bcrypt.compare(password, userData[0].password);
        if(passwordsMatch){
          res.status(200).json({ status: 200, data: {
            uid: userData[0].uid,
            email: userData[0].email,
            phone: userData[0].phone,
            name: userData[0].name,
            address: userData[0].address,
            role: userData[0].role
          }
          });
        }else{
          res.status(403).json({status: 403, message: 'Invalid credentials' })
        }


      } else {
        res.status(404).json({ status: 404, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(403).json({ status: 403, message: 'Invalid credentials' });
    }
  }

  const loginAdminUser = async (req, res, next) => {
    const { phone, password } = req.body;
    const filterdPhone = phone.slice(-10)

    try {
      const q = query(collection(db, "adminUsers"), where("phone", "==", filterdPhone));

      const transDocs = await getDocs(q);


      const userData = []
      if (!transDocs.empty) {
        transDocs.docs.forEach(data => {
          userData.push(data.data())
        })
        // console.log(userData[0].password)

        const passwordsMatch = await bcrypt.compare(password, userData[0].password);
        if(passwordsMatch){
          res.status(200).json({ status: 200, data: {
            uid: userData[0].uid,
            email: userData[0].email,
            phone: userData[0].phone,
            name: userData[0].name,
            address: userData[0].address,
            role: userData[0].role
          }
          });
        }else{
          res.status(403).json({status: 403, message: 'Invalid credentials' })
        }


      } else {
        res.status(404).json({ status: 404, message: 'Admin User not found' });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(403).json({ status: 403, message: 'Invalid credentials' });
    }
  }

  module.exports = {
    createUser,
    createAdminUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUserData,
    loginUser,
    loginAdminUser,
    getAllSellers,
    getAllBuyers,
    getAllDelivery
  }