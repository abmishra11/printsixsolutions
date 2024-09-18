// app/api/send-email/route.js
import getEmailTemplate from '@/lib/emailtemplates/getEmailTemplate';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { to, subject, templateName, templateVariables } = await request.json();
    console.log("To", to);
    console.log("subject", subject);
    console.log("templateName", templateName);
    
  try {
    // Create a transporter object using the Gmail service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Define the email options
    const emailHtml = await getEmailTemplate(templateName, templateVariables)
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html: emailHtml,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    // Return a response
    return new Response(JSON.stringify({ success: true, info }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
