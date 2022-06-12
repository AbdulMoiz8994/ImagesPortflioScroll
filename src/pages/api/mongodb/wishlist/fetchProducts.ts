import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next';
import { mongodbDB, mongodbPassword, mongodbUsername } from 'site-settings/site-credentials';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const customer = req.body;

  try {
    const client = await MongoClient.connect(`mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.g13wh.mongodb.net/${mongodbDB}?retryWrites=true&w=majority`)

    const data = await client.db().collection('wishlist').find({ customerId: customer.id }).toArray();
    res.status(200).send({ success: true, products: data });
  } catch (error) {
    console.log('/api/mongodb/wishlist :: ', { error });

    res.status(500).send({ success: false });
  } 
}