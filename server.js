const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require("./config/connection");
const helpers = require('./utils/helpers');
//stripe payment info
require('dotenv').config();
//put SECRET_KEY and PUBLISHABLE_KEY into ENV File once working
const SECRET_KEY = "sk_test_51GEfgRJIoFEQrpd2DpleuMctJKKaQj0PWk39Zfa5g9GtjbPGBK7yhCvuTXkf2GFnBhGwDLbMRoS2xb7KyMhP76zw00C1tAbUCW"
const stripe = require('stripe')(SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
     // Session will automatically expire in 10 minutes
     expires: 10 * 60 * 1000
  },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//stripe code
// Create a new customer and then create an invoice item then invoice it:


app.get('/premium-payment', function(req, res){ 
    res.render('premium-payment', { 
    key: 'pk_test_19lKLey0BnXSxv35hMNmN3sj00PuMqjbWm'
    }) 
  }) 


app.post('/premium-payment', (req,res) => {
  //this is sending the stripe info
  stripe.customers
  .create({
    email: 'customer@example.com',
  })
  .then((customer) => {
    // have access to the customer object
    return stripe.invoiceItems
      .create({
        customer: customer.id, // set the customer id
        amount: 100, // $1
        currency: 'usd',
        description: 'One-time setup fee',
      })
      .then((invoiceItem) => {
        return stripe.invoices.create({
          collection_method: 'send_invoice',
          customer: invoiceItem.customer,
        });
      })
      .then((invoice) => {
        console.log(`invoice is ${invoice}`)
        // New invoice created on a new customer
      })
      .catch((err) => {
        // Deal with an error
      });
  });

})

const hbs = exphbs.create({ helpers });

app.use(session(sess));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers'));







  
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});