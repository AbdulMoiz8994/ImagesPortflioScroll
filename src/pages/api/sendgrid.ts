import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { sendGridApiKey, sendGridEmailTo } from 'site-settings/site-credentials';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize with api key
  sgMail.setApiKey(sendGridApiKey);

  const { customerEmail, name, message } = req.body;
  // console.log({ params })
 
  const bodyForCustomer = {
    to: customerEmail,
    from: "info@sfkshop.gr",
    subject: 'Contact Us - SFKshop',
    text: 'Thanks for contact us, we appreciate your query, sfkshop team will be back to you soon',
  };
  const bodyForManagementTeam = {
    to: sendGridEmailTo,
    from: "info@sfkshop.gr",
    subject: 'Contact Us - SFKshop',
    html: `
      <p>Customer's Name:  "${name}"</p>
      <p>Customer's Email:  "${customerEmail}"</p>
      <p>Customer's Message:  "${message}"</p>
    `
  };

  try {
    const sendEmailToCustomer = sgMail.send(bodyForCustomer);
    const sendEmailToManagementTeam = sgMail.send(bodyForManagementTeam);

    await Promise.all([sendEmailToManagementTeam, sendEmailToCustomer])

    return res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }

    return res.status(500).send({ success: false })
  }
}
