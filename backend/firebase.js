const { initializeApp } = require('firebase/app');
// import config from './config.js';
const firebaseConfig = require('./src/utils/firebaseConfig');

const firebase = initializeApp(firebaseConfig);

module.exports = firebase;