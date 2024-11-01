import getEmailTemplate from '@/lib/emailtemplates/getEmailTemplate';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { to, subject, templateName, templateVariables } = await request.json();
  console.log("To", to);
  console.log("Subject", subject);
  console.log("TemplateName", templateName);

  try {
    // Validate the input fields
    if (!to || !subject || !templateName) {
      throw new Error('Missing required fields: to, subject, or templateName');
    }

    // Create a transporter object using the Gmail service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      // Enable debugging if needed
      debug: true,
      logger: true,
    });

    // Define the email options
    const emailHtml = await getEmailTemplate(templateName, templateVariables);
    if (!emailHtml) {
      throw new Error('Failed to generate email HTML content');
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html: emailHtml,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);

    // Return a successful response
    return new Response(JSON.stringify({ success: true, info }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error sending email:", error);

    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
