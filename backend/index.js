const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();

app.use(cors());
const port = process.env.PORT || 3000;
const requestToPay = require('./src/routes/requestToPay.route')
// const requestToPayStatus = require('./src/routes/requestToPayStatus.route')
const getAccountBalance = require('./src/routes/getAccountBalance.route')
const userRoute = require('./src/routes/user.route')
const momoCallbackRoute = require('./src/routes/momoCallback.route')
const transferFundsRoute = require('./src/routes/transferFunds.route')
const getSellerBuyerRoute = require('./src/routes/getSellerBuyerTransactions.route')

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({'message': 'MoMo-Market-Link'});
})

app.use('/', requestToPay);
app.use('/', transferFundsRoute);
// app.use('/getpaymentstatus', requestToPayStatus);
// app.use('/getbalance', getAccountBalance);
app.use('/momocallback', momoCallbackRoute);
app.use('/', userRoute);
app.use('/getbstrans', getSellerBuyerRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    // console.error(err.message, err.stack);
    res.status(statusCode).json({'messages': err.message});
    
    return;
  });
  
  app.listen(port, '0.0.0.0', () => {
    console.log(`MoMo-Market-Link app running at http://localhost:${port}`)
  });
