const path = require('path'); ///
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require("./config/connection");
const helpers = require('./utils/helpers');
//stripe payment info
require('dotenv').config();
//put SECRET_KEY and PUBLISHABLE_KEY into ENV File once working
const SECRET_KEY = 'sk_test_51GEfgRJIoFEQrpd2DpleuMctJKKaQj0PWk39Zfa5g9GtjbPGBK7yhCvuTXkf2GFnBhGwDLbMRoS2xb7KyMhP76zw00C1tAbUCW';
const stripe = require('stripe')(SECRET_KEY);
// require bodyParser
//var bodyParser = require('body-parser');
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
//Add heroku domain when ready
const YOUR_DOMAIN = 'https://guarded-ravine-67476.herokuapp.com';
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Giving a High $5 on a post is supporting independent basketball journalists and helping our Basketblog community grow.',
            images: ['https://images.unsplash.com/photo-1519861531473-9200262188bf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'],
          },
          unit_amount: 500, //$10
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // Add Heroku Domain Page when ready
    success_url: `${YOUR_DOMAIN}/dashboard/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });
  res.json({ id: session.id });
});
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