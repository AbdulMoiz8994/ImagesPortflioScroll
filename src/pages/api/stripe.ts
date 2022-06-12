import { NextApiRequest, NextApiResponse } from "next";
import { stripeSecretKey } from "site-settings/site-credentials";
// import { Elements } from "@stripe/react-stripe-js";
// Nick
const stripe = require("stripe")(stripeSecretKey);

// export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
export default async function handler(req: any, res: NextApiResponse<any>) {
  try {
    //////////// LEGACY /////////
    // const data = await stripe.charges.create({
    //   amount: req.body.data.amount,
    //   currency: 'eur',
    //   source: req.body.token.id,
    //   description: "Order description....",
    //   metadata: {
    //     productId: "prod1"
    //   },
    // })

    // return res.status(200).json({ charges: data })

    /////// NEW IMPLEMENTATION ///////
    const intent = await stripe.paymentIntents.create({
      amount: req.body.data.amount,
      currency: 'eur',
    });

    return res.status(200).json({ client_secret: intent.client_secret })
  } catch (error) {
    console.log("serverSide :: ", { error });
    return res.status(400).json({ error: "Something went wrong..." });
  }
}
