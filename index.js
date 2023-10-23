const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.use(bodyParser.json())


app.post('/payment', async (req, res) => {
 try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'zar',
        automatic_payment_methods: {
            enabled: true,
        }
    })
    res.json({paymentIntent: paymentIntent.client_secret})
 } catch (error) {
    res.status(400).json({
        error: error.message,
    })
 }


})



const port = 8000
app.listen(port, (error) => {
    if(error) throw error
    console.log(`server running on port`, port)
})

