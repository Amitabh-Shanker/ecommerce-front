import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {  
    name, email, city,
    postalCode, streetAddress, country,
    cartProducts,
  } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  await mongooseConnect();

  const productsIds = cartProducts;
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const productId of uniqueIds) {
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    const quantity = productsIds.filter(id => id === productId)?.length || 0;
    
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: { name: productInfo.title },
          unit_amount: productInfo.price * 100, // ⚠️ Not multiplied by quantity here
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name, email, city, postalCode,
    streetAddress, country, paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'], // ✅ REQUIRED to avoid Stripe error
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    metadata: {
      orderId: orderDoc._id.toString(),
    },
  });

  res.status(200).json({ url: session.url });
}
